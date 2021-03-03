const Category = require('../models/Category')
const formidable = require('formidable');

exports.allCategory = async (req, res, next) => {
    try{
        let allCategory = await Category.find()
        return res.status(200).json({
            allCategory: allCategory
        })
    }
    catch(err) {
        next(err)
    }
}
exports.findSubCategoriesByCategorySlug = async(req, res, next) => {
    let categorySlug = req.params.categorySlug
    try{
        let findCategory = await Category.findOne({categorySlug: categorySlug})
        if(findCategory) {
            return res.status(200).json({
                subCategories: findCategory.subCategory,
            })
        } else {
            return res.status(200).json({
                subCategories: "noting to show"
            })
        }
    } catch(err) {
        next(err)
    }
}
exports.addCategoryOrPushSubCategoryIntoCategory = async (req, res, next) => {
    try{
        let categoryName = req.body.category
        let categorySlug = req.body.categorySlug
        let subCategoryName = req.body.subCategory
        let subCategorySlug = req.body.subCategorySlug

        let findCategory = await Category.findOne({categorySlug: categoryName})
        // return console.log(findCategory)
        if(findCategory) {

            let subCategory = {
                name: subCategoryName,
                subCategorySlug: subCategorySlug
            }
            subCategory.subCategoryImage = req.files[0] ? req.files[0].filename : ''
           
            let updatedCategory =  await Category.findOneAndUpdate(
                {categorySlug: categoryName},
                {$push: {'subCategory': subCategory}},
                {new: true}
            )
   
           return res.status(200).json({
               message: `Successfully updated`
           })
        } else {
            let subCategory = {
                name: subCategoryName ? subCategoryName : '',
                subCategorySlug: subCategorySlug ? subCategorySlug : ''
            }
            subCategory.subCategoryImage = req.files[1] ? req.files[1].filename : ''

            let newCategory = new Category({
                category: categoryName,
                categorySlug: categorySlug,
                subCategory: subCategoryName || subCategorySlug ? subCategory : []
            })
            newCategory.categoryImage= req.files[0].filename

    
            let addCategory = await newCategory.save()
            return res.status(200).json({
                addCategory,
                message: `Successfully added ${addCategory.category}`
            })
        }
    }
    catch(err) {
        next(err)
    }
}
