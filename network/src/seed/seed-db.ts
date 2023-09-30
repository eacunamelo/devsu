import sequelize from '../frameworks/db/sequelize';
import product from '../product/repositories/product-repository';

async function seedDatabase() {
  try {

    // Esto crea las tablas en la base de datos
    await sequelize.sync({ force: true }); 

    // Generar datos de prueba
    const products = await product.bulkCreate([
        { 
          code: 'SA01',
          name: 'Cuenta de Ahorro',
          description: 'Es una cuenta bancaria diseñada para ayudarte a ahorrar dinero a largo plazo',
          logo: '',
          release_date:'2023-09-27',
          review_date:'2023-10-27',
          state: true
        },
        { 
          code: 'TC02',
          name: 'Tarjeta de Crédito',
          description: 'Es una línea de crédito proporcionada por el banco que te permite realizar compras a crédito', 
          logo: '', 
          release_date:'2023-09-27', 
          review_date:'2023-10-27', 
          state: true },
        { 
          code: 'PP03',
          name: 'Préstamo Personal',
          description: 'Es un préstamo que puedes obtener de un banco',
          logo: '',
          release_date:'2023-09-27', 
          review_date:'2023-10-27',
          state: true 
        },
        { 
          code: 'CC04',
          name: 'Cuenta Corriente',
          description: 'Es una cuenta bancaria que te permite realizar transacciones diarias',
          logo: '',
          release_date:'2023-09-27', 
          review_date:'2023-10-27',
          state: true 
        },
        { 
          code: 'CC05',
          name: 'Cuentas Empresariales',
          description: 'Los bancos proporcionan una variedad de productos y servicios financieros diseñados para empresas',
          logo: '',
          release_date:'2023-09-27', 
          review_date:'2023-10-27',
          state: true 
        },
        { 
          code: 'IT01',
          name: 'Inversiones',
          description: 'Los bancos también pueden ofrecer servicios de inversión',
          logo: '',
          release_date:'2023-09-27', 
          review_date:'2023-10-27',
          state: true 
        },
    ]);
    console.log('Datos insertados correctamente');
  } catch (error) {
    console.error('Error al insertar datos de prueba:', error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();