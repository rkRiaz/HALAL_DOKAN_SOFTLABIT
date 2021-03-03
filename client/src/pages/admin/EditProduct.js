import React, {useState, useEffect} from 'react'
import "./EditProduct.css"
import AdminLayout from './AdminLayout'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {Button, Form} from 'react-bootstrap'
import Carousel from 'react-multi-carousel';
import { FaTrash } from 'react-icons/fa'


function EdirProduct() {

    //product section
    const [product, setProduct] = useState('')
    const [formData, setFormData] = useState(new FormData())
    const [error, setError] = useState({})
    const [category, setCategory] = useState([])
    const [subCategories, setSubCategories] = useState([])
    console.log(product)


    //category section
    const[showCategoryForm, setShowCategoryFrom] = useState(false)
    const[addCategory, setAddCategory] = useState('')
    const[categoryFormData, setCategoryFormData] = useState(new FormData())

    const {productId} = useParams()

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 6,
            slidesToSlide: 5

        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4,
            slidesToSlide: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3,
            slidesToSlide: 2
        }
    };


    //products methods starts
    const change = name => event => {
        if(name === 'productName') {
            formData.set(name, event.target.value)
            formData.set('slug', event.target.value.replace(/\s+/g, '-').toLowerCase())
            setProduct({...product, [name]: event.target.value})
            setProduct({...product, 'slug': event.target.value.replace(/\s+/g, '-').toLowerCase()})


        } 
        if(name === 'categorySlug') {
            axios.get(`http://localhost:8080/api/category/find-sub-categories-by-category-slug/${event.target.value}`)
            .then(res => {
                setSubCategories(res.data.subCategories)
            })
            .catch(err => {
                console.log(err.response)
            })
            formData.set(name, event.target.value)  
            setProduct({...product, [name]: event.target.value})
        }
        if(name === 'files') {
            for(const key of Object.keys(event.target.files)) {
                formData.append(name, event.target.files[key])
            }

        } else{
            formData.set( name, event.target.value )
            formData.set( "_id", productId )
            setProduct({...product, [name]: event.target.value})
        }
    };

    const submit = event => {
        event.preventDefault()
        axios.put('http://localhost:8080/api/product/edit-product', formData)
        .then(res => {
            alert(res.data.message)
        })
        .catch(err => {
            console.log(err.response.data)
            setError(err.response.data)
        })
    }
    //products methods ends

    // categorty methods starts
    const changeCategory = name => event => {
        if(addCategory) {
            categoryFormData.set('category', addCategory)
        }
        if(name === 'categoryImage') {
            categoryFormData.append("categoryImages", event.target.files[0])
            
        }
        if(name === 'subCategoryImage') {
            categoryFormData.append("categoryImages", event.target.files[0])
        }
        else{
            categoryFormData.set( name, event.target.value )
        }
    };
    const submitCategory = e => {
        e.preventDefault()
        axios.put('/api/category/add-category-or-push-sub-category-into-category', categoryFormData)
        .then(res=> {
            console.log(res.data)
            alert(res.data.message)
            categoryFormData.delete("categoryImages")
        })
        .catch(err => {
            console.log(err.response)
        })
    }
    // categorty methods ends

    useEffect(() => {
        axios.get(`/api/category/get-all-category`)
        .then(res => {
            setCategory(res.data.allCategory)
        })
        .catch(err => {
            console.log(err.response)
        })

        axios.get(`/api/product/get-single-product-by-id/${productId}`)
        .then(res => {
            setProduct(res.data.product)
        })
        .catch(err => {
            console.log(err.response)
        })
    }, [])

    const deleteSingleImage = e => {
       alert('riaz')
    }


        return (
           <AdminLayout>
                <div className="editProduct">
                    <div className="d-flex justify-content-between">
                        <div className="editProduct__headline">Edit Product</div>
                        <Button disabled onClick={e => setShowCategoryFrom(!showCategoryForm)} className="btn btn-primary m-2">Edit Category</Button>
                    </div>
                    <div className="editProduct__content">
                        <Form onSubmit={submit} className="" encType="multipart/form-data">
                                <div className="editProduct__contentForm">
                                    <div>
                                        <Form.Group className="editProduct__contentFormGroup">
                                            <Form.Label>Product Name</Form.Label>
                                            <Form.Control onChange={change('productName')} isInvalid={error.productName ? true : false} className="editProduct__contentInput" type="text" value={product.productName}/>
                                            <Form.Control.Feedback type="invalid" tooltip>
                                                {error.productName ? error.productName : ""}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="editProduct__contentFormGroup">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Control onChange={change('categorySlug')}
                                                className="editProduct__contentInput" 
                                                type="text"
                                                as="select"
                                                id="custom-file"
                                                custom
                                            >
                                                <option value={product.categorySlug}>{product.categorySlug}</option>
                                                {category.map(c => (
                                                <option value={c.categorySlug}>{c.category}</option> 
                                                ))}
                                            </Form.Control> 
                                        </Form.Group>
                                        <Form.Group className="editProduct__contentFormGroup">
                                            <Form.Label>Sub Category</Form.Label>
                                            <Form.Control onChange={change('subCategorySlug')}
                                                className="editProduct__contentInput" 
                                                type="text"
                                                as="select"
                                                id="custom-file"
                                                custom
                                            >
                                                <option value={product.sCbcategorySlug}>{product.subCategorySlug}</option>
                                                {Array.isArray(subCategories) ? subCategories.map(s => (
                                                <option value={s.subCategorySlug}>{s.name}</option> 
                                                )):
                                                <option value="">Choose sub category</option>
                                                }
                                            </Form.Control> 
                                        </Form.Group>
                                        <Form.Group className="editProduct__contentFormGroup">
                                            <Form.Label>Regular Price</Form.Label>
                                            <Form.Control onChange={change('regularPrice')} isInvalid={error.regularPrice ? true : false} className="editProduct__contentInput" type="number" value={product.regularPrice}/>
                                            <Form.Control.Feedback type="invalid" tooltip>
                                                {error.regularPrice ? error.regularPrice  : ""}
                                            </Form.Control.Feedback>
                                        </Form.Group>  
                                        <Form.Group className="editProduct__contentFormGroup">
                                            <Form.Label>Sale Price</Form.Label>
                                            <Form.Control onChange={change('salePrice')} isInvalid={error.salePrice ? true : false} className="editProduct__contentInput" type="number" value={product.salePrice}/>
                                            <Form.Control.Feedback type="invalid" tooltip>
                                                {error.salePrice ? error.salePrice  : ""}
                                            </Form.Control.Feedback>
                                        </Form.Group> 
                                        <Form.Group className="editProduct__contentFormGroup">
                                            <Form.Label>Enter Product Code</Form.Label>
                                            <Form.Control onChange={change('productCode')} isInvalid={error.productCode ? true : false} className="editProduct__contentInput" type="number" value={product.productCode} />
                                            <Form.Control.Feedback type="invalid" tooltip>
                                                {error.productCode ? error.productCode  : ""}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div>
                                        <Form.Group className="editProduct__contentFormGroup">
                                            <Form.Label>Enter Product Brand</Form.Label>
                                            <Form.Control onChange={change('brand')} isInvalid={error.brand ? true : false} className="editProduct__contentInput" type="text" value={product.brand} />
                                            <Form.Control.Feedback type="invalid" tooltip>
                                                {error.brand ? error.brand  : ""}
                                            </Form.Control.Feedback>
                                        </Form.Group>   
                                        <Form.Group className="editProduct__contentFormGroup">
                                            <Form.Label>Enter Product Quantity</Form.Label>
                                            <Form.Control onChange={change('quantity')} isInvalid={error.quantity ? true : false} className="editProduct__contentInput" type="number" value={product.quantity} />
                                            <Form.Control.Feedback type="invalid" tooltip>
                                                {error.quantity ? error.quantity  : ""}
                                            </Form.Control.Feedback>
                                        </Form.Group> 
                                        <Form.Group  className="editProduct__contentFormGroup">
                                            <Form.Label>Change Short Description</Form.Label>
                                            <Form.Control  as="textarea" rows={3} onChange={change('shortDescription')}  type="text" value={product.shortDescription} />
                                        </Form.Group> 
                                        <Form.Group className="editProduct__contentFormGroup">
                                            <Form.Label>Change Long Description</Form.Label>
                                            <Form.Control as="textarea" rows={5} onChange={change('longDescription')} type="text" value={product.longDescription}/>
                                        </Form.Group> 
                                        <Form.Group className="addProduct__contentFormGroup">
                                            <Form.Label>Youtube Video Code</Form.Label>
                                            <Form.Control as="textarea" onChange={change('productVideo')} type="text" value={product.productVideo} />
                                        </Form.Group> 
                                    </div>
                                </div>
                                <div className="">
                                    <div className="editProduct__editImages">
                                        <Carousel responsive={responsive}>
                                            { 
                                                product? product.productImages.map(image => (
                                                <div  className="editProduct__editImage">
                                                    <div onClick={deleteSingleImage} data-image={image} className="editProduct__editImageDelete"><FaTrash/></div>
                                                    <img src={`/uploads/images/${image}`} alt=""/>
                                                </div>
                                                )) : '' 
                                            }
                                        </Carousel>
                                    </div>

                                    <Form.File 
                                        onChange={change('files')}
                                        id="custom-file"
                                        custom
                                        label="Upload product images"
                                        type="image"
                                        lang="en"
                                        multiple= 'true'
                                        accept="image/*"
                                    />  
                                </div>
   
                            <Button className="btn-primary editProduct__contentBtn" type="submit">Edit Product</Button>
                        </Form>


                        
                        <Form onSubmit={submitCategory} className={showCategoryForm ? "addCategory__contentForm" : "hideAddCategory__contentForm"} encType="multipart/form-data">
                            <div className="text-center my-3 h4 text-light">Enter Category</div>
                                

                                {
                                    addCategory ?
                                    <>
                                    <Form.Group className="addCategory__contentFormGroup">
                                        <Form.Control onChange={e => setAddCategory(e.target.value)}
                                            className="addCategory__contentInput" 
                                            type="text"
                                            as="select"
                                            id="inlineFormCustomSelectPref"
                                            custom
                                        >
                                            <option value="">Choose Existing Category</option>
                                            {category.map(c => (
                                            <option value={c.categorySlug}>{c.category}</option> 
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="addCategory__contentFormGroup">
                                        <Form.Control disabled onChange={changeCategory('category')} isInvalid={error.productName ? true : false} className="addCategory__contentInput"  type="text" placeholder="Enter Category (Fruits)" />
                                    </Form.Group>
                                    <Form.Group className="addCategory__contentFormGroup">
                                        <Form.Control disabled onChange={changeCategory('categorySlug')} isInvalid={error.productName ? true : false} className="addCategory__contentInput"  type="text" placeholder="Enter Category Slug (fruits)" />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupProductName" className="addCategory__contentFormGroup">
                                        <Form.File 
                                        id="custom-file-translate-scss"
                                        label="Select Category Image"
                                        type="image"
                                        lang="en"
                                        accept="image/*"
                                        disabled
                                    />
                                    </Form.Group>
                                    </>
                                    :
                                    <>
                                    <Form.Group className="addCategory__contentFormGroup">
                                    <Form.Control onChange={e => setAddCategory(e.target.value)}
                                        className="addCategory__contentInput" 
                                        type="text"
                                        as="select"
                                        label="Select Category Image"
                                        id="inlineFormCustomSelectPref"
                                        custom
                                    >
                                        <option value="">Choose Existing Category</option>
                                        {category.map(c => (
                                        <option value={c.categorySlug}>{c.category}</option> 
                                        ))}
                                    </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="addCategory__contentFormGroup">
                                        <Form.Control onChange={changeCategory('category')} isInvalid={error.productName ? true : false} className="addCategory__contentInput"  type="text" placeholder="Enter Category (Fruits)" />
                                    </Form.Group>
                
                                    <Form.Group className="addCategory__contentFormGroup">
                                        <Form.Control onChange={changeCategory('categorySlug')} isInvalid={error.productName ? true : false} className="addCategory__contentInput"  type="text" placeholder="Enter Category Slug (fruits)" />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupProductName" className="addCategory__contentFormGroup">
                                        <Form.File 
                                        onChange={changeCategory('categoryImage')}
                                        id="custom-file-translate-scss"
                                        label="Select Category Image"
                                        type="image"
                                        lang="en"
                                        accept="image/*"
                                    />
                                    </Form.Group>
                                    </>
                                }




                                <Form.Group className="addCategory__contentFormGroup">
                                    <Form.Control onChange={changeCategory('subCategory')} className="addCategory__contentInput" type="text" placeholder="Enter Sub Category"/>
                                </Form.Group> 
                                <Form.Group  className="addCategory__contentFormGroup">
                                    <Form.Control onChange={changeCategory('subCategorySlug')} isInvalid={error.productName ? true : false} className="addCategory__contentInput" type="text" placeholder="Enter Sub Category Slug (fruits)" />
                                </Form.Group>
                                <Form.Group  className="addCategory__contentFormGroup">
                                    <Form.File 
                                        onChange={changeCategory('subCategoryImage')}
                                        id="custom-file-translate-scss"
                                        label="Select Sub Category Image"
                                        type="image"
                                        lang="en"
                                        accept="image/*"
                                    />    
                                </Form.Group>
                                <Button className="text-center mt-3" type="submit">Edit Category</Button>
                                <Button onClick={e => setShowCategoryFrom(!showCategoryForm)} className="text-center btn btn-danger mt-2" >Close</Button>
                        </Form>
                    </div>    
               
                </div>
           </AdminLayout>
        )
    }





export default EdirProduct
