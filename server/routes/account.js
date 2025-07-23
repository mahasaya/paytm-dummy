const express = require("express")
const router =  express.Router()
const zod = require("zod")
const {User} = require("../models/User")
const {Account} =  require("../models/User")
const {auth} = require("../middleware/auth")
const { default: mongoose } = require("mongoose")

router.get("/balance",auth,async(req,res)=>{
    console.log(req)
   const account = await Account.findOne({
    userId: req.userId
   })
console.log(account)
   res.json({
    balance:account.balance
   })
})

router.post("/transfer",auth , async(req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    try {
            const  {amount,to} =req.body
    const account = await Account.findOne({userId:req.userId}).session(session)
console.log(account)
    if(!account || account.balance < account){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficant balance"
        })
    }

    const toAccount = await Account.findOne({userId:to}).session(session)

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid account"
        });
    }

    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session)

    await session.commitTransaction();
    
    res.json({
        message:"Transfer succesful"
    })
    } catch (error) {
        await session.abortTransaction();
        console.error("Transaction aborted")
    } finally{
        session.endSession()
    }

})




module.exports = router