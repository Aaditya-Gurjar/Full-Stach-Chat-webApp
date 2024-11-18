import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux';

function OtherUsers() {
  // custom hook for getOtherUsers
  useGetOtherUsers();

  const {otherUser} = useSelector(store => store.user);
  if(!otherUser) return;

  return (
    <div className='overflow-auto flex-1'>
       {
        otherUser.map((user)=>{
          return(
            <OtherUser key={user._id} user={user}/>
          )
        })
       }
       
      

    </div>
  )
}

export default OtherUsers