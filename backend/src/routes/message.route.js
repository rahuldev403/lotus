import express from "express";

const router = express.Router()

router.get("/message",(req,res)=>{
    res.send("message route")
})

export default router