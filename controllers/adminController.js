
const Admin = require('../models/Admin')
const Customer = require('../models/Customer')
const { validationResult } = require('express-validator')
const {errorFormatter} = require('../utils/errorFormatter')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt') 

exports.registration = async (req, res, next) => {
    const { userName, phone, password, confirmPassword } = req.body

    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()) {
        return res.status(422).json(errors.mapped())
    }
    
    try{
        // let customer = await Customer.findOne({phone})
        let hashedPassword = await bcrypt.hash(password, 11)
        let match = await bcrypt.compare(confirmPassword, hashedPassword)
        if(match) {
            const admin = new Admin({
                userName,
                phone,   
                password: hashedPassword 
            })
            let newAdmin = await admin.save() 
            res.status(200).json({
                message: "Successfully Registered",
                newAdmin
            })
        }

    }catch (e) {
        next(e)
    }
}


exports.loginController = async (req, res, next) => {
    let {loginName, loginPassword} = req.body
    
    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()) {
        return res.status(400).json(errors.mapped())
    }
    
    try{
        let findAdmin = await Admin.findOne({userName: loginName})
        let match = await bcrypt.compare(loginPassword, findAdmin.password)
        if(findAdmin) {
            if(!match) {
                return res.status(401).json({message: 'password is not correct'})
            } else {
                let token = jwt.sign({
                    _id: findAdmin._id,
                    userName: findAdmin.userName,
                }, 'ADMIN_SECRET', {expiresIn: '24h'})
    
                res.status(200).json({
                    message: 'Login Success',
                    adminToken: token,
                    expiresIn: 86400 
                })
      
            }
        } else {
            return res.status(401).json({message: 'user name is not correct'})
        }
    }catch(e) {
        next(e)
    }

}

exports.allCustomers = async (req, res, next) => {
    try{
        let allCustomers = await Customer.find()
        res.status(200).json({
            allCustomers
        })
    }catch(e) {
        next(e)
    }
}


exports.changePassword = async(req, res, next) => {
    let{ oldPassword, newPassword, confirmPassword } = req.body
    const loginAdminId = req.adminId;
    try {
        let findAdmin = await Admin.findById(loginAdminId)
        if(findAdmin) {
            if(newPassword !== confirmPassword) {
               return res.status(200).json({
                   message: "Confirm password does not match"
               })
            }

            if(oldPassword && newPassword && confirmPassword !== "" || null) {
                let match = await bcrypt.compare(oldPassword, findAdmin.password)
                if(match) {
                    let hash = await bcrypt.hash(newPassword, 11)
                    await Admin.findOneAndUpdate(
                        {_id: loginAdminId},
                        {$set: {password: hash}},
                        {new: true},
                    )
                    return res.status(200).json({
                        message: "Successfully changed password"
                    }) 
                } else {
                    return res.status(200).json({
                        message: 'Old password does not match'
                    }) 
                }
             } else {
                 return res.status(200).json({
                    message: "Must Fillup All Fields"
                })
             }
        }
    }catch(e) {
        next(e)
    }

}