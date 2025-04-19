import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://athul23ubc131:user@cluster0.wopby4z.mongodb.net/UrbanWeave?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
