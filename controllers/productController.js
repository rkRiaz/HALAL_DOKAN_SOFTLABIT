const Product = require('../models/Product')
const { validationResult } = require('express-validator')
const { errorFormatter } = require('../utils/errorFormatter')
const fs = require('fs')



exports.allProducts = async (req, res, next) => {
    try {
        let allProducts = await Product.find()
                              
        if (allProducts.length !== 0) {
            res.status(200).json({
                allProducts,
                message: "Fetched all products successfully!"
            })
        } else {
            res.status(200).json({ message: "No products are in the database" })
        }
    } catch (e) {
        next(e)
    }
}

//   Text SEARCH
exports.getSearchProductByText = async (req, res, next) => {

    try {
        const query = req.query.q.replace(/ /g, '-');
        // const results = await Product.fuzzySearch({ query: query, prefixOnly: false, minSize: 1 })
        if(query) {
            const results = await Product.find({
                $or: [
                    { 
                        productName:  {$regex: new RegExp(query)},
                    },
                    { 
                        slug: {$regex: new RegExp(query)}
                    }
                ]
            })
            res.status(200).json({
                searchProducts: results
            });
        } else {
            const results = await Product.find()
            res.status(200).json({
                searchProducts: ''
            });
        }

    } catch (e) {
        next(e)
    }
}

exports.productsByMegaSearch = async (req, res, next) => {
    try {
        let currentPage = parseInt(req.query.page) || 1
        let searchTerm = req.query.searchTerm.replace(/ /g, '-')
        let lowerPrice = parseInt(req.query.lowerPrice) || 0
        let higherPrice = parseInt(req.query.higherPrice) || Infinity
        let category = req.query.category
        let subCategory = req.query.subCategory
        let itemPerPage = parseInt(req.query.itemPerPage)

        console.log(searchTerm, lowerPrice, higherPrice, category, subCategory, itemPerPage)
        
        if(searchTerm && !category && !subCategory) {
            let allProducts = await Product
                .find({
                    $or: [
                        { 
                            productName:  {$regex: new RegExp(searchTerm)},
                        },
                        { 
                            slug: {$regex: new RegExp(searchTerm)}
                        }
                    ],
                    $and: [
                        { 
                            salePrice:  {$gte: lowerPrice},
                        },
                        { 
                            salePrice:  {$lte: higherPrice},
                        }
                    ]
                })
                .skip((itemPerPage * currentPage) - itemPerPage)
                .limit(itemPerPage)
                let totalProducts = await Product.find({
                    $or: [
                        { 
                            productName:  {$regex: new RegExp(searchTerm)},
                        },
                        { 
                            slug: {$regex: new RegExp(searchTerm)}
                        }
                    ],
                    $and: [
                        { 
                            salePrice:  {$gte: lowerPrice},
                        },
                        { 
                            salePrice:  {$lte: higherPrice},
                        }
                    ],
                
                }).countDocuments()
                console.log(totalProducts)
                let totalPage = totalProducts / itemPerPage
       
                res.status(200).json({
                totalPage: Math.ceil(totalPage),
                allProducts,
                message: "Fetched all products successfully!"
            })
        }

        else if(category) {
            let allProducts = await Product
                .find({
                    categorySlug:  category,
                    $or: [
                        { 
                            productName:  {$regex: new RegExp(searchTerm)},
                        },
                        { 
                            slug: {$regex: new RegExp(searchTerm)}
                        }
                    ],
                    $and: [
                        { 
                            salePrice:  {$gte: lowerPrice},
                        },
                        { 
                            salePrice:  {$lte: higherPrice},
                        }
                    ],
                
                })
                .skip((itemPerPage * currentPage) - itemPerPage)
                .limit(itemPerPage)
                let totalProducts = await Product.find({
                    categorySlug:  category,
                    $or: [
                        { 
                            productName:  {$regex: new RegExp(searchTerm)},
                        },
                        { 
                            slug: {$regex: new RegExp(searchTerm)}
                        }
                    ],
                    $and: [
                        { 
                            salePrice:  {$gte: lowerPrice},
                        },
                        { 
                            salePrice:  {$lte: higherPrice},
                        }
                    ],
                
                }).countDocuments()
                let totalPage = totalProducts / itemPerPage
       
                res.status(200).json({
                totalPage: Math.ceil(totalPage),
                allProducts,
                message: "Fetched all products successfully!"
            })
        }

        else if(subCategory) {
            let allProducts = await Product
            .find({
                subCategorySlug:  subCategory,
                $or: [
                    { 
                        productName:  {$regex: new RegExp(searchTerm)},
                    },
                    { 
                        slug: {$regex: new RegExp(searchTerm)}
                    }
                ],
                $and: [
                    { 
                        salePrice:  {$gte: lowerPrice},
                    },
                    { 
                        salePrice:  {$lte: higherPrice},
                    }
                ]
            })
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)
            let totalProducts = await Product.find({
                subCategorySlug:  subCategory,
                $or: [
                    { 
                        productName:  {$regex: new RegExp(searchTerm)},
                    },
                    { 
                        slug: {$regex: new RegExp(searchTerm)}
                    }
                ],
                $and: [
                    { 
                        salePrice:  {$gte: lowerPrice},
                    },
                    { 
                        salePrice:  {$lte: higherPrice},
                    }
                ]
            }).countDocuments()
            let totalPage = totalProducts / itemPerPage

            res.status(200).json({
                totalPage: Math.ceil(totalPage),
                allProducts,
                message: "Fetched all products successfully!"
            })
        }
        else {
            let allProducts = await Product
            .find({
                $and: [
                    { 
                        salePrice:  {$gte: lowerPrice},
                    },
                    { 
                        salePrice:  {$lte: higherPrice},
                    }
                ]
            })
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)
            let totalProducts = await Product.countDocuments()
            let totalPage = totalProducts / itemPerPage

            res.status(200).json({
                totalPage: Math.ceil(totalPage),
                allProducts,
                message: "Fetched all products successfully!"
            })
        }



   
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.getProductById = async (req, res, next) => {

    let { productId } = req.params
    try {
        let product = await Product.findById(productId)
        res.status(200).json({
            product: product
        })
    } catch (e) {
        next(e)
    }
}

exports.getProductBySlug = async (req, res, next) => {
    const slug = req.params.slug;
    try {
        let products = await Product.find({ slug })
        res.status(200).json({
            products: products,
            message: 'Single Product fetch Successfully!'
        });
    } catch (e) {
        if (!e.statusCode) {
            e.statusCode = 500;
        }
        next(e)
    }
}

exports.getProductsByCategory = async (req, res, next) => {
    const category = req.params.slug;
    try {
        let products = await Product.find({ category })
        res.status(200).json({
            products: products,
            message: 'Products by category fetch Successfully!'
        });
    } catch (e) {
        if (!e.statusCode) {
            e.statusCode = 500;
        }
        next(e)
    }
}

exports.getProductsBySubCategory = async (req, res, next) => {
    const subCategorySlug = req.query.subCategorySlug;
    try {
        let currentPage = parseInt(req.query.page) || 1
        let itemPerPage = parseInt(req.query.itemPerPage) || 8
        let products = await Product
            .find({ subCategorySlug })
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)
        let totalProducts = await Product.find({ subCategorySlug }).countDocuments()
        let totalPage = totalProducts / itemPerPage
        res.status(200).json({
            totalPage: Math.ceil(totalPage),
            products: products,
            message: 'Products by sub category fetch Successfully!'
        });
    } catch (e) {
        if (!e.statusCode) {
            e.statusCode = 500;
        }
        next(e)
    }
}




exports.addProduct = async (req, res, next) => {
    // return console.log( JSON.parse(JSON.stringify(req.body)))
    let errors = validationResult(req).formatWith(errorFormatter)

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped())
    }
    
    try{
        let productImages = req.files.map(file => file.filename)
        let product = new Product(req.body);
        product.available = true,
        product.productImages = productImages

        let addProduct = await product.save()
        return res.status(200).json({
            message: `Successfully added ${addProduct.productName} as category(${addProduct.categorySlug}) and sub category(${addProduct.subCategorySlug})`
        })
    }
    catch(err) {
        next(err)
    }



        // const form = formidable({ multiples: true });
        // form.keepExtensions = true;
        // form.parse(req, async (err, fields, files) => {

        //   let product = new Product(fields);

        //   const productImgs = files.files
        //     // console.log(productImgs)
         
        //     if(Array.isArray(productImgs) === true) {
        //         for(const productImg of productImgs) {
        //             const path =  productImg.path
        //              product.productImages.push(path)
        //           }
        //     } else {
        //         // product.productImages.push(productImgs.path)
 
        //         let oldpath = productImgs.path;
        //         let newpath = "./uploads"
        //         // fs.copyFile(oldpath, newpath, function (err) {
        //         //   if (err) console.log(err) ;
        //         //   console.log('File uploaded and moved!')
        //         // });

        //         fs.writeFileSync(newpath, fs.readFileSync(oldpath));



        //     }

          
    

          

            // console.log(product)
        // const urls = []
       
        // for(const file of files) {
        //     const path = file.path
        //     // const newPath = await uploader(path)
        //     urls.push(path)
        // }
    
        // console.log(urls)

        // var newpath = 'C:/Users/' + files.name;
        // fs.rename( newpath, function (err) {
        //   if (err) throw err;
        //   res.write('File uploaded and moved!');
        //   res.end();
        // })

        


        // let product = new Product(fields);

        // const uploader = async (path) => await cloudinary.uploads(path, 'projects/ecommerce/product_images')
        // const productImgs = files.productImgs

        // for(const productImg of productImgs) {
        // const path = productImg.path
        // const newPath = await uploader(path)
        // product.productImgs.push(newPath.id)
        // }
    
        // console.log(product)
      

    //   console.log(product)
        //   product.save((err, result) => {
        //     if (err) {
        //       return res.status(400).json({
        //         error: errorHandler(err)
        //       });
        //     }
        //     res.json(result);
        //   });
        // });



}

exports.editProduct = async (req, res, next) => {
    // return console.log(req.body)
    let errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped())
    }

    
    const updatedData = req.body;
    const query = {_id: updatedData._id}
    const push = { $set: updatedData }

    try {
        const updatedProduct = await Product.findOneAndUpdate(query, push, {new: true})
        return res.status(200).json({
            message: 'Product Successfully Updated',
        })
        
    } catch (e) {
        next(e)
    }
}

exports.deleteProduct = async (req, res, next) => {
    // try {
    //     let { productId } = req.params
    //     let deletedProduct = await Product.findByIdAndDelete(productId)
    //     let filter = deletedProduct.productImages.filter(p => p !== 'no-image.jpg')
    //     filter.map(p => {
    //         fs.unlink(`public/uploads/images/${p}`, err => {
    //             console.log(err)
    //         })
    //     })
    //     res.status(200).json({
    //         message: `deleted ${deletedProduct.productName} successfully`
    //     })
    // } catch (e) {
    //     next(e)
    // }
} 



