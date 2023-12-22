const { Category } = require("../models");
const { schemaCategories, validateJoi } = require("../helper/joiHelper");
const { handleResponse, handleServerError, handleSuccess, handleCreated, handleNotFound } = require("../helper/handleResponseHelper");
const redisClient = require("../utils/redistClient");

exports.createCategory = async (req, res) => {
    try {
        const newCategory = req.body;
      
        const { error, handleRes } = validateJoi(res, newCategory, schemaCategories);
        if (error) {
          return handleRes;
        }
  
        const isExist = await Category.findOne({ where: { categoryName: newCategory.categoryName }})

        if (isExist) {
            return handleResponse(res, 400, {
              message: "Category already existed",
            });
        }
      
        const category = await Category.create(newCategory);

        try {
            const cacheExists = await redisClient.exists(process.env.REDIS_KEY_CATEGORIES);
            if (cacheExists) {
                await redisClient.del(process.env.REDIS_KEY_CATEGORIES);
                console.log('Cache cleared successfully');
            }
        } catch (cacheError) {
            console.error('Error while clearing cache:', cacheError);
        }
  
        return handleSuccess(res, {
            data: category,
            message: `success created category : ${category.categoryName}`,
        });
    } catch (error) {
        console.log(error)
        return handleServerError(res, error)
    }
};

exports.getAllCategories = async (req, res) => {
    try{
        const cachedCategories = await redisClient.get(process.env.REDIS_KEY_CATEGORIES);

        if(cachedCategories){
            return handleSuccess(res, {
                message: "Data from cache",
                data: JSON.parse(cachedCategories)
            });
        }else{
            const categories = await Category.findAll({
                order: [['categoryName', 'ASC']]
            })
    
            if (categories.length === 0) {
                return handleNotFound(res)
            }
            await redisClient.set(process.env.REDIS_KEY_CATEGORIES, JSON.stringify(categories), 'EX', 1000);
            return handleSuccess(res, { message: "success retrieved categories from database", data: categories  });
        }
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}

exports.updateCategory = async (req, res) => {
    try{
        const { categoryId } = req.params
        const updateDataCategory = req.body

        const { error, handleRes } = validateJoi(res, updateDataCategory, schemaCategories)
        if(error){
            return handleRes;
        }

        const currentCategory = await Category.findOne({ where: { id: categoryId }})
        if(!currentCategory){
            return handleResponse(res, 404, { message: 'Category not found' })
        }

        await Category.update(updateDataCategory, { where: {id: categoryId} })

        try {
            const cacheExists = await redisClient.exists(process.env.REDIS_KEY_CATEGORIES);
            if (cacheExists) {
                await redisClient.del(process.env.REDIS_KEY_CATEGORIES);
                console.log('Cache cleared successfully');
            }
        } catch (cacheError) {
            console.error('Error while clearing cache:', cacheError);
        }
        return handleCreated(res, { message: "success update data category" });
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}

exports.deleteCategory = async(req, res) => {
    try{
        const { categoryId } = req.params

        const categoryoDelete = await Category.findOne({ where: { id: categoryId } });
        if (!categoryoDelete) {
            return res.status(404).json({ message: "Category not found" });
        }

        await categoryoDelete.destroy()

        try {
            const cacheExists = await redisClient.exists(process.env.REDIS_KEY_CATEGORIES);
            if (cacheExists) {
                await redisClient.del(process.env.REDIS_KEY_CATEGORIES);
                console.log('Cache cleared successfully');
            }
        } catch (cacheError) {
            console.error('Error while clearing cache:', cacheError);
        }
        return res.status(200).json({ message: 'Category successfully deleted.' });
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}