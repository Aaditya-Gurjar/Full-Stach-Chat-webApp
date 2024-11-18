import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

function Sidebar() {
  const [search, setSearch] = useState("");
  const { otherUser } = useSelector((store) => store.user);
  const [filteredUser, setFilteredUser] = useState(otherUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
      console.log(res);
      toast.success(res.data.message);
      dispatch(setAuthUser(null))
      navigate("/login");
      
    } catch (error) {
      console.log(error);
      
    }
  };
// Search functionality not working properly we need to fix it

  const onSearchHandler = (e) => {
    e.preventDefault();

    if (!Array.isArray(filteredUser) || filteredUser.length === 0) {
      toast.error("No users to search");
      return;
    }

     // Find the user by name
  const conversationUser = filteredUser.find((user) =>
    user.fullName.toLowerCase().includes(search.toLowerCase())
  );

  if (!conversationUser) {
    toast.error("No user found");
    return;
  }

  // Filtered list (optional, depending on the use case)
  setFilteredUser([conversationUser]);
  console.log(conversationUser);

    // const conversationUser = filteredUser.find((user) => {
    //   user.fullName.toLowerCase().includes(search.toLowerCase());
    // });
    // alert(conversationUser);

  };
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <form onSubmit={onSearchHandler} className=" flex items-center" action="">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-md"
          placeholder="Search..."
          type="text"
        />
        <button type="submit" className="bg-gray-300 p-4 rounded-r-lg">
          <FaSearch className="text-black" />
        </button>
      </form>
      <div className="divider divider-neutral">Messages</div>
      <OtherUsers />
      <div className="mt-2">
        <button
          onClick={logoutHandler}
          className="btn btn-sm bg-black-500 border border-gray-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
