import { MessageCircle, Shield, Users, Zap } from "lucide-react";

export function About() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          About ChatDeck
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A secure and feature-rich platform for meaningful conversations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex justify-center mb-4">
            <Shield className="h-10 w-10 text-primary-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
            Secure by Design
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            End-to-end encryption and privacy-first approach
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex justify-center mb-4">
            <Users className="h-10 w-10 text-primary-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
            Multiple Room Types
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Private chats, debate rooms, and random matching
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex justify-center mb-4">
            <Zap className="h-10 w-10 text-primary-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
            Real-time Experience
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Instant messaging with seamless synchronization
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex justify-center mb-4">
            <MessageCircle className="h-10 w-10 text-primary-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
            Smart Features
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Rich text formatting and file sharing capabilities
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Is ChatDeck free to use?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, ChatDeck is completely free for personal use. We may
              introduce premium features in the future.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              How secure are my conversations?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              All messages are encrypted end-to-end, and we don't store chat
              histories. Your privacy is our top priority.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Can I create private rooms?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, you can create private rooms and share access codes only with
              intended participants.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              How do debate rooms work?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Debate rooms allow structured discussions with teams, topics, and
              time limits. Perfect for educational or professional use.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-primary-600 rounded-2xl shadow-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Need Help?</h2>
        <p className="text-primary-100 mb-6">
          Our support team is here to assist you
        </p>
        <a
          href="mailto:support@chatdeck.com"
          className="inline-block bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
