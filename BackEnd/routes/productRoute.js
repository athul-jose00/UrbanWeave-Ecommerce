import express from 'express';
import {viewProduct,addProduct,removeProduct,singleProduct} from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter=express.Router();




productRouter.post('/single',singleProduct);
productRouter.get('/view',viewProduct);


//admin special funcions
productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct);
productRouter.post('/remove',adminAuth,removeProduct);


export default productRouter;