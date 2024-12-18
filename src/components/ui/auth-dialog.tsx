/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useTourStore } from "../../store/useTourStore";
import { ValidationErrors } from "../../types/auth";
import { message } from "antd";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthDialog({ isOpen, onClose }: AuthDialogProps) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const { setShowTour } = useTourStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      if (isSignIn && signIn) {
        await signIn(identifier, password);
      } else if (signUp) {
        if (!name.trim()) {
          const validationError = { name: "Please enter your username" };
          setErrors(validationError);
          message.warning("Please enter your username");
          return;
        }
        await signUp(identifier, password, name);
        setShowTour(true);
      }
      onClose();
      message.success(isSignIn ? "Welcome back!" : "Registration successful");
    } catch (err: unknown) {
      console.error("Auth error:", err);

      if ((err as any).response?.data?.type === "validation") {
        const validationErrors = (err as any).response.data.errors || {};
        setErrors(validationErrors);

        Object.entries(validationErrors).forEach(([msg]) => {
          message.warning(msg as string);
        });
      } else if ((err as any).response?.status === 401) {
        const errorMessage = "Username or password error";
        setErrors({ general: errorMessage });
        message.error(errorMessage);
      } else if ((err as any).message === "Network Error") {
        const errorMessage =
          "Network connection failed, please check the network settings";
        setErrors({ general: errorMessage });
        message.error(errorMessage);
      } else {
        const errorMessage =
          (err as any).response?.data?.message ||
          "Operation failed, please try again later";
        setErrors({ general: errorMessage });
        message.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClassName =
    "mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-violet-400 dark:focus:ring-violet-400 transition-colors duration-200";
  const buttonClassName =
    "w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold leading-6 text-gray-900 dark:text-white"
                  >
                    {isSignIn ? "Welcome Back" : "Create Account"}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isSignIn && (
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`${inputClassName} ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                        required
                        minLength={2}
                        maxLength={50}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="identifier"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {isSignIn ? "Email or Username" : "Email"}
                    </label>
                    <input
                      type={isSignIn ? "text" : "email"}
                      id="identifier"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className={`${inputClassName} ${errors.identifier ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                      required
                      placeholder={
                        isSignIn ? "Email or username" : "Your email"
                      }
                    />
                    {errors.identifier && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.identifier}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`${inputClassName} ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                      required
                      minLength={6}
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={buttonClassName}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    ) : null}
                    {isSignIn ? "Sign In" : "Create Account"}
                  </button>
                </form>

                <div className="mt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={signInWithGoogle}
                    disabled={loading}
                    className="mt-3 w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <FcGoogle className="h-5 w-5" />
                    Continue with Google
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => {
                      setIsSignIn(!isSignIn);
                      setErrors({});
                      setIdentifier("");
                      setPassword("");
                      setName("");
                    }}
                    className="text-sm text-violet-600 hover:text-violet-500 dark:text-violet-400 transition-colors"
                  >
                    {isSignIn
                      ? "Don't have an account? Sign Up"
                      : "Already have an account? Sign In"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
