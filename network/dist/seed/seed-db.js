"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("../frameworks/db/sequelize"));
const product_repository_1 = __importDefault(require("../product/repositories/product-repository"));
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Esto crea las tablas en la base de datos
            yield sequelize_1.default.sync({ force: true });
            // Generar datos de prueba
            const products = yield product_repository_1.default.bulkCreate([
                {
                    code: 'SA01',
                    name: 'Cuenta de Ahorro',
                    description: 'Es una cuenta bancaria diseñada para ayudarte a ahorrar dinero a largo plazo',
                    logo: '',
                    release_date: '2023-09-27',
                    review_date: '2023-10-27',
                    state: true
                },
                {
                    code: 'TC02',
                    name: 'Tarjeta de Crédito',
                    description: 'Es una línea de crédito proporcionada por el banco que te permite realizar compras a crédito',
                    logo: '',
                    release_date: '2023-09-27',
                    review_date: '2023-10-27',
                    state: true
                },
                {
                    code: 'PP03',
                    name: 'Préstamo Personal',
                    description: 'Es un préstamo que puedes obtener de un banco',
                    logo: '',
                    release_date: '2023-09-27',
                    review_date: '2023-10-27',
                    state: true
                },
                {
                    code: 'CC04',
                    name: 'Cuenta Corriente',
                    description: 'Es una cuenta bancaria que te permite realizar transacciones diarias',
                    logo: '',
                    release_date: '2023-09-27',
                    review_date: '2023-10-27',
                    state: true
                },
                {
                    code: 'CC05',
                    name: 'Cuentas Empresariales',
                    description: 'Los bancos proporcionan una variedad de productos y servicios financieros diseñados para empresas',
                    logo: '',
                    release_date: '2023-09-27',
                    review_date: '2023-10-27',
                    state: true
                },
                {
                    code: 'IT01',
                    name: 'Inversiones',
                    description: 'Los bancos también pueden ofrecer servicios de inversión',
                    logo: '',
                    release_date: '2023-09-27',
                    review_date: '2023-10-27',
                    state: true
                },
            ]);
            console.log('Datos insertados correctamente');
        }
        catch (error) {
            console.error('Error al insertar datos de prueba:', error);
        }
        finally {
            yield sequelize_1.default.close();
        }
    });
}
seedDatabase();
//# sourceMappingURL=seed-db.js.map