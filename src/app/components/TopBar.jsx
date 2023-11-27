import React from 'react'

const TopBar = () => {
  return (
    <div className="flex h-content m-2 rounded-3xl p-2 space-y-5 items-center content-center">
      <div className="space-y-3 w-full h-1/3">
        {/* Logo TecNM*/}
        <div className="text-black text-2xl text-center font-semibold rounded-2xl">
          Anet
        </div>
        <div className="w-full h-1 bg-black rounded-full"></div>
      </div>
      <div className="flex flex-row h-1/3 content-end">
    
      </div>
    </div>
  )
}

export default TopBar