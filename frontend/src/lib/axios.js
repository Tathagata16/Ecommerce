import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true,
})


export const productApi = {
    //product apis
    getProducts: async (page = 1, limit = 9, filters = {})=>{
        const params = new URLSearchParams({
            page : page.toString(),
            limit: limit.toString(),
            ...filters
        });

        const response  = await axiosInstance.get(`/products?${params}`);
        return response.data;
    }, 

    getProduct: async (id) =>{
        const response = await axiosInstance.get(`/products/${id}`);
        return response.data;
    },

    createProduct: async (productData) =>{
        const response = await axiosInstance.post('/products', productData);

        return response.data;
    }, 

    updateProduct: async (id, productData) =>{
        const response = await axiosInstance.put(`/products/${id}`, productData);

        return response.data;
    }, 

    deleteProduct: async (id) => {
        const response = await axiosInstance.delete(`/products/${id}`);

        return response.data;
    },
};

module.exports =  {productApi,axiosInstance};



