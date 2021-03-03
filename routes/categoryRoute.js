const router = require('express').Router()
const upload = require('../middlewares/multer')
let {allCategory, addCategoryOrPushSubCategoryIntoCategory, findSubCategoriesByCategorySlug} = require('../controllers/categoryController')

router.get("/get-all-category", allCategory)    //http://localhost:8080/api/category/get-all-category
router.get("/find-sub-categories-by-category-slug/:categorySlug", findSubCategoriesByCategorySlug)    //http://localhost:8080/api/category/find-sub-categories-by-category-slug/:categorySlug
router.put("/add-category-or-push-sub-category-into-category",upload.array('categoryImages', 2), addCategoryOrPushSubCategoryIntoCategory)    //http://localhost:8080/api/category/add-category-or-push-sub-category-into-category


module.exports = router

