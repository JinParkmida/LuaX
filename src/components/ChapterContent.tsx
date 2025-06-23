import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Clock, Target, CheckCircle, ArrowLeft, ArrowRight, Code, Play, Download } from 'lucide-react';
import CodeBlock from './CodeBlock';
import Quiz from './Quiz';
import { Chapter, ChapterProgress } from '../types';

interface ChapterContentProps {
  chapter: Chapter;
  chapterIndex: number;
  totalChapters: number;
  progress: ChapterProgress;
  onProgressUpdate: (chapterIndex: number, completed: boolean, score?: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ChapterContent: React.FC<ChapterContentProps> = ({
  chapter,
  chapterIndex,
  totalChapters,
  progress,
  onProgressUpdate,
  onNext,
  onPrevious
}) => {
  const [activeSection, setActiveSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleQuizComplete = (score: number) => {
    onProgressUpdate(chapterIndex, true, score);
    setShowQuiz(false);
  };

  const currentSection = chapter.sections[activeSection];

  return (
    <div className="space-y-8">
      {/* Chapter Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                Chapter {chapterIndex + 1}
              </span>
              {progress.completed && (
                <CheckCircle size={20} className="text-emerald-500" />
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{chapter.title}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{chapter.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
            <Clock size={20} className="text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-900">Duration</p>
              <p className="text-sm text-blue-700">{chapter.estimatedTime}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-lg">
            <Target size={20} className="text-emerald-600" />
            <div>
              <p className="text-sm font-medium text-emerald-900">Difficulty</p>
              <p className="text-sm text-emerald-700">{chapter.difficulty}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
            <Code size={20} className="text-orange-600" />
            <div>
              <p className="text-sm font-medium text-orange-900">Sections</p>
              <p className="text-sm text-orange-700">{chapter.sections.length} topics</p>
            </div>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Learning Objectives</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {chapter.objectives.map((objective, index) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prerequisites */}
        {chapter.prerequisites.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Prerequisites</h3>
            <div className="flex flex-wrap gap-2">
              {chapter.prerequisites.map((prereq, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {prereq}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Section Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Chapter Sections</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {chapter.sections.map((section, index) => (
            <button
              key={index}
              onClick={() => setActiveSection(index)}
              className={`
                p-4 text-left rounded-lg border transition-all duration-200
                ${activeSection === index
                  ? 'bg-blue-50 border-blue-200 shadow-sm'
                  : 'hover:bg-gray-50 border-gray-200'
                }
              `}
            >
              <div className="flex items-center space-x-2 mb-2">
                <span className={`
                  text-xs font-medium px-2 py-1 rounded-full
                  ${activeSection === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                  }
                `}>
                  {index + 1}
                </span>
              </div>
              <h4 className="font-medium text-sm text-gray-900">{section.title}</h4>
            </button>
          ))}
        </div>
      </div>

      {/* Section Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentSection.title}</h2>
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <CodeBlock code={String(children).trim()} language={match[1]} />
                  ) : (
                    <code className={className} {...props}>{children}</code>
                  );
                }
              }}
            >
              {currentSection.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Code Examples */}
        {currentSection.codeExamples.map((example, index) => (
          <div key={index} className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-gray-900">{example.title}</h4>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors">
                  <Play size={14} />
                  <span className="text-sm">Run</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Download size={14} />
                  <span className="text-sm">Copy</span>
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{example.explanation}</p>
            <CodeBlock code={example.code} language="lua" />
            {example.output && (
              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-900 mb-2">Output:</h5>
                <CodeBlock code={example.output} language="text" />
              </div>
            )}
          </div>
        ))}

        {/* Exercises */}
        {currentSection.exercises.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Practice Exercises</h3>
            <div className="space-y-6">
              {currentSection.exercises.map((exercise, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">{exercise.title}</h4>
                  <p className="text-gray-700 mb-4">{exercise.description}</p>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Instructions:</h5>
                      <ol className="list-decimal list-inside space-y-1 text-gray-700">
                        {exercise.instructions.map((instruction, i) => (
                          <li key={i}>{instruction}</li>
                        ))}
                      </ol>
                    </div>
                    {exercise.starterCode && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-900 mb-2">Starter Code:</h5>
                        <CodeBlock code={exercise.starterCode} language="lua" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quiz Section */}
      {chapter.quiz && !showQuiz && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready for the Quiz?</h3>
            <p className="text-gray-600 mb-6">
              Test your understanding of {chapter.title} with {chapter.quiz.questions.length} questions.
            </p>
            <button
              onClick={() => setShowQuiz(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Start Quiz
            </button>
          </div>
        </div>
      )}

      {showQuiz && chapter.quiz && (
        <Quiz
          quiz={chapter.quiz}
          onComplete={handleQuizComplete}
          onClose={() => setShowQuiz(false)}
        />
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8">
        <button
          onClick={onPrevious}
          disabled={chapterIndex === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={20} />
          <span>Previous</span>
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Section {activeSection + 1} of {chapter.sections.length}
          </p>
        </div>

        <button
          onClick={onNext}
          disabled={chapterIndex === totalChapters - 1}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChapterContent;