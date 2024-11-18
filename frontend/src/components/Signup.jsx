import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast'

function Signup() {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // console.log(res);
      if(res.data.success){
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error", error);
    }
    setuser({
      fullName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  const handleCheckbox = (gender) => {
    setuser({ ...user, gender });
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-white">SignUp</h1>

        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">FullName</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setuser({ ...user, fullName: e.target.value })}
              className="bg-white text-gray-700 w-full input-bordered h-10 px-4 py-2 rounded-md"
              type="text"
              placeholder="FullName"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input
              value={user.userName}
              onChange={(e) => setuser({ ...user, userName: e.target.value })}
              className="bg-white text-gray-700 w-full input-bordered h-10 px-4 py-2 rounded-md"
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
              onChange={(e) => setuser({ ...user, password: e.target.value })}
              className="bg-white  text-gray-700 w-full input-bordered h-10 px-4 py-2 rounded-md"
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">
                Confirm Password
              </span>
            </label>
            <input
              onChange={(e) =>
                setuser({ ...user, confirmPassword: e.target.value })
              }
              value={user.confirmPassword}
              className="bg-white w-full text-gray-700 input-bordered h-10 px-4 py-2 rounded-md "
              type="password"
              placeholder="Confirm Password"
            />
          </div>

          <div className=" flex items-center my-1 ">
            <div className=" flex items-center my-2">
              <p>Male : </p>
              <input
                type="radio"
                name="radio-1"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                className="radio mx-2"
                defaultChecked
              />
            </div>
            <div className="flex items-center my-2">
              <p>Female : </p>
              <input
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                type="radio"
                name="radio-1"
                className="radio mx-2"
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <p>Already have an account? </p>
            <Link to="/login" className="text-blue-400 ml-1">
              {" "}
              Login
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-block bg-gray-400 hover:text-white text-black font-bold text-lg mt-2"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
