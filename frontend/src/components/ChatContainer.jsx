import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

function ChatContainer() {
  const {
    selectedUser,
    messages,
    isMessagesLoading,
    getMessagesByUserId,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();

  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Fetch messages when selected user changes
  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUser?._id,
    getMessagesByUserId,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  // Auto scroll to bottom whenever messages change
  useEffect(() => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderMessageContent = (msg) => {
    return (
      <div className="space-y-2">
        {msg.text && (
          <div className="whitespace-pre-wrap break-words">{msg.text}</div>
        )}
        {msg.image && (
          <img
            src={msg.image}
            alt="attachment"
            className="max-h-60 rounded-lg border border-slate-700/50"
            loading="lazy"
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <ChatHeader />

      {/* Messages area */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4">
        {isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : messages.length === 0 ? (
          <NoChatHistoryPlaceholder name={selectedUser?.fullName || "user"} />
        ) : (
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((msg) => {
              const isMe = msg.senderId === authUser?._id;
              return (
                <div
                  key={msg._id}
                  className={`chat ${isMe ? "chat-end" : "chat-start"}`}
                >
                  <div
                    className={`chat-bubble ${
                      isMe
                        ? "bg-cyan-600 text-white"
                        : "bg-slate-800 text-slate-200"
                    }`}
                  >
                    {renderMessageContent(msg)}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <MessageInput />
    </div>
  );
}

export default ChatContainer;
