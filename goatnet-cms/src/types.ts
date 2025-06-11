export interface HeroSection {
  id: number;
  desktopVideoUrl: string;
  mobileVideoUrl: string;
}

export interface AboutSection {
  id: number;
  title: string;
  paragraphs: string[];
  youtubeUrl: string;
}

export interface SolutionItem {
  id: number;
  title: string;
  tag: string;
  description: string;
  tabId: number;
}

export interface SolutionTab {
  id: number;
  name: string;
  tagline: string;
  items: SolutionItem[];
}

export interface Attraction {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  type: string;
  channels: string[]; // array of Channel IDs
  showOnLanding: boolean;
  landingOrder?: number; // optional
  studioId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Credential {
  id: number;
  name: string;
  imageUrl: string;
  link: string;
  landingOrder: number;
}

export interface Partner {
  id: number;
  name: string;
  imageUrl: string;
  link: string;
  order: number;
}
