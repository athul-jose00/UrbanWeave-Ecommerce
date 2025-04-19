const express = require
('express')
require("./connection")

var app=express()

var productModel = require("./model/product")

var cors = require('cors')



app.use(express.json())

app.use(cors())

//adding data
app.post("/add",async(req,res)=>{
  try {
    const newProduct=new productModel(req.body)
    await newProduct.save()
    res.send({message:"data added"})
  } catch (error) {
    console.log(error);
  }
})

//api for viewing
app.get("/view",async(req,res)=>{
  try {
    const productData = await productModel.find();
    
    res.send(productData)
  } catch (error) {
    console.log(error);
  }
})


app.listen(3000,()=>{
  console.log("Port is running at 3000");
})