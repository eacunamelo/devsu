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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../frameworks/db/sequelize"));
const product = sequelize_2.default.define('product', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    logo: {
        type: sequelize_1.DataTypes.STRING
    },
    release_date: {
        type: sequelize_1.DataTypes.DATE
    },
    review_date: {
        type: sequelize_1.DataTypes.DATE
    },
    state: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
exports.default = product;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let limit = req.query["limit"];
    if (limit == '0' || limit == null)
        limit = '5';
    const products = yield product.findAll({
        limit: Number(limit)
    });
    res.status(200).json({
        ok: true,
        products
    });
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const newProduct = yield product.findByPk(id);
        res.status(200).json({
            ok: true,
            newProduct
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.getProduct = getProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const newProduct = yield product.create(body);
        res.status(200).json({
            ok: true,
            newProduct
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: error
        });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const newProduct = yield product.findByPk(id);
        yield newProduct.update(body);
        res.status(200).json({
            ok: true,
            newProduct
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'No se actualizo el producto'
        });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const newProduct = yield product.findByPk(id);
        yield newProduct.update({ state: false });
        res.status(200).json({
            ok: true,
            newProduct
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'No se elimino el producto'
        });
    }
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product-repository.js.map