import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { Chapter, ChapterProgress } from '../types';

interface ProgressTrackerProps {
  chapters: Chapter[];
  progress: ChapterProgress[];
  currentChapter: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  chapters,
  progress,
  currentChapter
}) => {
  const completedCount = progress.filter(p => p.completed).length;
  const overallProgress = (completedCount / chapters.length) * 100;
  const averageScore = progress.reduce((acc, p) => acc + p.score, 0) / chapters.length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Learning Progress</h2>
        <div className="text-sm text-gray-600">
          {completedCount} of {chapters.length} chapters completed
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm text-gray-600">{Math.round(overallProgress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{completedCount}</div>
          <div className="text-sm text-blue-700">Completed</div>
        </div>
        <div className="text-center p-4 bg-emerald-50 rounded-lg">
          <div className="text-2xl font-bold text-emerald-600">{Math.round(averageScore)}%</div>
          <div className="text-sm text-emerald-700">Avg Score</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">{chapters.length - completedCount}</div>
          <div className="text-sm text-orange-700">Remaining</div>
        </div>
      </div>

      {/* Chapter Progress Dots */}
      <div className="hidden sm:block">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Chapter Progress</h3>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {chapters.map((chapter, index) => {
            const isCompleted = progress[index]?.completed;
            const isCurrent = index === currentChapter;
            const score = progress[index]?.score || 0;
            
            return (
              <div
                key={index}
                className="flex flex-col items-center space-y-1 flex-shrink-0"
                title={`${chapter.title} - ${isCompleted ? `${score}% score` : 'Not completed'}`}
              >
                <div className={`
                  relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200
                  ${isCurrent 
                    ? 'border-blue-500 bg-blue-500 shadow-lg' 
                    : isCompleted 
                      ? 'border-emerald-500 bg-emerald-500' 
                      : 'border-gray-300 bg-white'
                  }
                `}>
                  {isCompleted ? (
                    <CheckCircle size={16} className="text-white" />
                  ) : isCurrent ? (
                    <Clock size={16} className="text-white" />
                  ) : (
                    <Circle size={16} className="text-gray-400" />
                  )}
                </div>
                <span className="text-xs text-gray-500 text-center">
                  {index + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;