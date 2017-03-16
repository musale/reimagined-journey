const server = require('net').createServer();
let sockets = [];
let counter = 0;

function timestamp(){
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}`;
}

server.on('connection', socket=>{
    socket.write('Enter your name: ');
    socket.id = counter++;

    socket.on('data', data=>{
        if (!sockets[socket.id]) {
            socket.name = data.toString().trim();
            socket.write(`Welcome ${socket.name}\n`);
            sockets[socket.id] = socket;
            return
        }
        Object.keys(sockets).forEach((conn)=>{
            if (socket.id == conn) return;
            sockets[conn].write(`${socket.name} ${timestamp()}: `);
            sockets[conn].write(data);
        });
    });

    socket.on('end', ()=>{
        delete sockets[socket.id];
        console.log('DISCONNECTED');
    });
});

server.listen(9000, ()=>{
    console.log('COMING THROUGH...')
});
