import { Router } from 'express';
import { check } from 'express-validator';
import { getProducts, 
        getProduct, 
        createProduct, 
        updateProduct, 
        deleteProduct } from '../repositories/product-repository';
import { productExist } from '../helpers/product-validator';
import { fieldsValidator } from '../../middlewares/fields-validator';

const router = Router();
    
router.post(
    '/products',  
    [
        check('code', 'El código del producto es obligatorio').not().isEmpty(),
        check('code', 'El código del producto debe ser mayor de 3 caracteres')
        .isLength({ min:3, max: 10 }),
        check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
        check('name', 'El nombre del producto debe ser mayor de 5 caracteres')
        .isLength({ min:5, max: 100 }),
        check('description', 'La descripción es obligatoria').not().isEmpty(),
        check('description', 'La descripción debe ser mayor de 10 caracteres')
        .isLength({ min:10, max: 200 }),
        check('logo', 'El logo es obligatorio').not().isEmpty(),
        check('release_date', 'El logo es obligatorio').not().isEmpty(),
        check('review_date', 'El logo es obligatorio').not().isEmpty(),
        fieldsValidator
    ],  
    createProduct);

router.get('/products',        getProducts);
router.get('/products/:id',     getProduct);
router.put(
    '/products/:id',
    [
        check('id').custom( productExist ), 
        fieldsValidator
    ],
    updateProduct);
router.delete(
    '/products/:id',
    [
        check('id').custom( productExist ), 
        fieldsValidator
    ],
    deleteProduct);

export default router;