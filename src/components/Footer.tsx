import { Position } from "../types";

export const Footer = ({ position = "relative" }: { position?: Position }) => {
  return (
    <footer
      className={`bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-primary-900/50 transition-colors w-full ${position} bottom-0`}
    >
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-500 dark:text-gray-400">
        <p>© 2024 ChatDeck. Privacy First.</p>
      </div>
    </footer>
  );
};
