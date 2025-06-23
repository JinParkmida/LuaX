import curriculumText from '../../Lua 5.1 Mastery Curriculum_.md?raw';
import { Chapter, Section } from '../types';

function parseCurriculum(md: string): Chapter[] {
  const lines = md.split(/\r?\n/);
  const chapters: Chapter[] = [];
  let currentChapter: Chapter | null = null;
  let currentSection: Section | null = null;

  const pushSection = () => {
    if (currentChapter && currentSection) {
      currentSection.content = currentSection.content.trim();
      currentChapter.sections.push(currentSection);
      currentSection = null;
    }
  };

  const pushChapter = () => {
    if (currentChapter) {
      pushSection();
      chapters.push(currentChapter);
      currentChapter = null;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const chapterMatch = line.match(/^##\s+\*\*(.+)\*\*/);
    const sectionMatch = line.match(/^###\s+\*\*(.+)\*\*/);

    if (chapterMatch && !line.startsWith('###')) {
      pushChapter();
      currentChapter = {
        title: chapterMatch[1].trim(),
        description: '',
        objectives: [],
        prerequisites: [],
        estimatedTime: '',
        difficulty: 'Beginner',
        sections: []
      };
      continue;
    }

    if (sectionMatch) {
      pushSection();
      currentSection = {
        title: sectionMatch[1].trim(),
        content: '',
        codeExamples: [],
        exercises: []
      };
      continue;
    }

    if (currentSection) {
      currentSection.content += rawLine + '\n';
    }
  }

  pushChapter();
  return chapters;
}

export const chapters: Chapter[] = parseCurriculum(curriculumText);
