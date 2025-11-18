const express = require('express');
const router = express.Router();

import {getProducts, getProduct, createProduct,
    updateProduct,
    deleteProduct} from '../controllers/product.controller.js'

import paginatedResults from '../middlewares/pagination.js'

import Product from '../models/product.model.js';

router.get('/', paginatedResults(Product), getProducts);

//other product routes->
router.get('/:id', getProduct);
router.post('/',createProduct);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);


export default router;








