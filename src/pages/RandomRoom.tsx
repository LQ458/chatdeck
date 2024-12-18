import { Shuffle } from "lucide-react";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";

export function RandomRoom() {
  return (
    <Transition
      appear
      show={true}
      as={Fragment}
      enter="transform transition duration-300"
      enterFrom="translate-y-4 opacity-0"
      enterTo="translate-y-0 opacity-100"
    >
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-primary-900/50 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-center mb-6">
              <Shuffle className="h-12 w-12 text-primary-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Random Chat
            </h2>

            <div className="space-y-6">
              <div className="text-center text-gray-600 dark:text-gray-300">
                Connect with random users for interesting conversations
              </div>

              <div className="pt-4">
                <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors">
                  Start Random Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}
