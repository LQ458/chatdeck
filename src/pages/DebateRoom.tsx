import { MessageSquare, ChevronDown } from "lucide-react";
import { Fragment } from "react";
import { Transition, Listbox } from "@headlessui/react";

export function DebateRoom() {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <Transition
        appear={true}
        show={true}
        as={Fragment}
        enter="transform transition duration-300"
        enterFrom="opacity-0 translate-y-4"
        enterTo="opacity-100 translate-y-0"
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-primary-900/50 overflow-hidden">
          <div className="p-8">
            <Transition
              appear={true}
              show={true}
              enter="transition-all duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
            >
              <div className="flex items-center justify-center mb-6">
                <MessageSquare className="h-12 w-12 text-primary-400" />
              </div>
            </Transition>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Create Debate Room
            </h2>

            <div className="space-y-6">
              <Transition
                show={true}
                enter="transition-all duration-300 delay-150"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Topic
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-primary-900/50 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter debate topic..."
                  />
                </div>
              </Transition>

              <Transition
                show={true}
                enter="transition-all duration-300 delay-300"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-primary-900/50 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    rows={4}
                    placeholder="Describe your debate topic..."
                  />
                </div>
              </Transition>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Transition
                  show={true}
                  enter="transition-all duration-300 delay-450"
                  enterFrom="opacity-0 translate-y-2"
                  enterTo="opacity-100 translate-y-0"
                >
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Team Size
                    </label>
                    <Listbox>
                      <Listbox.Button className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-primary-900/50 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 flex justify-between items-center">
                        <span>2 vs 2</span>
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      </Listbox.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Listbox.Options className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-primary-900/50 rounded-lg shadow-lg max-h-60 overflow-auto">
                          <Listbox.Option
                            value="2v2"
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          >
                            2 vs 2
                          </Listbox.Option>
                          <Listbox.Option
                            value="3v3"
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          >
                            3 vs 3
                          </Listbox.Option>
                          <Listbox.Option
                            value="4v4"
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          >
                            4 vs 4
                          </Listbox.Option>
                        </Listbox.Options>
                      </Transition>
                    </Listbox>
                  </div>
                </Transition>

                <Transition
                  show={true}
                  enter="transition-all duration-300 delay-600"
                  enterFrom="opacity-0 translate-y-2"
                  enterTo="opacity-100 translate-y-0"
                >
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Duration
                    </label>
                    <Listbox>
                      <Listbox.Button className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-primary-900/50 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 flex justify-between items-center">
                        <span>30 minutes</span>
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      </Listbox.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Listbox.Options className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-primary-900/50 rounded-lg shadow-lg max-h-60 overflow-auto">
                          <Listbox.Option
                            value="15"
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          >
                            15 minutes
                          </Listbox.Option>
                          <Listbox.Option
                            value="30"
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          >
                            30 minutes
                          </Listbox.Option>
                          <Listbox.Option
                            value="45"
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          >
                            45 minutes
                          </Listbox.Option>
                          <Listbox.Option
                            value="60"
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          >
                            60 minutes
                          </Listbox.Option>
                        </Listbox.Options>
                      </Transition>
                    </Listbox>
                  </div>
                </Transition>
              </div>

              <Transition
                show={true}
                enter="transition-all duration-300 delay-750"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
              >
                <div className="pt-4">
                  <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200">
                    Create Debate Room
                  </button>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}
