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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const sequelize_1 = __importDefault(require("../db/sequelize"));
const product_router_1 = __importDefault(require("../../product/http/product-router"));
class createExpressApp {
    constructor() {
        this.apiPaths = {
            path: '/bp',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.ECOMMERCE_APP_PORT || '8000';
        // Metodos Iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    // BD
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sequelize_1.default.authenticate();
                console.log('Database online');
            }
            catch (error) {
                //throw new Error();
                console.log('Database error');
            }
        });
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)({
            origin: ['http://localhost:4200', 'http://localhost:9876'],
        }));
        // Lectura del body
        this.app.use(express_1.default.json());
        // Carpeta publica
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.path, product_router_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}
exports.default = createExpressApp;
//# sourceMappingURL=express.js.map