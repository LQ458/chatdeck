import { useEffect, useRef, useState } from "react";
import { useSocketStore } from "../store/useSocketStore";
import { MessageType } from "../server/types";
import { format } from "date-fns";
import { useAuth } from "../hooks/useAuth";

interface ChatBoxProps {
  showUsernames?: boolean;
  allowReplies?: boolean;
}

export function ChatBox({ showUsernames = true, allowReplies = true }: ChatBoxProps) {
  const { user } = useAuth();
  const { messages, sendMessage } = useSocketStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [content, setContent] = useState("");

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    sendMessage(content.trim());
    setContent("");
    setReplyTo(null);
  };

  const handleReply = (messageId: string) => {
    if (allowReplies) {
      setReplyTo(messageId);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => {
            const isOwn = message.user?.id === user?.id;
            const isSystem = message.type === MessageType.SYSTEM;
            const isAction = message.type === MessageType.ACTION;

            if (isSystem) {
              return (
                <div key={message.id} className="text-center text-sm text-gray-500 dark:text-gray-400">
                  {message.content}
                </div>
              );
            }

            if (isAction) {
              return (
                <div key={message.id} className="text-center text-sm italic text-gray-600 dark:text-gray-300">
                  {message.content}
                </div>
              );
            }

            return (
              <div
                key={message.id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    isOwn
                      ? "bg-primary-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  }`}
                >
                  {showUsernames && !isOwn && message.user && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {message.user.name}
                    </div>
                  )}
                  
                  {message.replyTo && (
                    <div className="text-sm bg-gray-100 dark:bg-gray-700 rounded p-2 mb-2">
                      <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">
                        Replying to {messages.find(m => m.id === message.replyTo)?.user?.name}
                      </div>
                      <div className="truncate">
                        {messages.find(m => m.id === message.replyTo)?.content}
                      </div>
                    </div>
                  )}

                  <div>{message.content}</div>
                  
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 text-right">
                    {format(new Date(message.timestamp), "HH:mm")}
                  </div>
                </div>

                {allowReplies && !isOwn && (
                  <button
                    onClick={() => handleReply(message.id)}
                    className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    Reply
                  </button>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
        <div className="max-w-3xl mx-auto">
          {replyTo && (
            <div className="mb-2 flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded p-2">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Replying to: {messages.find(m => m.id === replyTo)?.content}
              </div>
              <button
                onClick={() => setReplyTo(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                Cancel
              </button>
            </div>
          )}
          
          <div className="flex gap-2">
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              disabled={!content.trim()}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
