import { Socket } from 'socket.io';


export const disconnect = (cliente: Socket) =>{
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    })
}

export const msm = (cliente: Socket, io: SocketIO.Server ) => {
    cliente.on('mensaje', (payload : {of: string, body: string}) =>{
        console.log(payload);
        io.emit('new-message', payload);
    } )
}