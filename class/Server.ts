import express from 'express';
import { SERVER_PORT } from '../global/environmen';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.listenSocket();
    }

    public static get instance(){
        return this._instance || ( this._instance = new this() );
    }

    private listenSocket(){
        console.log('escuchando conexiones');

        this.io.on('connection', cliente => {
            console.log('nuevo cliente conectado');

            socket.disconnect(cliente);

            socket.msm(cliente, this.io);
        })
    }

    start( callback: any ) {

        this.httpServer.listen( this.port, callback );

    }

}