import React from 'react'

const InputBox = ({lable, placeholder,onChange}) => {
  return (
    <div>
        <div>
            {lable}
        </div>
        <input onChange={onChange}  placeholder={placeholder} className='w-full p-4 rounded border border-gray-400 ' />
    </div>
  )
}

export default InputBox