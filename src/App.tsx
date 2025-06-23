import React, { useState, useEffect } from 'react';
import { BookOpen, Menu, X, CheckCircle, Target, Download } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ChapterContent from './components/ChapterContent';
import ProgressTracker from './components/ProgressTracker';
import { chapters } from './data/curriculum';
import { ChapterProgress } from './types';

function App() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progress, setProgress] = useState<ChapterProgress[]>(() => {
    const saved = localStorage.getItem('lua-curriculum-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === chapters.length) {
          return parsed;
        }
      } catch {
        // ignore parse errors and fall back to default
      }
    }
    return chapters.map(() => ({ completed: false, score: 0 }));
  });

  useEffect(() => {
    localStorage.setItem('lua-curriculum-progress', JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (chapterIndex: number, completed: boolean, score?: number) => {
    setProgress(prev => prev.map((p, i) => 
      i === chapterIndex ? { ...p, completed, score: score ?? p.score } : p
    ));
  };

  const completedChapters = progress.filter(p => p.completed).length;
  const averageScore = progress.reduce((acc, p) => acc + p.score, 0) / chapters.length;

  // Check if we have valid data before rendering
  if (chapters.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="mx-auto text-blue-600 mb-4" size={48} />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Curriculum...</h2>
          <p className="text-gray-600">Please wait while we load the course content.</p>
        </div>
      </div>
    );
  }

  // Ensure currentChapter is within valid bounds
  const validCurrentChapter = Math.max(0, Math.min(currentChapter, chapters.length - 1));
  const currentProgress = progress[validCurrentChapter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center space-x-2">
              <BookOpen className="text-blue-600" size={28} />
              <h1 className="text-xl font-bold text-gray-900">Lua Programming Mastery</h1>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CheckCircle size={16} className="text-emerald-500" />
              <span>{completedChapters}/{chapters.length} Complete</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Target size={16} className="text-orange-500" />
              <span>{averageScore.toFixed(0)}% Avg Score</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Download size={16} />
              <span>Resources</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          chapters={chapters}
          currentChapter={validCurrentChapter}
          onChapterSelect={setCurrentChapter}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          progress={progress}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-80">
          <div className="max-w-4xl mx-auto p-6">
            {/* Progress Tracker */}
            <ProgressTracker 
              chapters={chapters}
              progress={progress}
              currentChapter={validCurrentChapter}
            />
            
            {/* Chapter Content - Only render if we have valid progress data */}
            {currentProgress && (
              <ChapterContent
                chapter={chapters[validCurrentChapter]}
                chapterIndex={validCurrentChapter}
                totalChapters={chapters.length}
                progress={currentProgress}
                onProgressUpdate={updateProgress}
                onNext={() => validCurrentChapter < chapters.length - 1 && setCurrentChapter(validCurrentChapter + 1)}
                onPrevious={() => validCurrentChapter > 0 && setCurrentChapter(validCurrentChapter - 1)}
              />
            )}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;