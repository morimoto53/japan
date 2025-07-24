import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Play, CheckCircle } from 'lucide-react';
import { Book, Chapter, UserProgress } from '../types';

interface ReadingInterfaceProps {
  book: Book;
  currentChapter: Chapter | null;
  onChapterSelect: (chapter: Chapter) => void;
  onQuizStart: () => void;
  userProgress: UserProgress;
}

const ReadingInterface: React.FC<ReadingInterfaceProps> = ({
  book,
  currentChapter,
  onChapterSelect,
  onQuizStart,
  userProgress
}) => {
  const [showOriginal, setShowOriginal] = useState(false);
  const chapter = currentChapter || book.chapters[0];

  const isChapterCompleted = (chapterId: number) => {
    return userProgress.completedChapters.includes(`${book.id}-${chapterId}`);
  };

  const handlePrevChapter = () => {
    const currentIndex = book.chapters.findIndex(c => c.id === chapter.id);
    if (currentIndex > 0) {
      onChapterSelect(book.chapters[currentIndex - 1]);
    }
  };

  const handleNextChapter = () => {
    const currentIndex = book.chapters.findIndex(c => c.id === chapter.id);
    if (currentIndex < book.chapters.length - 1) {
      onChapterSelect(book.chapters[currentIndex + 1]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className={`${book.cover_color} text-white p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
              <p className="text-white/90">作者: {book.author}</p>
            </div>
            <BookOpen className="h-12 w-12 text-white/80" />
          </div>
        </div>

        {/* Chapter Selection */}
        <div className="p-6 border-b bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">章を選択</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {book.chapters.map((chap) => (
              <button
                key={chap.id}
                onClick={() => onChapterSelect(chap)}
                className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                  chapter.id === chap.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{chap.title}</span>
                {isChapterCompleted(chap.id) && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Reading Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">{chapter.title}</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowOriginal(!showOriginal)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {showOriginal ? 'やさしい版' : '原文'}
              </button>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="text-gray-800 leading-relaxed text-lg">
                {showOriginal ? chapter.original_text : chapter.simple_text}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePrevChapter}
              disabled={book.chapters.findIndex(c => c.id === chapter.id) === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>前の章</span>
            </button>

            <button
              onClick={onQuizStart}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Play className="h-4 w-4" />
              <span>クイズに挑戦</span>
            </button>

            <button
              onClick={handleNextChapter}
              disabled={book.chapters.findIndex(c => c.id === chapter.id) === book.chapters.length - 1}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>次の章</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingInterface;