import React from 'react'

const ButtonComp = ({label,onClick}) => {
  return (
    <div>
        <button onClick={onClick} type='button' className='w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-gray-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 font-medium '>
            {label}
        </button>
    </div>
  )
}

export default ButtonComp