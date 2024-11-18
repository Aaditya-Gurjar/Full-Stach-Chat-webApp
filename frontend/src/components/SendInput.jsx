import axios from "axios";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";


function SendInput() {
  const {messages} = useSelector(store=>store.message)
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/message/send/${selectedUser._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(setMessages([...messages, res.data.newMessage]));
      // console.log(res);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className="px-4  my-3">
      <div className="w-full relative">
        <input
        onChange={(e)=> setMessage(e.target.value)}
        value={message}
          type="text"
          placeholder="Send a message..."
          className="w-full border-none outline-none p-2 rounded-md "
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 mr-3 text-lg text-gray-200"
        >
          <IoSend />
        </button>
      </div>
    </form>
  );
}

export default SendInput;
