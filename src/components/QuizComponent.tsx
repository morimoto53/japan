import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowLeft, Trophy } from 'lucide-react';
import { Chapter } from '../types';

interface QuizComponentProps {
  chapter: Chapter;
  onComplete: (score: number) => void;
  onBack: () => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ chapter, onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === chapter.questions[currentQuestion].answer;
    const newScore = isCorrect ? score + 1 : score;
    const newAnswers = [...userAnswers, selectedAnswer];

    setUserAnswers(newAnswers);
    setScore(newScore);
    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < chapter.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Quiz complete
        onComplete(newScore);
      }
    }, 2000);
  };

  const question = chapter.questions[currentQuestion];
  const isCorrect = showResult && selectedAnswer === question.answer;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">理解度チェック</h1>
              <p className="text-blue-100">{chapter.title}</p>
            </div>
            <button
              onClick={onBack}
              className="p-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="p-6 border-b bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              質問 {currentQuestion + 1} / {chapter.questions.length}
            </span>
            <span className="text-sm text-gray-500">
              正解: {score} / {currentQuestion + (showResult ? 1 : 0)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / chapter.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ";
              
              if (showResult) {
                if (option === question.answer) {
                  buttonClass += "border-green-500 bg-green-50 text-green-800";
                } else if (option === selectedAnswer && option !== question.answer) {
                  buttonClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
                }
              } else {
                if (selectedAnswer === option) {
                  buttonClass += "border-blue-500 bg-blue-50 text-blue-800";
                } else {
                  buttonClass += "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswerSelect(option)}
                  className={buttonClass}
                  disabled={showResult}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showResult && option === question.answer && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {showResult && option === selectedAnswer && option !== question.answer && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Result Message */}
          {showResult && (
            <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex items-center space-x-2">
                {isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? '正解です！' : '間違いです。'}
                </span>
              </div>
              {isCorrect && (
                <p className="mt-2 text-sm text-green-700">+5 EXP を獲得しました！</p>
              )}
            </div>
          )}

          {/* Next Button */}
          {!showResult && (
            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === chapter.questions.length - 1 ? '完了' : '次の質問'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;