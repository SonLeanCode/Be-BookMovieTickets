const { check, validationResult } = require('express-validator');
const validateMovie = [
    check('name')
        .exists().withMessage('name is required')
        .notEmpty().withMessage('name cannot be empty')
        .isString().withMessage('name must be a string'),

    check('img')
        .exists().withMessage('img is required')
        .notEmpty().withMessage('img cannot be empty')
        .isString().withMessage('img must be a string'),
    check('producer')
        .exists().withMessage('Producer is required')
        .notEmpty().withMessage('producer cannot be empty')
        .isString().withMessage('Producer must be a string'),

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