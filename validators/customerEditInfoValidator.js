const Customer = require('../models/Customer')
const { check } = require('express-validator')

const customerUpdateValidator = [
       
          
        check('name')
            .not().isEmpty().withMessage('Must enter your name')
            .trim(),


        check('address')
            .not().isEmpty().withMessage('Must enter your address')
            .trim(),

        // check('email')
            // .trim()
        

]

module.exports = customerUpdateValidator