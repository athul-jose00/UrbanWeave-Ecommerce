import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: Array,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  sizes: {
    type: Array,
    required: true
  },
  date: {
    type: Number,
    default: Date.now
  },
  bestseller: {
    type: Boolean,
    default: false
  }
});

const Product = mongoose.models.Product|| mongoose.model('Product', productSchema);

export default Product;
