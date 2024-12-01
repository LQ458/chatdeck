import { MessageSquare } from "lucide-react";

export function DebateRoom() {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="bg-gray-900 rounded-2xl shadow-xl border border-violet-900/50 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <MessageSquare className="h-12 w-12 text-violet-400" />
          </div>
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Create Debate Room
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Topic
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-800 border border-violet-900/50 rounded-lg text-white focus:outline-none focus:border-violet-500"
                placeholder="Enter debate topic..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 bg-gray-800 border border-violet-900/50 rounded-lg text-white focus:outline-none focus:border-violet-500 h-24"
                placeholder="Describe the debate topic..."
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Team Size
                </label>
                <select className="w-full px-4 py-2 bg-gray-800 border border-violet-900/50 rounded-lg text-white focus:outline-none focus:border-violet-500">
                  <option>2 vs 2</option>
                  <option>3 vs 3</option>
                  <option>4 vs 4</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Duration
                </label>
                <select className="w-full px-4 py-2 bg-gray-800 border border-violet-900/50 rounded-lg text-white focus:outline-none focus:border-violet-500">
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                  <option>45 minutes</option>
                  <option>60 minutes</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button className="w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition-colors">
                Create Debate Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
