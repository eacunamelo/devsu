import express, { Application } from 'express';
import cors from 'cors';
import db from '../db/sequelize';
import productRoutes from '../../product/http/product-router';

class createExpressApp{

    private app: Application;
    private port: string;

    private apiPaths = {
        path: '/bp',
    }

    constructor(){
        this.app  = express();
        this.port = process.env.ECOMMERCE_APP_PORT || '8000';

        // Metodos Iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    // BD
    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            //throw new Error();
            console.log('Database error');
        }
    }

    middlewares(){

        // CORS
        this.app.use( cors({
            origin: ['http://localhost:4200', 'http://localhost:9876'],
         }));

        // Lectura del body
        this.app.use( express.json() );

        // Carpeta publica
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use( this.apiPaths.path, productRoutes );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        })
    }
}

export default createExpressApp;
