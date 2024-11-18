import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/user/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if(res.data.success){
        navigate("/");
        dispatch(setAuthUser(res.data.user))        
        toast.success(res.data.message);
      }

    } catch (error) {
      console.log(error);
      
      toast.error(error.response);
    }
  };
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-white">Login</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              className="bg-white w-full text-gray-700 input-bordered h-10 px-4 py-2 rounded-md"
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="bg-white text-gray-700 w-full input-bordered h-10 px-4 py-2 rounded-md"
              type="password"
              placeholder="Password"
            />
          </div>

          <div className="flex items-center justify-center">
            <p>Don't have an account? </p>
            <Link to="/register" className="text-blue-400 ml-1">
              {" "}
              Signup
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-block bg-gray-400 hover:text-white  text-black font-bold text-lg mt-2"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
