import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import { MessagesProps } from "../interfaces/message";

const Home = () => {
  const messages: MessagesProps = {
    messages: [
      { message: { fromMe: true, text: "hi" } },
      {
        message: {
          fromMe: false,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum id ullam hic? Impedit delectus nulla earum blanditiis expedita distinctio autem totam quam, neque tempore sapiente ad dolorem, soluta, culpa obcaecati?",
        },
      },
      { message: { fromMe: true, text: "nothing" } },
    ],
  };
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white">
      <Sidebar />
      <Chat messages={messages.messages} />
    </div>
  );
};

export default Home;
