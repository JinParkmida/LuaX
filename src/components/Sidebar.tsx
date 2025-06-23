import React from 'react';
import { ChevronRight, CheckCircle, Clock, BookOpen } from 'lucide-react';
import { Chapter, ChapterProgress } from '../types';

interface SidebarProps {
  chapters: Chapter[];
  currentChapter: number;
  onChapterSelect: (index: number) => void;
  isOpen: boolean;
  onClose: () => void;
  progress: ChapterProgress[];
}

const Sidebar: React.FC<SidebarProps> = ({
  chapters,
  currentChapter,
  onChapterSelect,
  isOpen,
  onClose,
  progress
}) => {
  return (
    <aside className={`
      fixed top-16 left-0 h-[calc(100vh-4rem)] w-80 bg-white border-r border-gray-200 
      transform transition-transform duration-300 z-30 overflow-y-auto
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Course Curriculum</h2>
          <p className="text-sm text-gray-600">
            Complete journey from fundamentals to advanced Lua programming
          </p>
        </div>

        <nav className="space-y-2">
          {chapters.map((chapter, index) => {
            const isActive = index === currentChapter;
            const isCompleted = progress[index]?.completed;
            const score = progress[index]?.score || 0;
            
            return (
              <button
                key={index}
                onClick={() => {
                  onChapterSelect(index);
                  onClose();
                }}
                className={`
                  w-full text-left p-4 rounded-lg border transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-50 border-blue-200 shadow-sm' 
                    : 'hover:bg-gray-50 border-transparent hover:border-gray-200'
                  }
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`
                        text-xs font-medium px-2 py-1 rounded-full
                        ${isActive 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-600'
                        }
                      `}>
                        Chapter {index + 1}
                      </span>
                      
                      {isCompleted && (
                        <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                      )}
                    </div>
                    
                    <h3 className={`
                      font-medium text-sm leading-tight mb-2
                      ${isActive ? 'text-blue-900' : 'text-gray-900'}
                    `}>
                      {chapter.title}
                    </h3>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span>{chapter.estimatedTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen size={12} />
                        <span>{chapter.sections.length} sections</span>
                      </div>
                    </div>
                    
                    {isCompleted && score > 0 && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Score</span>
                          <span className={`font-medium ${
                            score >= 80 ? 'text-emerald-600' : 
                            score >= 60 ? 'text-orange-600' : 'text-red-600'
                          }`}>
                            {score}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className={`h-1.5 rounded-full ${
                              score >= 80 ? 'bg-emerald-500' : 
                              score >= 60 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <ChevronRight 
                    size={16} 
                    className={`
                      flex-shrink-0 ml-2 transition-transform
                      ${isActive ? 'text-blue-600 transform rotate-90' : 'text-gray-400'}
                    `} 
                  />
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;