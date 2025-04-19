import express from 'express';
import './config/connection.js';
import cors from 'cors';
import productModel from './model/product.js';
import 'dotenv/config'
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';

const app = express();
const port=process.env.PORT || 3000
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors());


//api endpoints
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);




// Adding data
app.post("/add", async (req, res) => {
  try {
    const newProduct = new productModel(req.body);
    await newProduct.save();
    res.send({ message: "Data added" });
  } catch (error) {
    console.log(error);
  }
});

// API for viewing
app.get("/view", async (req, res) => {
  try {
    const productData = await productModel.find();
    res.send(productData);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log("Port is running at 3000");
});
