import { useEffect } from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import { MessagesProps } from "../interfaces/message";
import { io } from "socket.io-client";

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

  useEffect(() => {
    // Connect to the SocketIO server
    const socket = io("http://127.0.0.1:3000"); // Replace with your server's URL

    // Listen for the 'response' event from the server
    socket.on("next_token", (data) => {
      console.log("Received response:", data.token);
      // Handle the received result as needed
    });

    // Clean up the socket connection when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white">
      <Sidebar />
      <Chat messages={messages.messages} />
    </div>
  );
};

export default Home;
