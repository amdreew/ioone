import  Server  from "./class/Server";
import  router  from './routes/router'
import bodyParser from 'body-parser';
import cors from 'cors';

const server = Server.instance;

server.app.use( bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());
server.app.use(cors({origin: true, credentials: true }));

// RUTAS DE SERVICIO
server.app.use('/', router);

server.start( () => {
    console.log(`SERVER ON PORT ${server.port}`);
    
});