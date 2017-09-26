"use strict";
/*
* Node+Exp+Mongo Server unit
* creates basic server with express + mongoose
* author: dpaula
* https://github.com/debersonpaula
*/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
//server class
var TServer = /** @class */ (function () {
    //constructor
    function TServer() {
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }
    //add static route
    TServer.prototype.AddStatic = function (path) {
        this.app.use(express.static(path));
    };
    //add route to specific file
    TServer.prototype.AddRouteToFile = function (uri, filename) {
        this.app.get(uri, function (req, res) {
            res.sendFile(filename);
        });
    };
    //add REST handler
    TServer.prototype.AddREST = function (uri) {
        var model = require('./model');
        //Create Handler
        this.app.post(uri, function (req, res) {
            var insertData = new model(req.body);
            insertData.save(function (err, result) {
                if (err) {
                    res.status(400);
                    res.json(err);
                }
                else {
                    res.status(200);
                    res.json(result);
                }
            });
        });
        //Read All Handler
        this.app.get(uri, function (req, res) {
            model.find(function (err, result) {
                if (err) {
                    res.status(400);
                    res.json(err);
                }
                else if (result.length) {
                    res.status(200);
                    res.json(result);
                }
                else {
                    res.status(200);
                    res.json([]);
                }
            });
        });
        //Delete Handler
        this.app.delete(uri + '/:id', function (req, res) {
            var id = req.params.id;
            model.findByIdAndRemove(id, function (err, result) {
                if (err) {
                    res.status(400);
                    res.json(err);
                }
                else {
                    res.status(200);
                    res.json([]);
                }
            });
        });
    };
    //server initializator
    TServer.prototype.Listen = function (port) {
        var dbURI = this.DatabaseURL;
        mongoose.connection.on('connected', function () { console.log('Mongoose conectado em ' + dbURI); });
        mongoose.connection.on('error', function (err) { console.log('Mongoose não conectado, erro: ' + err); });
        mongoose.connection.on('disconnected', function () { console.log('Mongoose desconectado.'); });
        mongoose.connection.on('open', function () { console.log('Conexão Mongoose aberta.'); });
        mongoose.connect(dbURI, { useMongoClient: true });
        this.app.listen(port, function (err) {
            if (err) {
                console.log('Não foi possível inicializar o servidor na porta ' + port);
                throw err;
            }
            else {
                console.log("Servidor HTTP ligado na porta " + port);
            }
        });
    };
    return TServer;
}());
exports.TServer = TServer;
