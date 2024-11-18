import React from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useSelector } from 'react-redux'

function MessageContainer() {
    const {selectedUser, onlineUsers} = useSelector(store=> store.user);
    const {authUser} = useSelector(store=>store.user);

    const isOnline = onlineUsers.includes(selectedUser._id);
  return (
    <>
    {selectedUser !== null ? 
    (<div className='md: w-[550px] flex flex-col   '>
        <div className='flex  gap-3 items-center p-2 cursor-pointer border-b bg-zinc-900 px-4 py-2 mb-2'>
            <div className={`avatar ${isOnline ? 'online' : ' '}`}>
                <div className='w-12 rounded-full'>
                    <img  src={selectedUser?.profilePhoto} alt="User-Profile-photo" />
                </div>
            </div>

            <div className=''>
                <div className='w-full'>
                    <p className='text-lg '>{selectedUser?.fullName}</p>
                </div>
            </div>
        </div>
        <Messages/>
        <SendInput/>
    </div>) :
     (<div className='md: w-[550px] flex flex-col justify-center items-center'>
         <h1 className='text-xl text-white font-bold bg-gray-900  p-4 rounded-lg m-2'>hi {authUser?.fullname}!</h1>
         <h1 className='text-xl text-white bg-gray-900  p-4 rounded-lg '>Let's Start conversation !</h1>
     </div>)  
}
    </>
  )
}

export default MessageContainer