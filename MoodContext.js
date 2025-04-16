import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MoodContext = createContext();

export const useMood = () => useContext(MoodContext);

export const MoodProvider = ({ children }) => {
  const [currentMood, setCurrentMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [streakDays, setStreakDays] = useState(0);
  const [lastCheckIn, setLastCheckIn] = useState(null);
  const [moodPoints, setMoodPoints] = useState(0);

  // Load saved data when app starts
  useEffect(() => {
    loadSavedData();
  }, []);

  // Save data when it changes
  useEffect(() => {
    if (currentMood) {
      saveData();
    }
  }, [currentMood, moodHistory, currentTasks, completedTasks, streakDays, lastCheckIn, moodPoints]);

  const loadSavedData = async () => {
    try {
      const moodData = await AsyncStorage.getItem('moodData');
      if (moodData) {
        const parsedData = JSON.parse(moodData);
        setCurrentMood(parsedData.currentMood);
        setMoodHistory(parsedData.moodHistory || []);
        setCurrentTasks(parsedData.currentTasks || []);
        setCompletedTasks(parsedData.completedTasks || []);
        setStreakDays(parsedData.streakDays || 0);
        setLastCheckIn(parsedData.lastCheckIn);
        setMoodPoints(parsedData.moodPoints || 0);
      }
    } catch (error) {
      console.error('Error loading mood data:', error);
    }
  };

  const saveData = async () => {
    try {
      const moodData = {
        currentMood,
        moodHistory,
        currentTasks,
        completedTasks,
        streakDays,
        lastCheckIn,
        moodPoints
      };
      await AsyncStorage.setItem('moodData', JSON.stringify(moodData));
    } catch (error) {
      console.error('Error saving mood data:', error);
    }
  };

  const updateMood = (mood) => {
    const now = new Date();
    
    // Check if this is a new day for streak calculation
    let newStreakDays = streakDays;
    if (!lastCheckIn || isNewDay(new Date(lastCheckIn), now)) {
      newStreakDays += 1;
    }
    
    // Add to mood history
    const newMoodEntry = {
      mood,
      timestamp: now.toISOString()
    };
    
    setCurrentMood(mood);
    setMoodHistory(prev => [newMoodEntry, ...prev]);
    setLastCheckIn(now.toISOString());
    setStreakDays(newStreakDays);
    
    // Generate tasks based on mood
    generateTasksForMood(mood);
  };

  const isNewDay = (lastDate, currentDate) => {
    return lastDate.getDate() !== currentDate.getDate() || 
           lastDate.getMonth() !== currentDate.getMonth() || 
           lastDate.getFullYear() !== currentDate.getFullYear();
  };

  const generateTasksForMood = (mood) => {
    // Tasks dictionary based on mood
    const tasksByMood = {
      'happy': [
        { id: '1', title: 'Take a celebratory dance break', points: 20, category: 'activity' },
        { id: '2', title: 'Share your joy with a friend', points: 15, category: 'social' },
        { id: '3', title: 'Write down three things going well', points: 10, category: 'reflection' }
      ],
      'sad': [
        { id: '1', title: 'Cozy up with a comfort activity', points: 20, category: 'selfCare' },
        { id: '2', title: 'Listen to a mood-lifting playlist', points: 15, category: 'music' },
        { id: '3', title: 'Take a gentle walk outside', points: 25, category: 'activity' }
      ],
      'angry': [
        { id: '1', title: 'Do a quick physical exercise', points: 25, category: 'activity' },
        { id: '2', title: 'Write an unsent letter to release feelings', points: 20, category: 'reflection' },
        { id: '3', title: 'Practice deep breathing for 2 minutes', points: 15, category: 'mindfulness' }
      ],
      'anxious': [
        { id: '1', title: 'Complete a 5-minute guided meditation', points: 20, category: 'mindfulness' },
        { id: '2', title: 'Break down one worry into actionable steps', points: 25, category: 'planning' },
        { id: '3', title: 'Do a grounding exercise with your 5 senses', points: 15, category: 'mindfulness' }
      ],
      'energetic': [
        { id: '1', title: 'Start a creative project', points: 30, category: 'creativity' },
        { id: '2', title: 'Challenge yourself to learn something new', points: 25, category: 'growth' },
        { id: '3', title: 'Help someone with a task or project', points: 20, category: 'social' }
      ],
      'tired': [
        { id: '1', title: 'Take a refreshing 20-minute nap', points: 15, category: 'selfCare' },
        { id: '2', title: 'Hydrate and have a nutritious snack', points: 10, category: 'health' },
        { id: '3', title: 'Set one small, achievable goal for today', points: 20, category: 'productivity' }
      ],
      'bored': [
        { id: '1', title: 'Try a random skill challenge', points: 25, category: 'growth' },
        { id: '2', title: 'Rearrange a space in your home', points: 20, category: 'creativity' },
        { id: '3', title: 'Reach out to someone you haven\'t talked to recently', points: 15, category: 'social' }
      ]
    };
    
    // Default tasks if mood doesn't match our categories
    const defaultTasks = [
      { id: '1', title: 'Take a moment to check in with yourself', points: 15, category: 'mindfulness' },
      { id: '2', title: 'Do something kind for yourself', points: 20, category: 'selfCare' },
      { id: '3', title: 'Set an intention for the rest of your day', points: 10, category: 'planning' }
    ];
    
    // Set new tasks based on mood
    const newTasks = tasksByMood[mood] || defaultTasks;
    setCurrentTasks(newTasks);
  };

  const completeTask = (taskId) => {
    // Find the task
    const task = currentTasks.find(t => t.id === taskId);
    if (!task) return;
    
    // Add to completed tasks
    setCompletedTasks(prev => [...prev, {...task, completedAt: new Date().toISOString()}]);
    
    // Remove from current tasks
    setCurrentTasks(prev => prev.filter(t => t.id !== taskId));
    
    // Award points
    setMoodPoints(prev => prev + task.points);
  };

  const value = {
    currentMood,
    moodHistory,
    currentTasks,
    completedTasks,
    streakDays,
    moodPoints,
    updateMood,
    completeTask
  };

  return (
    <MoodContext.Provider value={value}>
      {children}
    </MoodContext.Provider>
  );
};

export default MoodContext;
