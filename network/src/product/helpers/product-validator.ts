import { Op } from 'sequelize';
import product from '../../product/repositories/product-repository';

export const productExist = async ( id = 0 ) => {

    const productExist = await product.findByPk( id );

    if( !productExist ){
        throw new Error(`No existe el producto`)
    }
}