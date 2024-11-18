import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
import Login from './Login';

function HomePage() {
const {authUser} = useSelector(store=>store.user);

  return (
    <div >
      {authUser ? (
        // Show the main UI if logged in
        <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 '>
          <Sidebar />
          <MessageContainer />
        </div>
      ) : (
        // Show the login page if not logged in
        <Login />
      )}
    </div>
  )
}

export default HomePage