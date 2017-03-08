// Module dependencies.
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const redis = require('socket.io-redis');
const app = module.exports = express();
app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});

const io_s = require('socket.io')(server);

io_s.adapter(redis({
    host: '127.0.0.1',
    port: 6379
}));

const io = io_s.of('mynamespace');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((error, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', err);
});

app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {

    socket.on('message-all', (data) => {
        io.emit('message-all', data);
    });

    socket.on('join', (room) => {
        socket.join(room);
        io.emit('message-all', "Socket " + socket.id + " joined to room " + room);
    });

    socket.on('message-room', (data) => {
        const room = data.room;
        const message = data.message;
        io.to(room).emit('message-room', data);
    });


});

app.get('/clients', (req, res, next) => {
    res.send(Object.keys(io.connected));
});