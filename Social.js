import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, UserPlus, MoreHorizontal, Search } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Social = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // In a real app, we'd fetch posts from an API
    // This is dummy data for demonstration
    const dummyPosts = [
      {
        id: 1,
        userId: 'user1',
        username: 'EmmaJ',
        profilePic: '/api/placeholder/50/50',
        mood: 'happy',
        moodEmoji: '😊',
        task: 'Sent a kind message to someone',
        content: 'Reached out to an old friend today. Feels amazing to reconnect!',
        image: '/api/placeholder/400/300',
        filter: 'normal',
        timestamp: '10 min ago',
        likes: 12,
        comments: 3,
        isLiked: false
      },
      {
        id: 2,
        userId: 'user2',
        username: 'JackT',
        profilePic: '/api/placeholder/50/50',
        mood: 'calm',
        moodEmoji: '😌',
        task: 'Did a 5-minute meditation',
        content: 'Finding peace in the chaos. Today\'s meditation helped me center myself.',
        image: null,
        timestamp: '1 hour ago',
        likes: 8,
        comments: 2,
        isLiked: true
      },
      {
        id: 3,
        userId: 'user3',
        username: 'SophiaL',
        profilePic: '/api/placeholder/50/50',
        mood: 'excited',
        moodEmoji: '✨',
        task: 'Made something artistic',
        content: 'Tried painting for the first time in years!',
        image: '/api/placeholder/400/400',
        filter: 'vintage',
        timestamp: '3 hours ago',
        likes: 24,
        comments: 7,
        isLiked: false
      }
    ];
    
    setPosts(dummyPosts);
  }, []);

  const handleLikePost = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const filteredPosts = posts.filter(post => {
    // Filter by mood if a specific mood is selected
    if (filter !== 'all' && post.mood !== filter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !(
      post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.task.toLowerCase().includes(searchQuery.toLowerCase())
    )) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search posts, people, moods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="flex overflow-x-auto pb-2 -mx-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1 mx-1 rounded-full whitespace-nowrap ${
              filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            All Moods
          </button>
          <button
            onClick={() => setFilter('happy')}
            className={`px-4 py-1 mx-1 rounded-full whitespace-nowrap ${
              filter === 'happy' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            😊 Happy
          </button>
          <button
            onClick={() => setFilter('sad')}
            className={`px-4 py-1 mx-1 rounded-full whitespace-nowrap ${
              filter === 'sad' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            😢 Sad
          </button>
          <button
            onClick={() => setFilter('excited')}
            className={`px-4 py-1 mx-1 rounded-full whitespace-nowrap ${
              filter === 'excited' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            ✨ Excited
          </button>
          <button
            onClick={() => setFilter('calm')}
            className={`px-4 py-1 mx-1 rounded-full whitespace-nowrap ${
              filter === 'calm' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            😌 Calm
          </button>
          <button
            onClick={() => setFilter('bored')}
            className={`px-4 py-1 mx-1 rounded-full whitespace-nowrap ${
              filter === 'bored' ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            😐 Bored
          </button>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <p className="text-gray-500">No posts match your filters</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <img
                      src={post.profilePic}
                      alt={post.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">{post.username}</span>
                        <span className="ml-2 text-lg">{post.moodEmoji}</span>
                      </div>
                      <div className="text-gray-500
        <div className="text-gray-500 text-xs">{post.timestamp}</div>
                    </div>
                  </div>
                  <div className="flex">
                    {post.userId !== user?.id && (
                      <button className="p-1 text-gray-500 hover:text-purple-600 mr-1">
                        <UserPlus className="w-5 h-5" />
                      </button>
                    )}
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="bg-purple-50 text-purple-800 inline-block px-2 py-1 rounded text-xs font-medium mb-2">
                    Completed: {post.task}
                  </div>
                  <p className="text-gray-800">{post.content}</p>
                </div>
                
                {post.image && (
                  <div className="mb-3 -mx-4">
                    <img 
                      src={post.image} 
                      alt="Post" 
                      className={`w-full h-auto ${post.filter || ''}`}
                    />
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-3 border-t pt-3">
                  <button 
                    onClick={() => handleLikePost(post.id)}
                    className={`flex items-center ${post.isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                  >
                    <Heart className="w-5 h-5 mr-1" fill={post.isLiked ? "currentColor" : "none"} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-gray-700">
                    <MessageCircle className="w-5 h-5 mr-1" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-gray-700">
                    <Share2 className="w-5 h-5 mr-1" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Social;
