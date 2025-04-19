import express from 'express';
import {viewProduct,addProduct,removeProduct,singleProduct} from '../controllers/productController.js'
import upload from '../middleware/multer.js';

const productRouter=express.Router();

productRouter.post('/add',upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct);
productRouter.get('/view',viewProduct);
productRouter.post('/remove',removeProduct);
productRouter.post('/single',singleProduct);

export default productRouter;