import {TServer} from './server';

//instancia um novo objeto TMEANServer
const Server = new TServer;

//cria uma rota estática para o public e a página principal
Server.AddStatic('./public');

//adiciona uma rota CRUD
Server.AddREST('/rest');

//define o endereço do mongo + database
Server.DatabaseURL = "mongodb://localhost/routeasy";

//inicia o servidor
Server.Listen('80');