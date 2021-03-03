const { Schema, model } = require('mongoose')

const categorytSchema = new Schema(
    {
        category: {
            type: String,
            required: true,
        },
        categoryImage: {
            type: String
        },
        categorySlug: {
            type: String,
            required: true,
        },
        subCategory: [
            {
                name: {
                    type: String,
                    required: true,
                },
                subCategoryImage: {
                    type: String,
                },
                subCategorySlug: {
                    type: String,
                    required: true,
                }
            },
        ],

    }

        
);


const Product = model('Category', categorytSchema);
module.exports = Product;