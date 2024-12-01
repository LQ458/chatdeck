import { Shuffle, Loader } from 'lucide-react';
import { useState } from 'react';

export function RandomRoom() {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="bg-gray-900 rounded-2xl shadow-xl border border-violet-900/50 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <Shuffle className="h-12 w-12 text-violet-400" />
          </div>
          <h2 className="text-3xl font-bold text-white text-center mb-8">Join Random Room</h2>
          
          {!isSearching ? (
            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-4">Interests (Optional)</h3>
                <div className="flex flex-wrap gap-2">
                  {['Gaming', 'Music', 'Movies', 'Books', 'Tech', 'Art', 'Science', 'Sports'].map((interest) => (
                    <button
                      key={interest}
                      className="px-4 py-2 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 transition-colors"
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setIsSearching(true)}
                className="w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition-colors"
              >
                Find Random Room
              </button>

              <p className="text-center text-gray-400 text-sm">
                You'll be matched with other users looking for random conversations
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="animate-spin inline-block mb-6">
                <Loader className="h-12 w-12 text-violet-400" />
              </div>
              <h3 className="text-xl text-white mb-2">Finding a room for you...</h3>
              <p className="text-gray-400 mb-8">This usually takes less than a minute</p>
              <button 
                onClick={() => setIsSearching(false)}
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                Cancel Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}