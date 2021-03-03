const { Schema, model } = require('mongoose')

const productSchema = new Schema(
    {
        productName: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        regularPrice: {
            type: Number,
            required: true
        },
        salePrice: {
            type: Number,
            required: true
        },
        categorySlug: {
            type: String,
            required: true
        },
        subCategorySlug: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: false
        },
        productCode: {
            type: String,
            required: true
        },
        available:  {
            type: Boolean
        },
        quantity: {
            type: Number,
            required: true
        },
        tag: {
            type: [String]
        },
        productImages: {
            type: [String]
        },
        productVideo: String,
        shortDescription: {
            type: String
        },
        longDescription: {
            type: String
        },
        ratings: {
            type: Object
        },
        reviews: {
            type: [String]
        },
    },
    {
        timestamps: true
    }
);


const Product = model('Product', productSchema);
module.exports = Product;