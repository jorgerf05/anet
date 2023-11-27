import React from 'react'

const Device = ({ip, mac, vendor}) => {
  return (
    <div className='bg-blue-50 p-3 shadow-lg rounded-2xl text-black h-32 w-64'>
        <div className='text-black font-extrabold'>{ip}</div>
        <div>{mac}</div>
        <div>{vendor}</div>
    </div>
  )
}

export default Device