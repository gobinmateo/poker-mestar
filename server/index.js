import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import socketIO from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// allows cross-origin HTTP requests => https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors());

// allows access to req object => https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express
app.use(bodyParser.json());

io.on('connection', socket => {
    console.log('user connected');

    socket.on('CHANGE_COLOR', (color) => {
        console.log('Color Changed to: ', color);
        socket.broadcast.emit('CHANGE_COLOR', color);
    });

    socket.on('SEND_MESSAGE', (data) => {
        // io.emit sends to all clients
        // io.emit('RECEIVE_MESSAGE', data);
        // socket.broadcast.emit sends to all client expect the one sending the message
        socket.broadcast.emit('RECEIVE_MESSAGE', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen('8080', () => {
    console.log('Listening on port 8080');
});



