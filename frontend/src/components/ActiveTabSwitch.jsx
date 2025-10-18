import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="tabs tabs-boxed bg-white/5 backdrop-blur-md p-1.5 m-4 rounded-xl border border-white/10">
      <button
        onClick={() => setActiveTab("chats")}
        className={`tab rounded-lg transition-all duration-300 ${
          activeTab === "chats"
            ? "bg-white/90 text-black font-semibold shadow-lg"
            : "text-white/60 hover:text-white hover:bg-white/5"
        }`}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`tab rounded-lg transition-all duration-300 ${
          activeTab === "contacts"
            ? "bg-white/90 text-black font-semibold shadow-lg"
            : "text-white/60 hover:text-white hover:bg-white/5"
        }`}
      >
        Contacts
      </button>
    </div>
  );
}
export default ActiveTabSwitch;
