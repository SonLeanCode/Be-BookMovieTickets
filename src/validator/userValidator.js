const { check, validationResult } = require('express-validator');
const validateUser = [
    check('email')
        .exists().withMessage('email is required !')
        .notEmpty().withMessage('email cannot be empty')
        .isString().withMessage('Please enter  a valid email'),

    check('password')
        .exists().withMessage('password required')
        .notEmpty().withMessage('Password cannot be empty'),

    check('role')
        .exists().withMessage('Role is required')
        .notEmpty().withMessage('Role cannot be empty')
        .isIn(['ADMIN', 'USER']).withMessage('Role must be either ADMIN or USER'),

    check('setting.language')
        .optional() // Có thể không bắt buộc
        .isIn(['en', 'vi']).withMessage('Language must be either en or vi'),

    check('fullname')
        .exists().withMessage('Full name is required')
        .notEmpty().withMessage('Full name cannot be empty')
        .isString().withMessage('Full name must be a string'),

    check('phone')
        .exists().withMessage('Phone number is required')
        .notEmpty().withMessage('Phone number cannot be empty')
        .isMobilePhone().withMessage('Please enter a valid phone number'),
//  kiểm tra những thang check trên 
        (req,res,next)=>{
            const errors =  validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({success:false,errors:errors.array()})
            }
            next()
        }
]
module.exports ={
    validateUser
}