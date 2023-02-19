const express = require('express');
const{BookModel}=require("../models/book.model")
const jwt=require("jsonwebtoken")

const LibRoute=express.Router()

LibRoute.get("/books",async (req,res)=>{
    const books=await BookModel.find()
    res.send(books)
})


LibRoute.post("/add",(req,res)=>{
  try {
    const book=req.body;
    const add=new BookModel(book)
    add.save()
    res.send({"msg":"Successfully added"})
  } catch (error) {
    res.send({"msg":error.message})
  }
})

LibRoute.patch("/update/:id",async (req,res)=>{
    const Id=req.params.id;
    const payload=req.body
    try {
        await BookModel.findByIdAndUpdate({_id:Id},payload)
        res.send({"msg":"Successfully Updated"})
    } catch (error) {
        res.send({"msg":error.message})
    }
})

LibRoute.delete("/delete/:id",async (req,res)=>{
    const Id=req.params.id;
    try {
        await BookModel.findByIdAndDelete({_id:Id})
        res.send({"msg":"Successfully Deleted"})
    } catch (error) {
        res.send({"msg":error.message})
    }
})

module.exports={LibRoute}