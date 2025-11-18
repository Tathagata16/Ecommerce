import Product from "../models/product.model.js";

export const getProducts = async (req , res)=>{
    try{
        if(res.paginatedResults){
            return res.status(200).json(res.paginatedResults);

        }

        // const products = await Product.find();
        // return res.status(200).json({
        //     data: products,
        //     pagination: null,
        // });

        
    }catch(error){
        console.log("error in get products controller",error);
    }
}

//get single product
export const getProduct = async (req,res) =>{
    try{const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(400).json({
            message:"product not found",
        });
    }

    res.status(200).json({
        product
    });
    }catch(error){
        console.log("error in getProduct controller ", error);
        res.status(500).json({message:"error finding product"});
    }


}

//create product (admin only)
export const createProduct = async (req,res)=>{
    try{
        const {name, description, price, category, stock} = req.body;
        if(!name || !description || price === undefined || !category || stock === undefined){
            return res.status(400).json({message:"all fields are required"});
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock
        })

        if(product){
            res.status(200).json({
                message:"product created successfully",
            })
        }
    }catch(error){
        console.log("error in create product controller", error);
        res.status(500).json({
            message:"error creating product",
        })
    }
}

export const updateProduct = async (req,res) =>{
    try{
        const {name, description,price,category,stock} = req.body;
        const id = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(
            id, {
                name:name, 
                description:description,
                price:price,
                category:category,
                stock:stock,
            }
        )

        if (!updateProduct) {
            return res.status(404).json({
                
                message: 'Product not found'
            });
        }

        res.status(200).json({updateProduct});
    }catch(error){
        console.log("error in update product controller", error);
        res.status(500).json({message:"error updating product"});
    }
}

export const deleteProduct = async (req,res) =>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);

        if(!product){
            return res.status(404).json({
                message:"product not found",
            })
        }

        res.status(200).json({
            message:'product deleted successfully',
        })
    }catch(error){
        res.status(500).json({
            message:"error in delete product controller",
        })
    }
}


