import { createClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
// Automatically sanitize URL in case user pasted the REST endpoint /rest/v1/...
export const supabaseUrl = rawUrl.replace(/\/rest\/v1.*$/i, '').replace(/\/+$/, '');
export const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') && 
  supabaseAnonKey.length > 15
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Uploads a file either to Supabase Storage (if configured)
 * or creates an optimized base64 / blob URL for local instant persistence.
 */
export async function uploadFile(
  bucket: 'profile-images' | 'project-images' | 'certificates' | 'resumes',
  file: File
): Promise<{ url: string; error: string | null }> {
  try {
    // Validate file size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return { url: '', error: 'File size exceeds 5MB limit.' };
    }

    if (isSupabaseConfigured && supabase) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        console.warn('Supabase upload notice, falling back to local data URL:', uploadError.message);
        const localUrl = await fileToDataUrl(file);
        return { url: localUrl, error: null };
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      return { url: data.publicUrl, error: null };
    } else {
      const localUrl = await fileToDataUrl(file);
      return { url: localUrl, error: null };
    }
  } catch (err: any) {
    return { url: '', error: err.message || 'File upload failed' };
  }
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
