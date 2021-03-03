const router = require('express').Router()
const productAddValidator = require('../validators/productAddValidator')
const productEditValidator = require('../validators/productEditValidator')
const upload = require('../middlewares/multer')

const { allProducts,
        productsByMegaSearch,
        getProductById,
        getProductBySlug,
        addProduct,
        editProduct,
        deleteProduct,
        getProductsByCategory,
        getProductsBySubCategory,
        getSearchProductByText
    } = require('../controllers/productController')

router.get('/get-all-products-list', allProducts) // http://localhost:8080/api/product/get-all-products-list
router.get('/get-all-products-list-by-mega-search', productsByMegaSearch) // http://localhost:8080/api/product/get-all-products-list-by-mega-search?page=pageNumber&&searchTerm=mango&&lowerPrice=lowerPrice&&higherPrice=higherPrice&&category=category&&subCategory=subCategory
router.get('/get-single-product-by-id/:productId', getProductById) // http://localhost:8080/api/product/get-single-product-by-id/:productId
router.get('/get-single-product-by-slug/:slug', getProductBySlug); // http://localhost:8080/api/product/get-product-by-slug/:slug
router.get('/get-product-list-by-category/:slug', getProductsByCategory) // http://localhost:8080/api/product/get-product-list-by-category/:slug
router.get('/get-product-list-by-sub-category', getProductsBySubCategory) // http://localhost:8080/api/product/get-product-list-by-sub-category?subCategorySlug=subCategorySlug&&page=pageNumber&&itemPerPage=itemPerPage
// Search
router.get('/get-products-by-text-search', getSearchProductByText); // http://localhost:8080/api/product/get-products-by-text-search?q=mango&&lowerPrice=lowerPrice&&higherPrice=higherPrice&&category=category&&subCategory=subCategory
router.post('/add-product', upload.array('files', 5), productAddValidator, addProduct) // http://localhost:8080/api/product/add-product
router.put('/edit-product', upload.array('files', 5), editProduct) //http://localhost:8080/api/product/edit-product
router.delete('/delete-product/:productId', deleteProduct) //http://localhost:8080/api/product/delete-product/productId

module.exports = router