import React from "react";
import axios from "axios";
import {useDispatch }from 'react-redux'
import { setOtherUser } from "../redux/userSlice";
import { useEffect } from "react";

function useGetOtherUsers() {
    const dispatch = useDispatch()
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true
        const res = await axios.get(`http://localhost:8080/api/v1/user/`);
        // console.log(res);
        // Store
        dispatch(setOtherUser(res.data))

      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, []);
}

export default useGetOtherUsers;
