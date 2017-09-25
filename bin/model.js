"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//cria o schema de dados
var clienteSchema = new Schema({
    cliente: { type: String, default: '' },
    peso: { type: Number, default: 0 },
    endereco: { type: String, default: '' },
    complemento: { type: String, default: '' },
    logradouro: { type: String, default: '' },
    numero: { type: String, default: '' },
    bairro: { type: String, default: '' },
    cidade: { type: String, default: '' },
    estado: { type: String, default: '' },
    pais: { type: String, default: '' },
    latitude: { type: String, default: '' },
    longitude: { type: String, default: '' }
});
//cria o modelo baseado no schema
var clienteModel = mongoose.model('dbClientes', clienteSchema);
//exporta o testModel
module.exports = clienteModel;
