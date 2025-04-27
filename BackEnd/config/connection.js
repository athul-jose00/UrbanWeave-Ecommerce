import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  // 👈 Load .env file

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });






  /*
  import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://athul23ubc131:user@cluster0.wopby4z.mongodb.net/UrbanWeave?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

  */
