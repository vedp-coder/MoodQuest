import React, { useState } from 'react';
import { User, Settings, LogOut, Camera, Grid, Clock, Award, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';

const Profile = () => {
  const { logout } = useAuth();
  const { user, stats, updateProfile, backgrounds, selectedBackground, setSelectedBackground } = useUser();
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: user?.username || '',
    bio: user?.bio || ''
  });
  
  const handleUpdateProfile = () => {
    updateProfile(editedUser);
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setEditedUser({
      username: user?.username || '',
      bio: user?.bio || ''
    });
    setIsEditing(false);
  };
  
  // Placeholder data for demonstration
  const userPosts = [
    { id: 1, image: '/api/placeholder/200/200', likes: 12, timestamp: '2 days ago' },
    { id: 2, image: '/api/placeholder/200/200', likes: 8, timestamp: '3 days ago' },
    { id: 3, image: '/api/placeholder/200/200', likes: 24, timestamp: '1 week ago' }
  ];
  
  const userAchievements = [
    { id: 1, title: 'Mood Master', description: 'Completed 5 different mood quests', icon: <Award className="text-yellow-500" /> },
    { id: 2, title: 'Social Butterfly', description: 'Made 3 friends', icon: <Heart className="text-pink-500" /> },
    { id: 3, title: 'Consistent Quester', description: 'Completed quests 3 days in a row', icon: <Clock className="text-blue-500" /> }
  ];

  return (
    <div className="max-w-lg mx-auto">
      <div className={`bg-white rounded-xl shadow-lg overflow-hidden mb-6`}>
        <div className={`h-32 ${selectedBackground || 'bg-gradient-to-r from-purple-400 to-pink-500'}`}></div>
        
        <div className="px-6 pb-6 relative">
          <div className="flex justify-end absolute right-6 top-2">
            <button
              onClick={() => logout()}
              className="p-2 bg-white bg-opacity-70 rounded-full text-gray-700 hover:text-red-500"
            >
              <LogOut className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 bg-white bg-opacity-70 rounded-full text-gray-700 hover:text-purple-600 ml-2"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-col items-center -mt-12 mb-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white p-1">
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {user?.profilePic ? (
                    <img 
                      src={user.profilePic} 
                      alt={user.username} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-gray-400" />
                  )}
                </div>
              </div>
              <button className="absolute bottom-0 right-0 bg-purple-600 text-white p-1 rounded-full">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            {isEditing ? (
              <div className="mt-4 w-full">
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={editedUser.username}
                    onChange={(e) => setEditedUser({...editedUser, username: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={editedUser.bio}
                    onChange={(e) => setEditedUser({...editedUser, bio: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows="3"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Background Theme
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {backgrounds.map((bg, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedBackground(bg)}
                        className={`h-8 rounded-md ${bg} ${selectedBackground === bg ? 'ring-2 ring-purple-600' : ''}`}
                      ></button>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 py-2 border border-gray-300 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateProfile}
                    className="flex-1 py-2 bg-purple-600 text-white rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-xl font-bold mt-4">{user?.username || 'Username'}</h1>
                <p className="text-gray-600 text-center mt-1">
                  {user?.bio || 'No bio yet'}
                </p>
              </>
            )}
            
            {!isEditing && (
              <div className="flex justify-center mt-4 space-x-4">
                <div className="text-center">
                  <div className="text-xl font-bold">{stats?.posts || 0}</div>
                  <div className="text-gray-500 text-sm">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{stats?.friends || 0}</div>
                  <div className="text-gray-500 text-sm">Friends</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{stats?.points || 0}</div>
                  <div className="text-gray-500 text-sm">Points</div>
                </div>
              </div>
            )}
          </div>
          
          {!isEditing && (
            <div className="border-t">
              <div className="flex mt-4">
                <button
                  className={`flex-1 py-2 text-center ${activeTab === 'posts' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('posts')}
                >
                  <Grid className="w-5 h-5 mx-auto" />
                </button>
                <button
                  className={`flex-1 py-2 text-center ${activeTab === 'achievements' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('achievements')}
                >
                  <Award className="w-5 h-5 mx-auto" />
                </button>
              </div>
              
              {activeTab === 'posts' && (
                <div className="mt-4 grid grid-cols-3 gap-1">
                  {userPosts.map(post => (
                    <div key={post.id} className="aspect-square bg-gray-100 relative overflow-hidden">
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 left-1 flex items-center text-white text-xs">
                        <Heart className="w-3 h-3 mr-1 fill-white" />
                        {post.likes}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'achievements' && (
                <div className="mt-4 space-y-3">
                  {userAchievements.map(achievement => (
                    <div key={achievement.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="bg-white p-2 rounded-full mr-3">
                        {achievement.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-gray-500">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
