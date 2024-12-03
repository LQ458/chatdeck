export function ChatBox() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-3xl mx-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isOwn ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.isOwn
                  ? "bg-primary-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              }`}
            >
              {!message.isOwn && (
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {message.user}
                </div>
              )}
              <div>{message.content}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 text-right">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
