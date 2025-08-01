import React from 'react'
import ButtonComp from './ButtonComp'
import { Link } from 'react-router-dom'
const BottomWarning = ({label ,buttonText,to}) => {
  return (
    <div>
        <div>
            {label}
        </div>
        <Link className="pointer underline pl-1 cursor-pointer" to={to}>
            {buttonText}
        </Link>
    </div>
  )
}

export default BottomWarning