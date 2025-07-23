const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
require('dotenv').config()
const cors =  require("cors")
app.use(cors())
app.use(express.json())
app.use(cookieParser())
const baseUrl = process.env.BASE_URL
mongoose.connect(baseUrl).then(()=>console.log("MongoDB connected"))
.catch((err)=>console.error(err))


const userRouter =  require("./routes/user")
const accountRouter = require("./routes/account")

app.use("/api/v1/user",userRouter)
app.use("/api/v1/account",accountRouter)
app.listen(3000,()=>{
    console.log("up")
})