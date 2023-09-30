import { DataTypes } from 'sequelize';
import db from '../../frameworks/db/sequelize';
import { Request, Response } from 'express';

const product: any = db.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    logo: {
        type: DataTypes.STRING
    },
    release_date: {
        type: DataTypes.DATE
    },
    review_date: {
        type: DataTypes.DATE
    },
    state: {
        type: DataTypes.BOOLEAN
    }
});

export default product;

export const getProducts = async( req: Request , res: Response ) => {

    let limit = req.query["limit"];
    if (limit == '0' || limit == null) limit = '5';
    const products = await product.findAll({
        limit:  Number(limit)
    });

    res.status(200).json({
        ok:true,
        products
    });
}

export const getProduct = async( req: Request , res: Response ) => {

    const { id } = req.params;

    try {

        const newProduct = await product.findByPk( id );
        res.status(200).json({
            ok:true,
            newProduct
        });
      
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const createProduct = async( req: Request , res: Response ) => {

    const { body } = req;
    try {

        const newProduct = await product.create( body );
        res.status(200).json({
            ok:true,
            newProduct
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: error
        });
    }
}

export const updateProduct = async( req: Request , res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const newProduct = await product.findByPk( id );
        await newProduct.update(body);
        res.status(200).json({
            ok:true,
            newProduct
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'No se actualizo el producto'
        });
    }
}

export const deleteProduct = async( req: Request , res: Response ) => {

    const { id } = req.params;

    try {
        
        const newProduct = await product.findByPk( id );
        await newProduct.update({ state: false });
        res.status(200).json({
            ok:true,
            newProduct
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'No se elimino el producto'
        });
    }
}