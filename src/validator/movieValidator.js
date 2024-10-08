const { check, validationResult } = require('express-validator');
const validateMovie = [
    check('nameMovie')
        .exists().withMessage('nameMovie is required')
        .notEmpty().withMessage('nameMovie cannot be empty')
        .isString().withMessage('nameMovie must be a string'),

    check('image')
        .exists().withMessage('Image is required')
        .notEmpty().withMessage('image cannot be empty')
        .isString().withMessage('Image must be a string'),

    check('price')
        .exists().withMessage('Price is required')
        .notEmpty().withMessage('price cannot be empty')
        .isString().withMessage('Price must be a string'),

    check('actor')
        .exists().withMessage('Actor is required')
        .notEmpty().withMessage('actor cannot be empty')
        .isString().withMessage('Actor must be a string'),

    check('producer')
        .exists().withMessage('Producer is required')
        .notEmpty().withMessage('producer cannot be empty')
        .isString().withMessage('Producer must be a string'),

    check('rating')
        .exists().withMessage('Rating is required'),
    check('title')
        .exists().withMessage('Title is required')
        .notEmpty().withMessage('title cannot be empty')
        .isString().withMessage('Title must be a string'),

    // Không bắt buộc 
    check('description')
        .isString().withMessage('Description must be a string'),

    check('director')
        .isString().withMessage('Director must be a string'),

    check('duration')
        .isNumeric().withMessage('Duration must be a number'),

    check('release_date')

        .isISO8601().withMessage('Release date must be a valid date (ISO8601)'),

    (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next()
}
];
module.exports = {
    validateMovie
}