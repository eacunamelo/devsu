"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const product_repository_1 = require("../repositories/product-repository");
const product_validator_1 = require("../helpers/product-validator");
const fields_validator_1 = require("../../middlewares/fields-validator");
const router = (0, express_1.Router)();
router.post('/products', [
    (0, express_validator_1.check)('code', 'El código del producto es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('code', 'El código del producto debe ser mayor de 3 caracteres')
        .isLength({ min: 3, max: 10 }),
    (0, express_validator_1.check)('name', 'El nombre del producto es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('name', 'El nombre del producto debe ser mayor de 5 caracteres')
        .isLength({ min: 5, max: 100 }),
    (0, express_validator_1.check)('description', 'La descripción es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('description', 'La descripción debe ser mayor de 10 caracteres')
        .isLength({ min: 10, max: 200 }),
    (0, express_validator_1.check)('logo', 'El logo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('release_date', 'El logo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('review_date', 'El logo es obligatorio').not().isEmpty(),
    fields_validator_1.fieldsValidator
], product_repository_1.createProduct);
router.get('/products', product_repository_1.getProducts);
router.get('/products/:id', product_repository_1.getProduct);
router.put('/products/:id', [
    (0, express_validator_1.check)('id').custom(product_validator_1.productExist),
    fields_validator_1.fieldsValidator
], product_repository_1.updateProduct);
router.delete('/products/:id', [
    (0, express_validator_1.check)('id').custom(product_validator_1.productExist),
    fields_validator_1.fieldsValidator
], product_repository_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=product-router.js.map