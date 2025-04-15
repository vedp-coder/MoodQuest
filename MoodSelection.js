import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smile, Frown, Sparkles, Heart, BookOpen, Moon, Sun, Coffee, Zap } from 'lucide-react';
import { useMood } from '../context/MoodContext';

const MoodSelection = () => {
  const { setCurrentMood } = useMood();
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodIntensity, setMoodIntensity] = useState(3);

  const moods = [
    { id: 'happy', label: 'Happy', icon: <Smile className="text-yellow-500" /> },
    { id: 'sad', label: 'Sad', icon: <Frown className="text-blue-500" /> },
    { id: 'excited', label: 'Excited', icon: <Sparkles className="text-purple-500" /> },
    { id: 'calm', label: 'Calm', icon: <Heart className="text-green-500" /> },
    { id: 'bored', label: 'Bored', icon: <BookOpen className="text-gray-500" /> },
    { id: 'tired', label: 'Tired', icon: <Moon className="text-indigo-500" /> },
    { id: 'energetic', label: 'Energetic', icon: <Zap className="text-yellow-600" /> },
    { id: 'focused', label: 'Focused', icon: <Sun className="text-orange-500" /> },
    { id: 'anxious', label: 'Anxious', icon: <Coffee className="text-brown-500" /> }
  ];

  const handleSelectMood = (mood) => {
    setSelectedMood(mood);
  };

  const handleSubmit = () => {
    if (selectedMood) {
      setCurrentMood({
        ...selectedMood,
        intensity: moodIntensity,
        timestamp: new Date().toISOString()
      });
      navigate('/tasks');
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">How are you feeling today?</h2>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          {moods.map(mood => (
            <button
              key={mood.id}
              onClick={() => handleSelectMood(mood)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                selectedMood && selectedMood.id === mood.id
                  ? 'bg-purple-100 border-2 border-purple-500'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              <div className="text-3xl mb-2">{mood.icon}</div>
              <span className="text-sm font-medium">{mood.label}</span>
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3 text-gray-700">How intense is this feeling?</h3>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">Mild</span>
              <input
                type="range"
                min="1"
                max="5"
                value={moodIntensity}
                onChange={(e) => setMoodIntensity(parseInt(e.target.value))}
                className="mx-4 flex-1"
              />
              <span className="text-sm text-gray-500">Very Strong</span>
            </div>
            <div className="flex justify-center mt-2">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div 
                    key={level}
                    className={`w-6 h-6 rounded-full ${
                      level <= moodIntensity ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!selectedMood}
          className={`w-full py-3 rounded-lg text-white font-medium transition-colors ${
            selectedMood ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Find Quests for My Mood
        </button>
      </div>
    </div>
  );
};

export default MoodSelection;
