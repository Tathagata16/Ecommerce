const paginateResults = (model) =>{
    return async (req , res , next) =>{
        try{
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const sortBy = req.query.sortBy || 'createdAt';
            const sortOrder = req.query.sortOrder=== 'asc' ? 1 : -1;

            const skip = (page -1) * limit;

            const sort = {};
            sort[sortBy] = sortOrder;

            const total = await model.countDocuments();

            const results = await model.find().sort(sort).skip(skip).limit(limit);

            const totalPages =Math.ceil(total/limit);

            const hasNextPage = page < totalPages;
            const hasPrevPage = page > 1;

            res.paginatedResults = {
                pagination: {
                    currentPage: page,
                    totalPages: totalPages,
                    totalItems: total,
                    itemsPerPage: limit,
                    hasNextPage: hasNextPage,
                    hasPrevPage: hasPrevPage,
                    nextPage: hasNextPage ? page + 1 : null,
                    prevPage: hasPrevPage ? page - 1 : null,
                }, 
                data:results,
            };

            next();
        }catch(error){
            console.log("error in pagination middleware", error);
            return res.status(500).json({message:"Error paginating results"});
        }
    }
}

export default paginateResults;