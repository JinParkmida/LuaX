export interface CodeExample {
  title: string;
  explanation: string;
  code: string;
  output?: string;
}

export interface Exercise {
  title: string;
  description: string;
  instructions: string[];
  starterCode?: string;
  solution?: string;
}

export interface Section {
  title: string;
  content: string;
  codeExamples: CodeExample[];
  exercises: Exercise[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface Chapter {
  title: string;
  description: string;
  objectives: string[];
  prerequisites: string[];
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sections: Section[];
  quiz?: Quiz;
}

export interface ChapterProgress {
  completed: boolean;
  score: number;
}