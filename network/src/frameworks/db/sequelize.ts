import { Sequelize } from 'sequelize';

//Desarrollo
const dialect = process.env.SEQUELIZE_DIALECT || 'mysql';
const username = process.env.SEQUELIZE_USERNAME || 'root';
const password = process.env.SEQUELIZE_PASSWORD || 'root';
const database = process.env.SEQUELIZE_DATABASE || 'devsu';

//@ts-ignore
const SequelizeClient = new Sequelize( database, username, password, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    // logging: false,
    define: {
        // Deshabilita la creacion de campos de Sequelize
        timestamps: false,
        // Deshabilita el cambio de nombre de tablas de Sequelize
        freezeTableName: true
    },
}); 

export default SequelizeClient;