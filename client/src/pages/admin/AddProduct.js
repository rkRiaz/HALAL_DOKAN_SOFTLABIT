import React, {useState, useEffect} from 'react'
import "./AddProduct.css"
import AdminLayout from './AdminLayout'
import axios from 'axios'
import {Button, Form} from 'react-bootstrap'

function AddProductPage() {
    const[values, setValues] = useState({
        productName: '',
        slug: '',
        category: '',
        subCategory: '',
        regularPrice: '',
        salePrice: '',
        brand: '',
        productCode: '',
        quantity: '',
        tag: [],
        productImages: [],
        shortDescription: '',
        longDescription: '',

        formData: new FormData(),
        error: {}
    })
    const [autoGenerateSlug, setAutoGenerateSlug] = useState(false)

    const [formData, setFormData] = useState(new FormData())
    const [error, setError] = useState({})
    const [category, setCategory] = useState([])
    const [subCategories, setSubCategories] = useState([])

    const[showCategoryForm, setShowCategoryFrom] = useState(false)
    const[addCategory, setAddCategory] = useState('')
    const [autoGenerateCategorySlug, setAutoGenerateCategorySlug] = useState(false)

    const[categoryFormData, setCategoryFormData] = useState(new FormData())


    const change = name => event => {
        
        // if(autoGenerateSlug === true) {
        //     if(name === 'productName') {
        //         formData.set(name, event.target.value)
        //         formData.set('slug', event.target.value.replace(/\s+/g, '-').toLowerCase())
        //         console.log(event.target.value.replace(/\s+/g, '-').toLowerCase())
        //     } 
        // }
        if(name === 'categorySlug') {
            axios.get(`/api/category/find-sub-categories-by-category-slug/${event.target.value}`)
            .then(res => {
                console.log(res.data.subCategories)
                setSubCategories(res.data.subCategories)
            })
            .catch(err => {
                console.log(err.response)
            })
            formData.append(name, event.target.value)  
        }
        if(name === 'files') {
            console.log(event.target.files)
            for(const key of Object.keys(event.target.files)) {
                formData.append(name, event.target.files[key])
            }
            setValues({ ...values, 'productImages': event.target.files })
        }

        else{
            formData.set( name, event.target.value )
            setValues({ ...values, [name]: event.target.value })
        }
    };

    const submit = event => {
        event.preventDefault()
        axios.post('/api/product/add-product', formData)
        .then(res => {
            alert(res.data.message)
            setValues({})
        })
        .catch(err => {
            console.log(err.response.data)
            setError(err.response.data)
        })
    }

    const changeCategory = name => event => {
        if(addCategory) {
            categoryFormData.set('category', addCategory)
        }
        if(setAutoGenerateCategorySlug) {
            if(name === 'category') {
                categoryFormData.set('categorySlug', event.target.value.replace(/\s+/g, '-').toLowerCase())
            }
            if(name === 'subCategory') {
                categoryFormData.set('subCategorySlug', event.target.value.replace(/\s+/g, '-').toLowerCase())
            }
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

    useEffect(() => {
        axios.get(`/api/category/get-all-category`)
        .then(res => {
            setCategory(res.data.allCategory)
        })
        .catch(err => {
            console.log(err.response)
        })
    }, [category])

    







  
        return (
           <AdminLayout>
                <div className="addProduct">
                    <div className="d-flex justify-content-between">
                        <div className="addProduct__headline">Product Adding Page</div>
                        
                            {/* <p><input className="mt-2" onChange={e => setAutoGenerateSlug(!autoGenerateSlug)} type="checkbox" />&nbsp;&nbsp;Checked For Auto Generated Slug</p> */}
                            
                      
                        <Button onClick={e => setShowCategoryFrom(!showCategoryForm)} className="btn btn-primary m-2">Add Category</Button>
                    </div>
                    <div className="addProduct__content">
                        <Form onSubmit={submit} className="addProduct__contentForm" encType="multipart/form-data">
                                <div>
                                    <Form.Group className="addProduct__contentFormGroup">
                                        <Form.Control onChange={change('productName')} isInvalid={error.productName ? true : false} className="addProduct__contentInput" type="text" placeholder="Full Product Name *" />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {error.productName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    {
                                        autoGenerateSlug ? "" :
                                    <Form.Group className="addProduct__contentFormGroup">
                                        <Form.Control onChange={change('slug')} isInvalid={error.slug ? true : false} className="addProduct__contentInput" type="text" placeholder="Product Slug *" />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {error.slug}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    }
                                    <Form.Group className="addProduct__contentFormGroup">
                                        <Form.Control onChange={change('categorySlug')}
                                            isInvalid={error.categorySlug ? true : false}
                                            className="addProduct__contentInput" 
                                            type="text"
                                            as="select"
                                            id="custom-file"
                                            custom
                                        >
                                            <option value="noValue">Choose category</option>
                                            {category.map(c => (
                                            <option value={c.categorySlug}>{c.category}</option> 
                                            ))}
                                        
                                        
                                        </Form.Control> 
                                    </Form.Group>
                                    <Form.Group className="addProduct__contentFormGroup">
                                        <Form.Control onChange={change('subCategorySlug')}
                                            isInvalid={error.subCategorySlug ? true : false}
                                            className="addProduct__contentInput" 
                                            type="text"
                                            as="select"
                                            id="custom-file"
                                            custom
                                        >
                                            <option value="">Choose sub category</option>
                                            {Array.isArray(subCategories) ? subCategories.map(s => (
                                            <option value={s.subCategorySlug}>{s.name}</option> 
                                            )):
                                            <option value="">Choose sub category</option>
                                            }
                                        </Form.Control> 
                                    </Form.Group>
                                    <Form.Group className="addProduct__contentFormGroup">
                                        <Form.Control onChange={change('regularPrice')} isInvalid={error.regularPrice ? true : false} className="addProduct__contentInput" type="number" placeholder="Enter regular price" />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {error.regularPrice ? error.regularPrice  : ""}
                                        </Form.Control.Feedback>
                                    </Form.Group>  
                                    <Form.Group className="addProduct__contentFormGroup">
                                        <Form.Control onChange={change('salePrice')} isInvalid={error.salePrice ? true : false} className="addProduct__contentInput" type="number" placeholder="Enter sale price" />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {error.salePrice ? error.salePrice  : ""}
                                        </Form.Control.Feedback>
                                    </Form.Group> 
                                    <Form.Group className="addProduct__contentFormGroup">
                                        <Form.Control onChange={change('brand')} isInvalid={error.brand ? true : false} className="addProduct__contentInput" type="text" placeholder="Enter brand" />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {error.brand ? error.brand  : ""}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="addProduct__contentFormGroup">
                                        <Form.Control onChange={change('quantity')} isInvalid={error.quantity ? true : false} className="addProduct__contentInput" type="number" placeholder="Enter product quantity" />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {error.quantity ? error.quantity  : ""}
                                        </Form.Control.Feedback>
                                    </Form.Group> 
                                </div>
                                <div>
                                    <Form.Group className="addProduct__contentFormGroup">
                                        <Form.Control onChange={change('productCode')} isInvalid={error.productCode ? true : false} className="addProduct__contentInput" type="text" placeholder="Enter product code" />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {error.productCode ? error.productCode  : ""}
                                        </Form.Control.Feedback>
                                    </Form.Group> 
                                    <Form.Group  className="addProduct__contentFormGroup">
                                        <Form.Control  as="textarea" rows={3} onChange={change('shortDescription')}  type="text" placeholder="Enter product's short description" />
                                    </Form.Group> 
                                    <Form.Group className="addProduct__contentFormGroup">
                                        <Form.Control as="textarea" rows={5} onChange={change('longDescription')} type="text" placeholder="Enter product's long description" />
                                    </Form.Group> 
                                    <Form.Group className="addProduct__contentFormGroup">
                                        <Form.Control as="textarea" onChange={change('productVideo')} type="text" placeholder="Enter youtube iframe code (eYS814ubRTY)" />
                                    </Form.Group> 
                                    <Form.File 
                                        onChange={change('files')}
                                        id="custom-file-translate-scss"
                                        label="Upload product images"
                                        type="file"
                                        lang="en"
                                        multiple= 'true'
                                        accept="image/*"
                                    />    
                                </div>
       
                            <Button className="btn-primary addProduct__contentBtn" type="submit">Add Product</Button>
                        </Form>

                        {/* adding category section starts */}
                        <div onClick={e => setShowCategoryFrom(!showCategoryForm)} className={showCategoryForm ? "addCategory__contentFormCloseBtn" : "hideAddCategory__contentFormCloseBtn"}></div>
                        <Form onSubmit={submitCategory} className={showCategoryForm ? "addCategory__contentForm" : "hideAddCategory__contentForm"}  encType="multipart/form-data">
                            <div className="text-center my-3 h4 text-dark">Enter Category</div>
                            <p><input className="mt-2" onChange={e => setAutoGenerateCategorySlug(!autoGenerateCategorySlug)} type="checkbox" />&nbsp;&nbsp;Checked For Auto Generated Slug</p>
                                {
                                    addCategory ?
                                    <>
                                    <Form.Group className="addCategory__contentFormGroup">
                                        <Form.Control onChange={e => setAddCategory(e.target.value)}
                                            className="addCategory__contentInput" 
                                            type="text"
                                            as="select"
                                            id="custom-file"
                                            custom
                                        >
                                            <option value="">Choose Existing Category</option>
                                            {category.map(c => (
                                            <option value={c.categorySlug}>{c.category}</option> 
                                            ))}
                                        </Form.Control>
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
                                        id="custom-file"
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
                                    {
                                    autoGenerateCategorySlug ? "" :
                                    <Form.Group className="addCategory__contentFormGroup">
                                        <Form.Control onChange={changeCategory('categorySlug')} isInvalid={error.productName ? true : false} className="addCategory__contentInput"  type="text" placeholder="Enter Category Slug (fruits)" />
                                    </Form.Group>
                                    }
                                    <Form.Group controlId="formGroupProductName" className="addCategory__contentFormGroup">
                                        <Form.File 
                                        onChange={changeCategory('categoryImage')}
                                        label="Select Category Image"
                                        id="custom-file"
                                        custom
                                        type="image"
                                        lang="en"
                                        accept="image/*"
                    
                                    />
                                    </Form.Group>
                                    </>
                                }





                                <Form.Group className="addCategory__contentFormGroup">
                                    <Form.Control onChange={changeCategory('subCategory')} className="addCategory__contentInput" type="text" placeholder="Enter Sub Category (Mango)"/>
                                </Form.Group> 
                                {
                                  
                                    
                                autoGenerateCategorySlug ? "" :
                                <Form.Group className="addCategory__contentFormGroup">
                                    <Form.Control onChange={changeCategory('subCategorySlug')} isInvalid={error.productName ? true : false} className="addCategory__contentInput"  type="text" placeholder="Enter Sub Category Slug (mango)" />
                                </Form.Group>
                                    
                                }
                            
                         
                                <Form.Group  className="addCategory__contentFormGroup">
                                    <Form.File 
                                        onChange={changeCategory('subCategoryImage')}
                                        id="custom-file"
                                        custom
                                        label="Select Sub Category Image"
                                        type="image"
                                        lang="en"
                                        custome
                                        accept="image/*"
                                    />    
                                </Form.Group>
                                <div className="d-flex justify-content-between">
                                    <Button className="mr-3" type="submit">Add Category</Button>
                                    <Button onClick={e => setShowCategoryFrom(!showCategoryForm)} >Close</Button>
                                </div>
                        </Form>
                    </div>    
               
                </div>
           </AdminLayout>
        )
    }





export default AddProductPage
