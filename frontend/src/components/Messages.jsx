import React from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import useGetMessages from "../hooks/useGetMessages";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";

function Messages() {
  useGetMessages();
  useGetRealTimeMessage();
  const { messages } = useSelector((store) => store.message);
  if (!messages) return (
    <div className="px-4 flex flex-1 items-center justify-center">
      <div className="text-xl text-white font-bold">
      Start Conversation
      </div> 
    </div>
  );
  else{

  return (
    <div className="px-4 flex-1 overflow-y-auto">
      {messages &&
        messages.map((message) => {
          return <Message key={message._id} message={message} />;
        })}
    </div>
  );
}
}

export default Messages;
