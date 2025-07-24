export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface Chapter {
  id: number;
  title: string;
  original_text: string;
  simple_text: string;
  questions: Question[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  difficulty: number;
  chapters: Chapter[];
  cover_color: string;
}

export interface UserProgress {
  level: number;
  experience: number;
  completedChapters: string[];
  unlockedBooks: string[];
}