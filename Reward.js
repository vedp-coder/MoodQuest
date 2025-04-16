import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Award, Sparkles, Image, Palette, Gift, Check } from 'lucide-react';

const Rewards = () => {
  const { points, addPoints, unlockReward } = useUser();
  const [activeCategory, setActiveCategory] = useState('backgrounds');
  const [previewItem, setPreviewItem] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const categories = [
    { id: 'backgrounds', label: 'Backgrounds', icon: <Palette /> },
    { id: 'filters', label: 'Photo Filters', icon: <Image /> },
    { id: 'stickers', label: 'Stickers', icon: <Sparkles /> },
    { id: 'badges', label: 'Badges', icon: <Award /> }
  ];

  const rewardItems = {
    backgrounds: [
      { id: 'bg1', name: 'Ocean Waves', cost: 100, unlocked: false, preview: 'bg-gradient-to-r from-blue-400 to-cyan-300' },
      { id: 'bg2', name: 'Sunset Glow', cost: 150, unlocked: false, preview: 'bg-gradient-to-r from-orange-400 to-pink-500' },
      { id: 'bg3', name: 'Forest Mist', cost: 200, unlocked: false, preview: 'bg-gradient-to-r from-green-400 to-emerald-500' },
      { id: 'bg4', name: 'Northern Lights', cost: 300, unlocked: false, preview: 'bg-gradient-to-r from-indigo-500 to-purple-600' }
    ],
    filters: [
      { id: 'filter1', name: 'Vintage', cost: 75, unlocked: true, preview: 'bg-amber-50' },
      { id: 'filter2', name: 'Noir', cost: 75, unlocked: false, preview: 'bg-gray-900' },
      { id: 'filter3', name: 'Dreamy', cost: 100, unlocked: false, preview: 'bg-purple-100' },
      { id: 'filter4', name: 'Golden Hour', cost: 150, unlocked: false, preview: 'bg-yellow-100' }
    ],
    stickers: [
      { id: 'sticker1', name: 'Happy Cloud', cost: 50, unlocked: false, emoji: '☁️' },
      { id: 'sticker2', name: 'Rainbow', cost: 50, unlocked: false, emoji: '🌈' },
      { id: 'sticker3', name: 'Star Eyes', cost: 75, unlocked: false, emoji: '🤩' },
      { id: 'sticker4', name: 'Heart', cost: 75, unlocked: true, emoji: '❤️' }
    ],
    badges: [
      { id: 'badge1', name: 'Mood Explorer', cost: 200, unlocked: false, emoji: '🧭' },
      { id: 'badge2', name: 'Quest Master', cost: 300, unlocked: false, emoji: '🏆' },
      { id: 'badge3', name: 'Friend Magnet', cost: 250, unlocked: false, emoji: '🧲' },
      { id: 'badge4', name: 'Vibe Creator', cost: 400, unlocked: false, emoji: '✨' }
    ]
  };

  const handlePurchase = (item) => {
    setPreviewItem(item);
    setShowConfirmation(true);
  };

  const confirmPurchase = () => {
    if (previewItem && points >= previewItem.cost) {
      // In a real app, we'd make an API call here
      addPoints(-previewItem.cost); // Subtract points
      unlockReward(previewItem.id, activeCategory);
      
      // Update the local state to show the item as unlocked
      const updatedItems = {...rewardItems};
      updatedItems[activeCategory] = updatedItems[activeCategory].map(item => 
        item.id === previewItem.id ? {...item, unlocked: true} : item
      );
      
      setShowConfirmation(false);
      // Show success message or animation
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Rewards Shop</h2>
          <div className="flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
            <Sparkles className="w-4 h-4 mr-1" />
            <span className="font-medium">{points} points</span>
          </div>
        </div>
        
        <div className="flex overflow-x-auto pb-2 -mx-1 mb-6">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-4 py-2 mx-1 rounded-full whitespace-nowrap ${
                activeCategory === category.id ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {rewardItems[activeCategory].map(item => (
            <div key={item.id} className="border rounded-lg overflow-hidden">
              <div 
                className={`h-32 flex items-center justify-center ${
                  item.preview || 'bg-gray-100'
                }`}
              >
                {item.emoji && (
                  <span className="text-5xl">{item.emoji}</span>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-medium">{item.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center text-purple-700">
                    <Sparkles className="w-4 h-4 mr-1" />
                    <span>{item.cost}</span>
                  </div>
                  {item.unlocked ? (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium flex items-center">
                      <Check className="w-3 h-3 mr-1" />
                      Owned
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePurchase(item)}
                      disabled={points < item.cost}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        points >= item.cost
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Buy
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Purchase Confirmation Modal */}
      {showConfirmation && previewItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-sm w-full p-6">
            <div className="text-center mb-4">
              <Gift className="mx-auto w-12 h-12 text-purple-600" />
              <h3 className="text-xl font-bold mt-2">Confirm Purchase</h3>
            </div>
            
            <div className="text-center mb-6">
              <p className="mb-2">Are you sure you want to buy:</p>
              <div className="font-medium text-lg">{previewItem.name}</div>
              <div className="flex items-center justify-center mt-1 text-purple-700">
                <Sparkles className="w-4 h-4 mr-1" />
                <span>{previewItem.cost} points</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmPurchase}
                disabled={points < previewItem.cost}
                className={`flex-1 py-2 rounded-lg font-medium ${
                  points >= previewItem.cost
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rewards;
