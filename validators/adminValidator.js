const { body } = require('express-validator')

const adminLoginValidator = [
    
        // body('loginPhone')
        // .not().isEmpty().withMessage('Phone number required')
        // .isNumeric().withMessage('Please provide a valide phone number'),
        
        body('loginName')
        .not().isEmpty().withMessage('Name required'),
       

        
        body('loginPassword')
        .not().isEmpty().withMessage('Please Enter Your Password')

]

module.exports = adminLoginValidator