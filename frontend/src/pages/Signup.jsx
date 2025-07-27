import React, { useState } from 'react'
import InputBox from '../Components/InputBox'
import ButtonComp from '../Components/ButtonComp'
import BottomWarning from '../Components/BottomWarning'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SubHeading from '../Components/SubHeading'
import Heading from '../Components/heading'
const Signup = () => {
  const [firstName , setFirstName] = useState("")
  const [lastName , setLastName] = useState("")
  const [username , setEmail] = useState("")
  const [password , setPassword] = useState("")
  return (
    
    <div className='bg-slate-300 h-screen flex justify-center'>

      <div className='flex flex-col gap-6 justify-center'>
        <div className=' flex flex-col gap-4 rounded-lg bg-white e-80 text-center p-2 h-max px-4'>
          <Heading label={"Sign up"}/>
          <SubHeading label={"Enter your information to create an account"}/>
          <InputBox onChange = {(e)=> setFirstName(e.target.value)} placeholder="John" label={"First Name"}/>
          <InputBox onChange = {(e)=> setLastName(e.target.value)} placeholder="Doe" label={"Last Name"}/>
          <InputBox onChange = {(e)=> setEmail(e.target.value)} placeholder="bhawyamisri@gmail.com" label={"Email"}/>
          <InputBox onChange = {(e)=> setPassword(e.target.value)} placeholder="1234" label={"Password"}/>
          <div className='pt-4'>
            <ButtonComp onClick={async()=>{
             const response =  await axios.post("http://localhost:3000/api/v1/user/sign-up",{
                username,
                firstName,
                lastName,
                password
              })

              localStorage.setItem("token" , response.data.token)
            }} label={"Sign up"}/>
          </div>
          <BottomWarning label={"Already have an account"} buttonText={"Sign in"} to ={"/sign-in"}/>
        </div>
      </div>

    </div>
  )
}

export default Signup