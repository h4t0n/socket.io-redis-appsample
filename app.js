// Module dependencies.

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = module.exports = express();

app.set('port', process.env.PORT || 3000);

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
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', err);
});

app.get('/', function(req,res){
    res.render('index');
});

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

var io_s = require('socket.io')(server);
var redis = require('socket.io-redis');
io_s.adapter(redis({
    host: '127.0.0.1',
    port: 6379
}));

var io = io_s.of('mynamespace');

io.on('connection', function (socket) {

    socket.on('message-all', function (data) {
        io.emit('message-all', data);
    });

    socket.on('join', function (room) {
        socket.join(room);
        io.emit('message-all', "Socket " + socket.id + " joined to room " + room);
    });

    socket.on('message-room', function (data) {
        var room = data.room;
        var message = data.message;

        io.to(room).emit('message-room', data);

    });


});

app.get('/clients', function (req, res, next) {

    res.send(Object.keys(io.connected));

});
