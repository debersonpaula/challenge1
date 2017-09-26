"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
//instancia um novo objeto TMEANServer
var Server = new server_1.TServer;
//cria uma rota estática para o public e a página principal
Server.AddStatic('./public');
//adiciona uma rota CRUD
Server.AddREST('/rest');
//define o endereço do mongo + database
Server.DatabaseURL = "mongodb://localhost/routeasy";
//inicia o servidor
Server.Listen('3000');
