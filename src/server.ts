/*
* Node+Exp+Mongo Server unit
* creates basic server with express + mongoose
* author: dpaula
* https://github.com/debersonpaula
*/

import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

//server class
class TServer{
    //components
    protected app: express.Application;
    protected db: mongoose.Connection;

    //database properties
    public DatabaseURL: string;

    //constructor
    constructor(){
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
    }

    //add static route
    public AddStatic(path:string){
        this.app.use(express.static(path));
    }

    //add route to specific file
    public AddRouteToFile(uri:string,filename:string){
        this.app.get(uri, function(req, res){
            res.sendFile(filename);
        });
    }

    //add REST handler
    public AddREST(uri:string){

        var model = require('./model');

        //Create Handler
        this.app.post(uri,function (req, res) {
            var insertData = new model(req.body);
            insertData.save(function(err:any,result:any){
                if (err){
                    res.status(400);
                    res.json(err);
                }else{
                    res.status(200);
                    res.json(result);
                }
            });
        });

        //Read All Handler
        this.app.get(uri,function (req, res) {
            model.find(function(err:any,result:any){
                if (err){
                    res.status(400);
                    res.json(err);
                }else if (result.length){
                    res.status(200);
                    res.json(result);
                }else{
                    res.status(200);
                    res.json([]);
                }
            });
        });

        //Delete Handler
        this.app.delete(uri + '/:id',function (req, res) {
            var id = req.params.id;
            model.findByIdAndRemove(id,function(err:any,result:any){
                if (err){
                    res.status(400);
                    res.json(err);
                }else{
                    res.status(200);
                    res.json([]);
                }
            });
        });
    }

    //server initializator
    public Listen(port:string){
        const dbURI = this.DatabaseURL;
        mongoose.connection.on('connected',function(){ console.log('Mongoose conectado em ' + dbURI); });
        mongoose.connection.on('error',function(err){ console.log('Mongoose não conectado, erro: ' + err); });
        mongoose.connection.on('disconnected',function(){ console.log('Mongoose desconectado.'); });
        mongoose.connection.on('open',function(){ console.log('Conexão Mongoose aberta.'); });
        mongoose.connect(dbURI,{useMongoClient: true});
        this.app.listen(port,function(err:any){
            if (err){
                console.log('Não foi possível inicializar o servidor na porta ' + port);
                throw err;
            }else{
                console.log(`Servidor HTTP ligado na porta ${port}`) 
            }
        });
    }
}

export {TServer};