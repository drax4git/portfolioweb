import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Profile,
  Project,
  Skill,
  Experience,
  Education,
  Certification,
  Hackathon,
  Achievement,
  CodingStatistic,
  SocialLink,
  ContactMessage,
  SiteSettings,
} from '../types/portfolio';
import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialExperience,
  initialEducation,
  initialCertifications,
  initialHackathons,
  initialAchievements,
  initialCodingStatistics,
  initialSocialLinks,
  initialSiteSettings,
} from '../data/initialData';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

interface DataContextType {
  // Data entities
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  hackathons: Hackathon[];
  achievements: Achievement[];
  codingStatistics: CodingStatistic[];
  socialLinks: SocialLink[];
  contactMessages: ContactMessage[];
  siteSettings: SiteSettings;
  
  // Admin & Preview Mode (Real Supabase Auth)
  isAdmin: boolean;
  adminUser: { email: string; id: string } | null;
  adminPreviewMode: boolean;
  setAdminPreviewMode: (val: boolean) => void;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  publishAllDrafts: () => void;
  resetToDefaults: () => void;
  
  // CRUD Actions
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  
  // Projects
  addProject: (data: Omit<Project, 'id' | 'created_at'>) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  
  // Skills
  addSkill: (data: Omit<Skill, 'id'>) => Promise<void>;
  updateSkill: (id: string, data: Partial<Skill>) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
  
  // Experience
  addExperience: (data: Omit<Experience, 'id'>) => Promise<void>;
  updateExperience: (id: string, data: Partial<Experience>) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  
  // Education
  addEducation: (data: Omit<Education, 'id'>) => Promise<void>;
  updateEducation: (id: string, data: Partial<Education>) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;
  
  // Certifications
  addCertification: (data: Omit<Certification, 'id'>) => Promise<void>;
  updateCertification: (id: string, data: Partial<Certification>) => Promise<void>;
  deleteCertification: (id: string) => Promise<void>;
  
  // Hackathons
  addHackathon: (data: Omit<Hackathon, 'id'>) => Promise<void>;
  updateHackathon: (id: string, data: Partial<Hackathon>) => Promise<void>;
  deleteHackathon: (id: string) => Promise<void>;
  
  // Achievements
  addAchievement: (data: Omit<Achievement, 'id'>) => Promise<void>;
  updateAchievement: (id: string, data: Partial<Achievement>) => Promise<void>;
  deleteAchievement: (id: string) => Promise<void>;
  
  // Coding Statistics
  addCodingStatistic: (data: Omit<CodingStatistic, 'id'>) => Promise<void>;
  updateCodingStatistic: (id: string, data: Partial<CodingStatistic>) => Promise<void>;
  deleteCodingStatistic: (id: string) => Promise<void>;
  
  // Social Links
  addSocialLink: (data: Omit<SocialLink, 'id'>) => Promise<void>;
  updateSocialLink: (id: string, data: Partial<SocialLink>) => Promise<void>;
  deleteSocialLink: (id: string) => Promise<void>;
  
  // Contact Messages
  submitContactMessage: (msg: Omit<ContactMessage, 'id' | 'created_at' | 'read'>) => Promise<void>;
  markMessageAsRead: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  
  // Site Settings
  updateSiteSettings: (data: Partial<SiteSettings>) => Promise<void>;
}

const STORAGE_KEY = 'retro_portfolio_data_v1';

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_profile`);
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_skills`);
    return saved ? JSON.parse(saved) : initialSkills;
  });

  const [experience, setExperience] = useState<Experience[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_experience`);
    return saved ? JSON.parse(saved) : initialExperience;
  });

  const [education, setEducation] = useState<Education[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_education`);
    return saved ? JSON.parse(saved) : initialEducation;
  });

  const [certifications, setCertifications] = useState<Certification[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_certifications`);
    return saved ? JSON.parse(saved) : initialCertifications;
  });

  const [hackathons, setHackathons] = useState<Hackathon[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_hackathons`);
    return saved ? JSON.parse(saved) : initialHackathons;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_achievements`);
    return saved ? JSON.parse(saved) : initialAchievements;
  });

  const [codingStatistics, setCodingStatistics] = useState<CodingStatistic[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_coding_stats`);
    return saved ? JSON.parse(saved) : initialCodingStatistics;
  });

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_social_links`);
    return saved ? JSON.parse(saved) : initialSocialLinks;
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_messages`);
    return saved ? JSON.parse(saved) : [];
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_settings`);
    return saved ? JSON.parse(saved) : initialSiteSettings;
  });

  // Real Supabase Authenticated Administrator State
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<{ email: string; id: string } | null>(null);
  const [adminPreviewMode, setAdminPreviewMode] = useState<boolean>(false);

  // Sync state to local storage cache for instant offline read capability
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_profile`, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_skills`, JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_experience`, JSON.stringify(experience));
  }, [experience]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_education`, JSON.stringify(education));
  }, [education]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_certifications`, JSON.stringify(certifications));
  }, [certifications]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_hackathons`, JSON.stringify(hackathons));
  }, [hackathons]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_achievements`, JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_coding_stats`, JSON.stringify(codingStatistics));
  }, [codingStatistics]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_social_links`, JSON.stringify(socialLinks));
  }, [socialLinks]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_messages`, JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(siteSettings));
  }, [siteSettings]);

  // Real Supabase Auth: Check session and verify admin allowlist
  useEffect(() => {
    const client = supabase;
    if (!isSupabaseConfigured || !client) return;

    const verifyAdmin = async (userId: string, email: string) => {
      try {
        const { data, error } = await client
          .from('admin_users')
          .select('id')
          .eq('id', userId)
          .maybeSingle();

        if (error) {
          console.error('Admin allowlist check error:', error.message);
          setIsAdmin(false);
          setAdminUser(null);
          return;
        }

        if (data) {
          setIsAdmin(true);
          setAdminUser({ email, id: userId });
        } else {
          setIsAdmin(false);
          setAdminUser(null);
        }
      } catch (err) {
        setIsAdmin(false);
        setAdminUser(null);
      }
    };

    // 1. Initial Session Check
    client.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        verifyAdmin(session.user.id, session.user.email || '');
      } else {
        setIsAdmin(false);
        setAdminUser(null);
      }
    });

    // 2. Realtime Auth State Listener
    const { data: { subscription } } = client.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        verifyAdmin(session.user.id, session.user.email || '');
      } else {
        setIsAdmin(false);
        setAdminUser(null);
        setAdminPreviewMode(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sync data from Supabase PostgreSQL tables
  useEffect(() => {
    const client = supabase;
    if (!isSupabaseConfigured || !client) return;

    const fetchFromSupabase = async () => {
      try {
        const { data: prof } = await client.from('profiles').select('*').limit(1).maybeSingle();
        if (prof) setProfile(prof);

        const { data: projs } = await client.from('projects').select('*').order('display_order', { ascending: true });
        if (projs && projs.length > 0) setProjects(projs);

        const { data: sks } = await client.from('skills').select('*').order('display_order', { ascending: true });
        if (sks && sks.length > 0) setSkills(sks);

        const { data: exps } = await client.from('experience').select('*').order('display_order', { ascending: true });
        if (exps && exps.length > 0) setExperience(exps);

        const { data: edus } = await client.from('education').select('*').order('display_order', { ascending: true });
        if (edus && edus.length > 0) setEducation(edus);

        const { data: certs } = await client.from('certifications').select('*').order('display_order', { ascending: true });
        if (certs && certs.length > 0) setCertifications(certs);

        const { data: hacks } = await client.from('hackathons').select('*').order('display_order', { ascending: true });
        if (hacks && hacks.length > 0) setHackathons(hacks);

        const { data: achs } = await client.from('achievements').select('*').order('display_order', { ascending: true });
        if (achs && achs.length > 0) setAchievements(achs);

        const { data: stats } = await client.from('coding_statistics').select('*').order('display_order', { ascending: true });
        if (stats && stats.length > 0) setCodingStatistics(stats);

        const { data: socials } = await client.from('social_links').select('*').order('display_order', { ascending: true });
        if (socials && socials.length > 0) setSocialLinks(socials);

        const { data: msgs } = await client.from('contact_messages').select('*').order('created_at', { ascending: false });
        if (msgs) setContactMessages(msgs);

        const { data: settings } = await client.from('site_settings').select('*').limit(1).maybeSingle();
        if (settings) setSiteSettings(settings);
      } catch (err) {
        console.warn('Supabase fetch notice: using local data', err);
      }
    };

    fetchFromSupabase();
  }, []);

  // Real Supabase Authentication: signInWithPassword & Strict Allowlist Verification
  const login = async (inputEmail: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const client = supabase;
    if (!isSupabaseConfigured || !client) {
      return {
        success: false,
        error: 'Supabase configuration missing in .env. Please provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
      };
    }

    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: inputEmail.trim(),
        password: pass,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data.user) {
        return { success: false, error: 'User account not found.' };
      }

      // Check if user is in admin_users allowlist
      const { data: adminRecord, error: adminCheckError } = await client
        .from('admin_users')
        .select('id, email')
        .eq('id', data.user.id)
        .maybeSingle();

      if (adminCheckError) {
        await client.auth.signOut();
        return {
          success: false,
          error: `Error checking admin permissions: ${adminCheckError.message}`,
        };
      }

      if (!adminRecord) {
        // User exists in auth.users, but is not in public.admin_users! Deny access.
        await client.auth.signOut();
        setIsAdmin(false);
        setAdminUser(null);
        return {
          success: false,
          error: 'Access Denied: This account is authenticated in Supabase but is not on the administrator allowlist.',
        };
      }

      setIsAdmin(true);
      setAdminUser({ email: data.user.email || inputEmail, id: data.user.id });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Authentication failed' };
    }
  };

  const logout = async () => {
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.auth.signOut();
    }
    setIsAdmin(false);
    setAdminUser(null);
    setAdminPreviewMode(false);
  };

  const publishAllDrafts = () => {
    setProjects(prev => prev.map(p => ({ ...p, status: 'published' })));
    setSkills(prev => prev.map(s => ({ ...s, status: 'published' })));
    setExperience(prev => prev.map(e => ({ ...e, status: 'published' })));
    setEducation(prev => prev.map(e => ({ ...e, status: 'published' })));
    setCertifications(prev => prev.map(c => ({ ...c, status: 'published' })));
    setHackathons(prev => prev.map(h => ({ ...h, status: 'published' })));
    setAchievements(prev => prev.map(a => ({ ...a, status: 'published' })));
    setCodingStatistics(prev => prev.map(c => ({ ...c, status: 'published' })));
    setSocialLinks(prev => prev.map(s => ({ ...s, status: 'published' })));
  };

  const resetToDefaults = () => {
    setProfile(initialProfile);
    setProjects(initialProjects);
    setSkills(initialSkills);
    setExperience(initialExperience);
    setEducation(initialEducation);
    setCertifications(initialCertifications);
    setHackathons(initialHackathons);
    setAchievements(initialAchievements);
    setCodingStatistics(initialCodingStatistics);
    setSocialLinks(initialSocialLinks);
    setSiteSettings(initialSiteSettings);
  };

  const updateProfile = async (data: Partial<Profile>) => {
    const updated = { ...profile, ...data, updated_at: new Date().toISOString() };
    setProfile(updated);
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('profiles').upsert(updated);
    }
  };

  const addProject = async (data: Omit<Project, 'id' | 'created_at'>) => {
    const newProj: Project = {
      ...data,
      id: `proj-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setProjects(prev => [newProj, ...prev]);
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('projects').insert([newProj]);
    }
  };

  const updateProject = async (id: string, data: Partial<Project>) => {
    setProjects(prev => prev.map(p => (p.id === id ? { ...p, ...data, updated_at: new Date().toISOString() } : p)));
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('projects').update(data).eq('id', id);
    }
  };

  const deleteProject = async (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('projects').delete().eq('id', id);
    }
  };

  const addSkill = async (data: Omit<Skill, 'id'>) => {
    const newSkill: Skill = { ...data, id: `sk-${Date.now()}` };
    setSkills(prev => [...prev, newSkill]);
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('skills').insert([newSkill]);
    }
  };

  const updateSkill = async (id: string, data: Partial<Skill>) => {
    setSkills(prev => prev.map(s => (s.id === id ? { ...s, ...data } : s)));
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('skills').update(data).eq('id', id);
    }
  };

  const deleteSkill = async (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('skills').delete().eq('id', id);
    }
  };

  const addExperience = async (data: Omit<Experience, 'id'>) => {
    const newExp: Experience = { ...data, id: `exp-${Date.now()}` };
    setExperience(prev => [newExp, ...prev]);
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('experience').insert([newExp]);
    }
  };

  const updateExperience = async (id: string, data: Partial<Experience>) => {
    setExperience(prev => prev.map(e => (e.id === id ? { ...e, ...data } : e)));
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('experience').update(data).eq('id', id);
    }
  };

  const deleteExperience = async (id: string) => {
    setExperience(prev => prev.filter(e => e.id !== id));
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('experience').delete().eq('id', id);
    }
  };

  const addEducation = async (data: Omit<Education, 'id'>) => {
    const newEdu: Education = { ...data, id: `edu-${Date.now()}` };
    setEducation(prev => [newEdu, ...prev]);
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('education').insert([newEdu]);
    }
  };

  const updateEducation = async (id: string, data: Partial<Education>) => {
    setEducation(prev => prev.map(e => (e.id === id ? { ...e, ...data } : e)));
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('education').update(data).eq('id', id);
    }
  };

  const deleteEducation = async (id: string) => {
    setEducation(prev => prev.filter(e => e.id !== id));
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('education').delete().eq('id', id);
    }
  };

  const addCertification = async (data: Omit<Certification, 'id'>) => {
    const newCert: Certification = { ...data, id: `cert-${Date.now()}` };
    setCertifications(prev => [newCert, ...prev]);
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('certifications').insert([newCert]);
    }
  };

  const updateCertification = async (id: string, data: Partial<Certification>) => {
    setCertifications(prev => prev.map(c => (c.id === id ? { ...c, ...data } : c)));
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('certifications').update(data).eq('id', id);
    }
  };

  const deleteCertification = async (id: string) => {
    setCertifications(prev => prev.filter(c => c.id !== id));
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('certifications').delete().eq('id', id);
    }
  };

  const addHackathon = async (data: Omit<Hackathon, 'id'>) => {
    const newHack: Hackathon = { ...data, id: `hack-${Date.now()}` };
    setHackathons(prev => [newHack, ...prev]);
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('hackathons').insert([newHack]);
    }
  };

  const updateHackathon = async (id: string, data: Partial<Hackathon>) => {
    setHackathons(prev => prev.map(h => (h.id === id ? { ...h, ...data } : h)));
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('hackathons').update(data).eq('id', id);
    }
  };

  const deleteHackathon = async (id: string) => {
    setHackathons(prev => prev.filter(h => h.id !== id));
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('hackathons').delete().eq('id', id);
    }
  };

  const addAchievement = async (data: Omit<Achievement, 'id'>) => {
    const newAch: Achievement = { ...data, id: `ach-${Date.now()}` };
    setAchievements(prev => [newAch, ...prev]);
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('achievements').insert([newAch]);
    }
  };

  const updateAchievement = async (id: string, data: Partial<Achievement>) => {
    setAchievements(prev => prev.map(a => (a.id === id ? { ...a, ...data } : a)));
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('achievements').update(data).eq('id', id);
    }
  };

  const deleteAchievement = async (id: string) => {
    setAchievements(prev => prev.filter(a => a.id !== id));
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('achievements').delete().eq('id', id);
    }
  };

  const addCodingStatistic = async (data: Omit<CodingStatistic, 'id'>) => {
    const newStat: CodingStatistic = { ...data, id: `stat-${Date.now()}` };
    setCodingStatistics(prev => [...prev, newStat]);
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('coding_statistics').insert([newStat]);
    }
  };

  const updateCodingStatistic = async (id: string, data: Partial<CodingStatistic>) => {
    setCodingStatistics(prev => prev.map(s => (s.id === id ? { ...s, ...data } : s)));
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('coding_statistics').update(data).eq('id', id);
    }
  };

  const deleteCodingStatistic = async (id: string) => {
    setCodingStatistics(prev => prev.filter(s => s.id !== id));
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('coding_statistics').delete().eq('id', id);
    }
  };

  const addSocialLink = async (data: Omit<SocialLink, 'id'>) => {
    const newSocial: SocialLink = { ...data, id: `soc-${Date.now()}` };
    setSocialLinks(prev => [...prev, newSocial]);
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('social_links').insert([newSocial]);
    }
  };

  const updateSocialLink = async (id: string, data: Partial<SocialLink>) => {
    setSocialLinks(prev => prev.map(s => (s.id === id ? { ...s, ...data } : s)));
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('social_links').update(data).eq('id', id);
    }
  };

  const deleteSocialLink = async (id: string) => {
    setSocialLinks(prev => prev.filter(s => s.id !== id));
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('social_links').delete().eq('id', id);
    }
  };

  const submitContactMessage = async (msg: Omit<ContactMessage, 'id' | 'created_at' | 'read'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      created_at: new Date().toISOString(),
      read: false,
    };
    setContactMessages(prev => [newMsg, ...prev]);
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('contact_messages').insert([newMsg]);
    }
  };

  const markMessageAsRead = async (id: string) => {
    setContactMessages(prev => prev.map(m => (m.id === id ? { ...m, read: true } : m)));
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('contact_messages').update({ read: true }).eq('id', id);
    }
  };

  const deleteMessage = async (id: string) => {
    setContactMessages(prev => prev.filter(m => m.id !== id));
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('contact_messages').delete().eq('id', id);
    }
  };

  const updateSiteSettings = async (data: Partial<SiteSettings>) => {
    const updated = { ...siteSettings, ...data, updated_at: new Date().toISOString() };
    setSiteSettings(updated);
    const client = supabase;
    if (isSupabaseConfigured && client) {
      await client.from('site_settings').upsert(updated);
    }
  };

  return (
    <DataContext.Provider
      value={{
        profile,
        projects,
        skills,
        experience,
        education,
        certifications,
        hackathons,
        achievements,
        codingStatistics,
        socialLinks,
        contactMessages,
        siteSettings,
        isAdmin,
        adminUser,
        adminPreviewMode,
        setAdminPreviewMode,
        login,
        logout,
        publishAllDrafts,
        resetToDefaults,
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        addSkill,
        updateSkill,
        deleteSkill,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addCertification,
        updateCertification,
        deleteCertification,
        addHackathon,
        updateHackathon,
        deleteHackathon,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        addCodingStatistic,
        updateCodingStatistic,
        deleteCodingStatistic,
        addSocialLink,
        updateSocialLink,
        deleteSocialLink,
        submitContactMessage,
        markMessageAsRead,
        deleteMessage,
        updateSiteSettings,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
