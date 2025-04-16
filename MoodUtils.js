// Utility functions for mood-related operations

// Get emoji based on mood
export const getMoodEmoji = (mood) => {
  const emojiMap = {
    'happy': '😊',
    'sad': '😢',
    'angry': '😠',
    'anxious': '😰',
    'energetic': '⚡',
    'tired': '😴',
    'bored': '😐',
    'peaceful': '😌',
    'excited': '🤩',
    'grateful': '🙏',
    'stressed': '😫',
    'creative': '🎨',
    'inspired': '💡',
    'focused': '🔍',
    'distracted': '🌀',
    'hopeful': '🌱',
    'overwhelmed': '🌊',
    'curious': '🧐'
  };

  return emojiMap[mood] || '😶';
};

// Get background color based on mood
export const getMoodColor = (mood) => {
  const colorMap = {
    'happy': '#FFD700',      // Gold
    'sad': '#6495ED',        // Cornflower Blue
    'angry': '#FF6347',      // Tomato
    'anxious': '#9370DB',    // Medium Purple
    'energetic': '#FF4500',  // Orange Red
    'tired': '#708090',      // Slate Gray
    'bored': '#C0C0C0',      // Silver
    'peaceful': '#87CEEB',   // Sky Blue
    'excited': '#FF1493',    // Deep Pink
    'grateful': '#90EE90',   // Light Green
    'stressed': '#8B0000',   // Dark Red
    'creative': '#9932CC',   // Dark Orchid
    'inspired': '#1E90FF',   // Dodger Blue
    'focused': '#008080',    // Teal
    'distracted': '#F0E68C', // Khaki
    'hopeful': '#00FF7F',    // Spring Green
    'overwhelmed': '#4682B4', // Steel Blue
    'curious': '#FFA07A'     // Light Salmon
  };

  return colorMap[mood] || '#CCCCCC';  // Default gray
};

// Get suggested activities based on mood
export const getMoodActivities = (mood) => {
  const activitiesMap = {
    'happy': [
      'Share your joy with someone',
      'Dance to your favorite music',
      'Start a project you've been excited about',
      'Practice gratitude journaling'
    ],
    'sad': [
      'Cozy up with a comfort movie or book',
      'Listen to soothing music',
      'Take a gentle walk in nature',
      'Reach out to a supportive friend'
    ],
    'angry': [
      'Do a physical workout',
      'Practice deep breathing',
      'Write out your feelings',
      'Find a private space to let out the emotion'
    ],
    'anxious': [
      'Try the 5-4-3-2-1 grounding technique',
      'Do a guided meditation',
      'Make a list of what you can control',
      'Progressive muscle relaxation'
    ],
    'energetic': [
      'Start a creative project',
      'Learn something new and challenging',
      'Clean or organize a space',
      'Help someone with a task'
    ],
    'tired': [
      'Take a power nap (20 minutes)',
      'Hydrate and have a nutritious snack',
      'Do some light stretching',
      'Set small, achievable goals'
    ],
    'bored': [
      'Try a random skill challenge',
      'Call an old friend to catch up',
      'Explore a new area in your city',
      'Research a topic that interests you'
    ]
  };

  return activitiesMap[mood] || [
    'Take a moment to breathe deeply',
    'Check in with how your body feels',
    'Write down your current thoughts',
    'Set an intention for the next few hours'
  ];
};

// Format timestamp to readable date
export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Calculate streak status
export const calculateStreakStatus = (lastCheckIn) => {
  if (!lastCheckIn) return { current: 0, isActive: false };
  
  const now = new Date();
  const lastCheck = new Date(lastCheckIn);
  const diffTime = Math.abs(now - lastCheck);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  return {
    isActive: diffDays <= 1,
    daysMissed: diffDays > 1 ? diffDays - 1 : 0
  };
};
