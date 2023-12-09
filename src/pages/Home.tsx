import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { selectCurrentConversation } from "../store/slices/conversationSlice";

const Home = () => {
  const messages = useSelector(selectCurrentConversation);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
      <Sidebar />
      <Chat messages={messages} />
    </div>
  );
};

export default Home;
