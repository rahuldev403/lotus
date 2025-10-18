import { useChatStore } from "../store/useChatStore";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimatedContainer>
        {/* LEFT SIDE - Glass sidebar with collapse functionality */}
        <div
          className={`bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col transition-all duration-300 ${
            isSidebarCollapsed ? "w-0 overflow-hidden" : "w-80"
          }`}
        >
          <ProfileHeader />
          <ActiveTabSwitch />

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* Collapse/Expand Button */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-r-xl p-2 hover:bg-white/20 transition-all duration-300 shadow-lg"
          style={{
            left: isSidebarCollapsed ? "0" : "20rem",
          }}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-5 h-5 text-white" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-white" />
          )}
        </button>

        {/* RIGHT SIDE - Glass chat area */}
        <div className="flex-1 flex flex-col bg-black/20 backdrop-blur-xl">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}
export default ChatPage;
