import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice';

function OtherUser(props) {
  const user = props.user
  const {selectedUser, onlineUsers} = useSelector(store => store.user);
  const isOnline = onlineUsers.includes(user._id);
    const dispatch = useDispatch();

    const selectedUserHandler = async(user) => {
        dispatch(dispatch(setSelectedUser(user)))
        console.log(user);
        
    }
  return (
    <div>
         <div onClick={() => selectedUserHandler(user)} className={`  ${selectedUser?._id === user?._id ? `bg-gray-800` : ''}  flex gap-3 items-center p-2 cursor-pointer hover:bg-gray-800 rounded-md border-b`}>
            <div className={`avatar ${isOnline ? 'online' : ' '}`}>
                <div className='w-12 rounded-full'>
                    <img  src={user.profilePhoto} alt="User-Profile-photo" />
                </div>
            </div>

            <div className=''>
                <div className='w-full'>
                    <p className='text-lg '>{user.fullName}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OtherUser