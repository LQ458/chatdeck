import { Disclosure, Transition } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ColorThemeToggle } from "./ColorThemeToggle";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "../hooks/useAuth";
import { Fragment } from "react";

export function Header({
  setIsAuthDialogOpen,
}: {
  setIsAuthDialogOpen: (open: boolean) => void;
}) {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-primary-900/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center justify-between flex-1">
            <Link
              to="/"
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              ChatDeck
            </Link>

            <nav className="hidden md:flex items-center space-x-4">
              <Link
                to="/about"
                className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                About
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/private-room"
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  >
                    Private Room
                  </Link>
                  <Link
                    to="/debate-room"
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  >
                    Debate Room
                  </Link>
                  <Link
                    to="/random-room"
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  >
                    Random Chat
                  </Link>
                  <button
                    onClick={() => signOut?.()}
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsAuthDialogOpen(true)}
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  Sign In
                </button>
              )}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              <ColorThemeToggle />
              <ThemeToggle />
            </div>
          </div>

          <Disclosure as="div" className="md:hidden">
            {({ open }) => (
              <>
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                  {open ? (
                    <X className="block h-6 w-6" />
                  ) : (
                    <Menu className="block h-6 w-6" />
                  )}
                </Disclosure.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 -translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 -translate-y-1"
                >
                  <Disclosure.Panel
                    static
                    className="absolute left-0 right-0 top-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-primary-900/50 shadow-lg"
                  >
                    <div className="px-4 py-2 space-y-1">
                      <Link
                        to="/about"
                        className="block py-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                      >
                        About
                      </Link>
                      {isAuthenticated ? (
                        <>
                          <Link
                            to="/private-room"
                            className="block py-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                          >
                            Private Room
                          </Link>
                          <Link
                            to="/debate-room"
                            className="block py-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                          >
                            Debate Room
                          </Link>
                          <Link
                            to="/random-room"
                            className="block py-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                          >
                            Random Chat
                          </Link>
                          <button
                            onClick={() => signOut?.()}
                            className="block w-full text-left py-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                          >
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setIsAuthDialogOpen(true)}
                          className="block w-full text-left py-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                        >
                          Sign In
                        </button>
                      )}
                      <div className="flex items-center gap-2 py-2">
                        <ColorThemeToggle />
                        <ThemeToggle />
                      </div>
                    </div>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </header>
  );
}
