import { validationResult, body } from 'express-validator';

const validateFields = [
    body('full_name').notEmpty().isString(),
    body('id_card').notEmpty().isString(),
    body('birthday').notEmpty().isDate(),
    body('hometown').notEmpty().isString(),
    body('permanent_address').notEmpty().isString(),
    body('idCard_front_url').notEmpty().isString(),
    body('idCard_back_url').notEmpty().isString(),
    body('otp').notEmpty().isString().isLength({ min: 6, max: 6 }).matches(/^[0-9]+$/),

    // Xử lý lỗi nếu có
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export  {validateFields}