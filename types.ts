import { ComponentType } from 'react';

export interface PainPoint {
  id: string;
  category: string;
  title: string;
  shortDescription: string;
  details: string[];
  icon: ComponentType<{ className?: string }>;
}

export interface Solution {
  id:string;
  title: string;
  description: string;
  relatedPainPointIds: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  school: string;
}