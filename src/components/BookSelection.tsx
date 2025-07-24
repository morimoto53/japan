import React from 'react';
import { Book, Lock, CheckCircle, Clock } from 'lucide-react';
import { Book as BookType, UserProgress } from '../types';

interface BookSelectionProps {
  books: BookType[];
  onBookSelect: (book: BookType) => void;
  userProgress: UserProgress;
}

const BookSelection: React.FC<BookSelectionProps> = ({ books, onBookSelect, userProgress }) => {
  const getBookProgress = (book: BookType) => {
    const completedChapters = userProgress.completedChapters.filter(id => 
      id.startsWith(book.id)
    ).length;
    return {
      completed: completedChapters,
      total: book.chapters.length,
      percentage: Math.round((completedChapters / book.chapters.length) * 100)
    };
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-yellow-100 text-yellow-800';
      case 3: return 'bg-orange-100 text-orange-800';
      case 4: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'やさしい';
      case 2: return 'ふつう';
      case 3: return 'むずかしい';
      case 4: return 'とてもむずかしい';
      default: return 'unknown';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">本を選んでください</h2>
        <p className="text-gray-600">あなたのレベルに合った本を読んで、経験値を集めましょう</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => {
          const progress = getBookProgress(book);
          const isCompleted = progress.completed === progress.total;
          
          return (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer"
              onClick={() => onBookSelect(book)}
            >
              <div className={`h-32 ${book.cover_color} flex items-center justify-center`}>
                <Book className="h-12 w-12 text-white" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{book.title}</h3>
                  {isCompleted && (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  )}
                </div>
                
                <p className="text-gray-600 mb-2">作者: {book.author}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(book.difficulty)}`}>
                    {getDifficultyLabel(book.difficulty)}
                  </span>
                  
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{book.chapters.length}章</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{book.description}</p>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>進捗</span>
                    <span>{progress.completed}/{progress.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress.percentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <span>{isCompleted ? '再読する' : '読み始める'}</span>
                  <Book className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookSelection;