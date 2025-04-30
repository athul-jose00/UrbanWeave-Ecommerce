import { log } from "console";
import { v2 as cloudinary } from "cloudinary";
import Product from "../model/product.js";

//funtion to add Products
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      image: imagesUrl,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      date: Date.now(),
    };

    console.log(productData);

    const product = new Product(productData);
    await product.save();

    res.json({ success: true, message: "Product Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

//funtion to view Products
const viewProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

//funtion to remove Products
const removeProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

//funtion to single product info Products
const singleProduct = async (req, res) => {
  try {
    const { pId } = req.body;
    const product = await Product.findById(pId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};


// Function to update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const {
      
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const newImages = [image1, image2, image3, image4].filter(Boolean);

    let imagesUrl = [];
    if (newImages.length > 0) {
      imagesUrl = await Promise.all(
        newImages.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
    }

    const updatedData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" || bestseller === true,
    };

    if (imagesUrl.length > 0) {
      updatedData.image = imagesUrl;
    }

    const updated = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.json({ success: true, message: "Product Updated", updated });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Update Failed", error });
  }
};


export { viewProduct, addProduct, removeProduct, singleProduct,updateProduct };
