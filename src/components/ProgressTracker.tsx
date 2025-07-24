import React from 'react';
import { Star, Trophy, BookOpen, Target } from 'lucide-react';
import { UserProgress } from '../types';

interface ProgressTrackerProps {
  userProgress: UserProgress;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ userProgress }) => {
  const experienceForNextLevel = (userProgress.level * 100) - userProgress.experience;
  const levelProgress = (userProgress.experience % 100);

  const getRewardForLevel = (level: number) => {
    switch (level) {
      case 2: return '新しい本が解放されました！';
      case 3: return '上級者向けの本が解放されました！';
      case 4: return '全ての本が読めるようになりました！';
      default: return '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">あなたの進捗</h2>
        <div className="flex items-center space-x-2">
          <Star className="h-6 w-6 text-yellow-500" />
          <span className="text-xl font-bold text-gray-900">レベル {userProgress.level}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Experience Progress */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-blue-900">経験値</h3>
            <Trophy className="h-5 w-5 text-blue-600" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-blue-700">
              <span>{userProgress.experience} EXP</span>
              <span>次のレベルまで: {experienceForNextLevel}</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${levelProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Reading Progress */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-green-900">読了章数</h3>
            <BookOpen className="h-5 w-5 text-green-600" />
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-green-800">
              {userProgress.completedChapters.length}
            </p>
            <p className="text-sm text-green-700">章を読み終えました</p>
          </div>
        </div>

        {/* Unlocked Books */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-orange-900">解放された本</h3>
            <Target className="h-5 w-5 text-orange-600" />
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-orange-800">
              {userProgress.unlockedBooks.length}
            </p>
            <p className="text-sm text-orange-700">冊の本が読めます</p>
          </div>
        </div>
      </div>

      {/* Level Rewards */}
      {getRewardForLevel(userProgress.level) && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            <p className="text-yellow-800 font-medium">
              🎉 {getRewardForLevel(userProgress.level)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;