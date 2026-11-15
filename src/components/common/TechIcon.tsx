import React from 'react';
import * as LucideIcons from 'lucide-react';

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-5 h-5', size = 20 }) => {
  const normalized = name.toLowerCase().trim();

  // Official Brand SVGs for accuracy and crisp pixel rendering
  if (normalized.includes('react')) {
    return (
      <svg className={className} width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
        <g stroke="#61dafb" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    );
  }

  if (normalized.includes('typescript') || normalized === 'ts') {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="3" fill="#3178C6"/>
        <path d="M12.5 14.5C12.5 17 14 18.5 17 18.5C18.5 18.5 19.8 17.8 20.5 17.1L19.5 15.2C18.9 15.7 18.1 16.2 17.2 16.2C15.7 16.2 15 15.3 15 14C15 12.8 15.6 12.2 17.2 11.5C19.4 10.6 20.5 9.6 20.5 7.6C20.5 5.2 18.8 4 16.3 4C14.8 4 13.5 4.6 12.6 5.3L13.5 7.1C14.3 6.5 15.2 6.1 16.2 6.1C17.4 6.1 18.1 6.8 18.1 7.7C18.1 8.8 17.3 9.3 15.8 10C13.6 11 12.5 12.2 12.5 14.5ZM3.5 6.2H11.5V4H3.5V6.2ZM6.4 18.5H8.6V6.2H6.4V18.5Z" fill="white"/>
      </svg>
    );
  }

  if (normalized.includes('javascript') || normalized === 'js') {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="3" fill="#F7DF1E"/>
        <path d="M7 17.5C7.8 18.2 9 18.6 10.2 18.6C12.4 18.6 13.5 17.4 13.5 15.2V7.5H11.2V15.1C11.2 16.1 10.6 16.6 9.7 16.6C8.8 16.6 8.2 16.2 7.8 15.7L7 17.5ZM14.8 17.2C15.8 18.1 17.2 18.6 18.7 18.6C21.2 18.6 22.8 17.2 22.8 15C22.8 13.2 21.7 12.2 19.8 11.4C18.3 10.7 17.7 10.2 17.7 9.3C17.7 8.5 18.3 7.9 19.3 7.9C20.1 7.9 20.9 8.2 21.6 8.8L22.4 7C21.6 6.3 20.5 5.8 19.2 5.8C16.9 5.8 15.4 7.2 15.4 9.4C15.4 11.2 16.5 12.2 18.3 13C19.9 13.7 20.5 14.3 20.5 15.2C20.5 16.1 19.7 16.7 18.6 16.7C17.4 16.7 16.4 16.1 15.7 15.3L14.8 17.2Z" fill="#111111"/>
      </svg>
    );
  }

  if (normalized.includes('tailwind')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#06B6D4"/>
      </svg>
    );
  }

  if (normalized.includes('node')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 7.2V16.8L12 22L21 16.8V7.2L12 2ZM19 15.6L12 19.7L5 15.6V8.4L12 4.3L19 8.4V15.6Z" fill="#5FA04E"/>
        <path d="M12 6.8L7.5 9.4V14.6L12 17.2L16.5 14.6V9.4L12 6.8Z" fill="#5FA04E" opacity="0.6"/>
      </svg>
    );
  }

  if (normalized.includes('supabase')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M21.362 9.354H12V.5a.5.5 0 0 0-.853-.353l-8.5 8.5a.5.5 0 0 0 .353.853H12v8.854a.5.5 0 0 0 .853.353l8.5-8.5a.5.5 0 0 0-.353-.853z" fill="#3ECF8E"/>
      </svg>
    );
  }

  if (normalized.includes('postgre') || normalized.includes('postgres')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.5v-3.5h-2v3.5C8 18 5.5 15.5 5.5 12S8 6 12 6s6.5 2.5 6.5 6-2.5 6-5.5 6.5z" fill="#336791"/>
      </svg>
    );
  }

  if (normalized.includes('python')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M11.87 2c-3.1 0-5.06.27-5.06 1.83v2.34h5.2v.78H4.62C3.06 6.95 2 8.45 2 10.98c0 2.53 1.27 4.03 2.83 4.03h1.72v-2.34c0-1.87 1.57-3.4 3.44-3.4h5.27V7.12C15.26 3.65 13.9 2 11.87 2z" fill="#3776AB"/>
        <path d="M12.13 22c3.1 0 5.06-.27 5.06-1.83v-2.34h-5.2v-.78h7.39c1.56 0 2.62-1.5 2.62-4.03 0-2.53-1.27-4.03-2.83-4.03h-1.72v2.34c0 1.87-1.57 3.4-3.44 3.4H8.74v2.15C8.74 20.35 10.1 22 12.13 22z" fill="#FFD43B"/>
      </svg>
    );
  }

  if (normalized.includes('docker')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M22.5 10.8c-.3-.2-1.3-.4-2.1.2-.4.3-.7.8-.8 1.3-.8-.1-2.4-.2-3.6.8-.7-.4-1.8-.7-3.1-.7H1V14c0 3.3 2.7 6 6 6h7c4.4 0 8-3.6 8-8 0-.5 0-.9-.1-1.2h.6z" fill="#2496ED"/>
        <path d="M5 9h2v2H5zm3 0h2v2H8zm3 0h2v2h-2zm-3-3h2v2H8zm3 0h2v2h-2zm3 3h2v2h-2z" fill="#2496ED"/>
      </svg>
    );
  }

  if (normalized.includes('git')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M21.6 10.7L13.3 2.4c-.6-.6-1.5-.6-2.1 0l-2.1 2.1 2.7 2.7c.6-.2 1.4 0 1.8.5.5.5.6 1.2.4 1.8l2.6 2.6c.6-.2 1.3-.1 1.8.4.8.8.8 2 0 2.8s-2 .8-2.8 0c-.6-.6-.7-1.4-.4-2.1L12.7 10v4.8c.4.3.7.8.7 1.4 0 1.1-.9 2-2 2s-2-.9-2-2c0-.7.4-1.3.9-1.6V9.4c-.6-.3-.9-.9-.9-1.6 0-.6.2-1.1.7-1.5L6.4 3.6 2.4 7.6c-.6.6-.6 1.5 0 2.1l8.3 8.3c.6.6 1.5.6 2.1 0l8.8-8.8c.6-.6.6-1.5 0-2.1v3.6z" fill="#F05032"/>
      </svg>
    );
  }

  // Fallback to dynamic Lucide icon
  const LucideIcon = (LucideIcons as any)[name] || LucideIcons.Code2;
  return <LucideIcon className={className} size={size} />;
};
