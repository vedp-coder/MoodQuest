import React, { useState, useEffect } from 'react';
import { useMood } from '../context/MoodContext';
import { useTask } from '../context/TaskContext';
import { useUser } from '../context/UserContext';
import { Check, Share2, Image, X, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TasksView = () => {
  const { currentMood } = useMood();
  const { getTasksByMood, completeTask } = useTask();
  const { addPoints } = useUser();
  const navigate = useNavigate();
  
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSharingModal, setShowSharingModal] = useState(false);
  const [shareNote, setShareNote] = useState('');
  const [filters, setFilters] = useState('normal');
  
  const availableFilters = [
    'normal', 'vintage', 'grayscale', 'sepia', 'vibrant', 
    'moody', 'dreamy', 'sharp', 'soft', 'contrasty'
  ];

  useEffect(() => {
    if (!currentMood) {
      navigate('/mood');
      return;
    }
    
    const moodTasks = getTasksByMood(currentMood.id);
    setTasks(moodTasks);
  }, [currentMood, getTasksByMood, navigate]);

  const handleCompleteTask = (task) => {
    setSelectedTask(task);
    // For simplicity in this demo, we're showing the sharing modal right away
    // A real app might have task-specific completion steps
    setShowSharingModal(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, we'd handle the actual file upload
      // For this demo, we'll use a placeholder
      setSelectedImage('/api/placeholder/400/400');
    }
  };

  const handleShareTask = () => {
    if (selectedTask) {
      // Complete the task and award points
      completeTask(selectedTask.id);
      addPoints(selectedTask.points);
      
      // Update UI state
      setCompletedTasks([...completedTasks, selectedTask.id]);
      setShowSharingModal(false);
      setSelectedTask(null);
      setSelectedImage(null);
      setShareNote('');
      
      // In a real app, we would save the post to the backend here
    }
  };

  if (!currentMood) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your {currentMood.label} Quests</h2>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            {tasks.filter(task => completedTasks.includes(task.id)).length}/{tasks.length} done
          </span>
        </div>
        
        <div className="space-y-4">
          {tasks.map(task => (
            <div 
              key={task.id}
              className={`rounded-lg p-4 border ${
                completedTasks.includes(task.id) 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-gray-200 hover:border-purple-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className={`font-medium ${completedTasks.includes(task.id) ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                    {task.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{task.description}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 font-medium mr-3">{task.points} pts</span>
                  {!completedTasks.includes(task.id) ? (
                    <button
                      onClick={() => handleCompleteTask(task)}
                      className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-purple-700"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  ) : (
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share Modal */}
      {showSharingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Share Your Quest</h3>
              <button 
                onClick={() => setShowSharingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-600 mb-2">
                Completed: <span className="font-medium text-gray-800">{selectedTask?.title}</span>
              </p>
              
              <textarea
                value={shareNote}
                onChange={(e) => setShareNote(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Share how this quest made you feel..."
                rows="3"
              ></textarea>
            </div>
            
            {selectedImage ? (
              <div className="mb-4 relative">
                <img 
                  src={selectedImage} 
                  alt="Selected" 
                  className={`w-full h-48 object-cover rounded-lg ${filters}`}
                />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="mb-4">
                <div className="flex space-x-2">
                  <label className="flex-1 flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg py-3 cursor-pointer hover:bg-gray-200">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Image className="w-5 h-5 mr-2" />
                    Add Photo
                  </label>
                  <button className="flex-1 flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg py-3 hover:bg-gray-200">
                    <Camera className="w-5 h-5 mr-2" />
                    Take Photo
                  </button>
                </div>
              </div>
            )}
            
            {selectedImage && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apply Filter
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {availableFilters.map(filter => (
                    <button
                      key={filter}
                      onClick={() => setFilters(filter)}
                      className={`p-1 text-xs rounded ${
                        filters === filter ? 'bg-purple-100 text-purple-800' : 'bg-gray-100'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowSharingModal(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleShareTask}
                className="flex-1 flex items-center justify-center py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share & Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksView;
