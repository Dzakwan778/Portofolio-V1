export interface Skill {
  name: string;
  percentage: number;
  iconClass: string;
  customColorClass?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  iconClass: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  isPrivate?: boolean;
}

export interface ContactItem {
  title: string;
  value: string;
  iconClass: string;
  link: string;
  target?: string;
}
