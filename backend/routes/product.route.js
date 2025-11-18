import express from 'express'
import { verifyAdmin } from '../middlewares/isAdmin.js'
const router = express.Router();

import {getProducts, getProduct,
    updateProduct,
    } from '../controllers/product.controller.js'
import { createProduct,deleteProduct } from '../controllers/product.controller.js';

import paginatedResults from '../middlewares/pagination.js'

import Product from '../models/product.model.js';

router.get('/', paginatedResults(Product), getProducts);

//other product routes->
router.get('/:id', getProduct);
router.post('/',verifyAdmin,createProduct);
router.put('/:id',verifyAdmin,updateProduct);
router.delete('/:id',verifyAdmin,deleteProduct);


export default router;








