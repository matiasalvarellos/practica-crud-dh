const {body} = require('express-validator');
const path = require('path');

module.exports = {
    createProductValidation: [
        body('name')
            .notEmpty()
            .withMessage('Campo name incompleto')
            .bail()
            .isLength({min:1, max:10})
            .withMessage('Campo name no puede tener mas de 10 caracteres'),
        body('price')
            .notEmpty()
            .withMessage('campo price incompleto'),
        body('description')
            .notEmpty()
            .withMessage('campo description incompleto'),
        body('image')
        .custom(function(value, {req}){
            return req.file
        })
        .withMessage('Campo obligatorio imagen')
        .bail()
        .custom(function(value, {req}){
            const extensionesAceptadas = ['.jpg', '.png', '.txt'];
            const extension = path.extname(req.file.originalname);
            return extensionesAceptadas.includes(extension);
        }).withMessage('Imagen invalida')
    ],
    updateProductValidation: [

    ]
}