import React, { useState, useEffect } from 'react';
import { BookOpen, Star, Trophy, ChevronRight, Home, Book, User } from 'lucide-react';
import BookSelection from './components/BookSelection';
import ReadingInterface from './components/ReadingInterface';
import QuizComponent from './components/QuizComponent';
import ProgressTracker from './components/ProgressTracker';
import { Book as BookType, UserProgress, Chapter } from './types';
import { books } from './data/books';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'reading' | 'quiz'>('home');
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 1,
    experience: 0,
    completedChapters: [],
    unlockedBooks: ['kokoro-intro', 'melos']
  });

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('readingProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    // Save progress to localStorage
    localStorage.setItem('readingProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  const handleBookSelect = (book: BookType) => {
    setSelectedBook(book);
    setCurrentView('reading');
  };

  const handleChapterSelect = (chapter: Chapter) => {
    setCurrentChapter(chapter);
    setCurrentView('reading');
  };

  const handleQuizStart = () => {
    setCurrentView('quiz');
  };

  const handleQuizComplete = (score: number) => {
    if (!selectedBook || !currentChapter) return;

    const experienceGained = score * 5;
    const newExperience = userProgress.experience + experienceGained;
    const newLevel = Math.floor(newExperience / 100) + 1;

    const chapterId = `${selectedBook.id}-${currentChapter.id}`;
    const completedChapters = [...userProgress.completedChapters];
    
    if (!completedChapters.includes(chapterId)) {
      completedChapters.push(chapterId);
    }

    // Unlock new books based on level
    const unlockedBooks = [...userProgress.unlockedBooks];
    if (newLevel >= 2 && !unlockedBooks.includes('kokoro-complete')) {
      unlockedBooks.push('kokoro-complete');
    }
    if (newLevel >= 3 && !unlockedBooks.includes('hashire-melos-advanced')) {
      unlockedBooks.push('hashire-melos-advanced');
    }
    if (newLevel >= 4 && !unlockedBooks.includes('kokoro-advanced')) {
      unlockedBooks.push('kokoro-advanced');
    }

    setUserProgress({
      level: newLevel,
      experience: newExperience,
      completedChapters,
      unlockedBooks
    });

    setCurrentView('reading');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">文学の扉</h1>
              <span className="text-sm text-gray-500">やさしい日本語で読む名作</span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold text-gray-700">レベル {userProgress.level}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-orange-500" />
                <span className="text-gray-700">{userProgress.experience} EXP</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setCurrentView('home')}
              className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm ${
                currentView === 'home'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>ホーム</span>
            </button>
            <button
              onClick={() => setCurrentView('reading')}
              className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm ${
                currentView === 'reading'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              disabled={!selectedBook}
            >
              <Book className="h-4 w-4" />
              <span>読書</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {currentView === 'home' && (
          <div className="space-y-8">
            <ProgressTracker userProgress={userProgress} />
            <BookSelection 
              books={books.filter(book => userProgress.unlockedBooks.includes(book.id))} 
              onBookSelect={handleBookSelect}
              userProgress={userProgress}
            />
          </div>
        )}
        
        {currentView === 'reading' && selectedBook && (
          <ReadingInterface
            book={selectedBook}
            currentChapter={currentChapter}
            onChapterSelect={handleChapterSelect}
            onQuizStart={handleQuizStart}
            userProgress={userProgress}
          />
        )}
        
        {currentView === 'quiz' && currentChapter && (
          <QuizComponent
            chapter={currentChapter}
            onComplete={handleQuizComplete}
            onBack={() => setCurrentView('reading')}
          />
        )}
      </main>
    </div>
  );
}

export default App;