import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, X } from 'lucide-react';
import { Quiz as QuizType } from '../types';

interface QuizProps {
  quiz: QuizType;
  onComplete: (score: number) => void;
  onClose: () => void;
}

const Quiz: React.FC<QuizProps> = ({ quiz, onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    if (submitted) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = () => {
    setSubmitted(true);
    setShowResults(true);
  };

  const calculateScore = () => {
    const correct = answers.reduce((count, answer, index) => {
      return count + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    return Math.round((correct / quiz.questions.length) * 100);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setSubmitted(false);
  };

  const score = showResults ? calculateScore() : 0;
  const question = quiz.questions[currentQuestion];

  if (showResults) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            score >= 80 ? 'bg-emerald-100' : score >= 60 ? 'bg-orange-100' : 'bg-red-100'
          }`}>
            {score >= 80 ? (
              <CheckCircle size={32} className="text-emerald-600" />
            ) : (
              <XCircle size={32} className={score >= 60 ? 'text-orange-600' : 'text-red-600'} />
            )}
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h3>
          <p className="text-lg text-gray-600 mb-4">
            You scored {score}% ({answers.filter((a, i) => a === quiz.questions[i].correctAnswer).length} out of {quiz.questions.length} correct)
          </p>
          
          <div className={`inline-block px-4 py-2 rounded-full font-medium ${
            score >= 80 
              ? 'bg-emerald-100 text-emerald-800' 
              : score >= 60 
                ? 'bg-orange-100 text-orange-800' 
                : 'bg-red-100 text-red-800'
          }`}>
            {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good Job!' : 'Keep Practicing!'}
          </div>
        </div>

        {/* Question Review */}
        <div className="space-y-6 mb-8">
          <h4 className="text-lg font-semibold text-gray-900">Review Your Answers</h4>
          {quiz.questions.map((q, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === q.correctAnswer;
            
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  {isCorrect ? (
                    <CheckCircle size={20} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 mb-2">{q.question}</h5>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">Your answer:</span>{' '}
                        <span className={isCorrect ? 'text-emerald-600' : 'text-red-600'}>
                          {q.options[userAnswer]}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm">
                          <span className="font-medium text-gray-700">Correct answer:</span>{' '}
                          <span className="text-emerald-600">{q.options[q.correctAnswer]}</span>
                        </p>
                      )}
                      {q.explanation && (
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          <span className="font-medium">Explanation:</span> {q.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={resetQuiz}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RotateCcw size={20} />
            <span>Retake Quiz</span>
          </button>
          <button
            onClick={() => onComplete(score)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Learning
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Chapter Quiz</h3>
          <p className="text-gray-600">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={20} className="text-gray-400" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h4 className="text-lg font-medium text-gray-900 mb-6">{question.question}</h4>
        
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = answers[currentQuestion] === index;
            
            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`
                  w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                  ${isSelected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-4 h-4 rounded-full border-2 flex items-center justify-center
                    ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}
                  `}>
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <span className="text-gray-900">{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <button
          onClick={nextQuestion}
          disabled={answers[currentQuestion] === undefined}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestion === quiz.questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;