const express = require("express")
const router =  express.Router()
const zod = require("zod")
const {User} = require("../models/User")
const {Account} = require("../models/User")
const JWT_SECRET = require("../config")
const jwt = require("jsonwebtoken")
const {auth} = require("../middleware/auth")
const signupSchema = zod.object({
    username:zod.string(),
    password: zod.string(),
    firstName : zod.string(),
    lastName  : zod.string()
})

const signinBody = zod.object({
    username:zod.email(),
    password:zod.string()

})

router.get("/sign-in",async(req,res)=>{
    const {success} = signinBody.safeParse(req.body)
    console.log(success)
    if(!success){
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }
console.log(req.body.username)
    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
console.log(user)
    if(user){
        const token = jwt.sign({
            userId:user._id
        },JWT_SECRET);
        res.json({
            token:token
        })
        return
    }
    res.status(411).json({
        message:"Error while logging in"
    })
})

router.post("/sign-up",async(req,res)=>{
    const body = req.body
    console.log(body)
    const {success} = signupSchema.safeParse(req.body);
    console.log(success)
    if(!success){
        return res.json({
            message:"Email already taken / Incorrect inputs"
        })
    }

    const user = User.findOne({
        username : body.username
    })

    if(user._id){
        return res.json({
            message:"Email already taken / Incorrect inputs"
        })
    }


    const dbUser = await User.create(body);
    const token = jwt.sign({
        userId:dbUser._id
    },JWT_SECRET)
    await Account.create({
        userId :dbUser._id,
        balance: Math.floor(Math.random()*100000) 
    })
    res.json({
        message:"User created successfully",
        token:token
    })
})

//update the user info
const updateBody =zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})

router.put("/",auth,async(req,res)=>{
    const {success} = updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message:"Error while updating information"
        })
    }

    await User.updateOne({
        _id:req.userId
    },req.body);

    res.json({
        message:"Updated successfully"
    })
})

router.get("/bulk",async(req,res)=>{
    const users =  await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })
    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})


module.exports = router