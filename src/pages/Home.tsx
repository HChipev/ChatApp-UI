import MessageBar from "../components/MessageBar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex w-full h-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
      <MessageBar />
      <Outlet />
    </div>
  );
};

export default Home;
