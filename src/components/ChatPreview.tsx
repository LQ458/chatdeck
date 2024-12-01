import { Users } from "lucide-react";

export function ChatPreview() {
  return (
    <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl shadow-xl border border-violet-900/50 overflow-hidden">
      <div className="bg-gray-800 p-4 text-white flex items-center gap-3">
        <Users className="h-5 w-5 text-violet-400" />
        <span className="text-violet-200">Anonymous Chat Room</span>
      </div>
      <div className="p-6 h-[400px] bg-gray-900/50">
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-violet-900/50 flex items-center justify-center">
              <span className="text-sm font-medium text-violet-300">A</span>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg shadow-sm max-w-md">
              <p className="text-gray-200">
                Anyone here into cyberpunk novels?
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start justify-end">
            <div className="bg-violet-600 p-3 rounded-lg shadow-sm max-w-md">
              <p className="text-white">Neuromancer is my all-time favorite!</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
              <span className="text-sm font-medium text-white">B</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
