export type ContentStatus = 'draft' | 'published';

export type SkillCategory = 'frontend' | 'backend' | 'database' | 'languages' | 'tools';

export interface Profile {
  id: string;
  user_id?: string;
  full_name: string;
  title: string;
  bio: string;
  short_intro: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  twitter_url: string;
  avatar_url: string;
  resume_url: string;
  location: string;
  status_badge: string;
  code_snippet: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  detailed_description?: string;
  image_url: string;
  live_url?: string;
  github_url?: string;
  tags: string[];
  featured: boolean;
  display_order: number;
  status: ContentStatus;
  created_at: string;
  updated_at?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  icon_name: string;
  proficiency: number;
  display_order: number;
  status: ContentStatus;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  location?: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  display_order: number;
  status: ContentStatus;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_year: string;
  end_year: string;
  grade_or_honors?: string;
  description?: string;
  display_order: number;
  status: ContentStatus;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  expiry_date?: string;
  credential_id?: string;
  credential_url?: string;
  image_url?: string;
  display_order: number;
  status: ContentStatus;
}

export interface Hackathon {
  id: string;
  title: string;
  organizer: string;
  event_date: string;
  team_name?: string;
  project_name: string;
  project_description: string;
  award_or_position: string;
  project_url?: string;
  image_url?: string;
  display_order: number;
  status: ContentStatus;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  badge_icon: string;
  display_order: number;
  status: ContentStatus;
}

export interface CodingStatistic {
  id: string;
  platform: 'leetcode' | 'github' | 'codeforces' | 'hackerrank' | 'general';
  metric_name: string;
  metric_value: string;
  profile_url?: string;
  icon_name?: string;
  display_order: number;
  status: ContentStatus;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon_name: string;
  display_order: number;
  status: ContentStatus;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  seo_title: string;
  seo_description: string;
  primary_accent: string;
  show_retro_stickers: boolean;
  show_grid_lines: boolean;
  updated_at: string;
}
