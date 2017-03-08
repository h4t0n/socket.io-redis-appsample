(function ($) {
    var socket = io(document.location.origin + '/mynamespace');
    var start = new Date();

    socket.on('connect', function () {
        var index = socket.io.engine.upgrade ? 1 : 0;
        $('#connection').text('Connection established in ' + (new Date() - start) + 'msec. ' +
            'SocketID: ' + socket.id + '. ' +
            'You are using ' + socket.io.engine.transports[index] + '.');
        $('input').removeAttr('disabled');
        $('button').removeAttr('disabled');
    });

    socket.on('message-all', function (data) {
        $('#message-all > ul').append('<li>' + new Date().toString() + ': ' + data + '</li>');
    });

    socket.on('message-room', function (data) {
        $('#message-room > ul').append('<li>' + new Date().toString() + ' - room ' + data.room + ' : ' + data.message + '</li>');
    });

    $('#b-all').click(function () {
        var text = $('#i-all').val();
        if (text.length > 0) {
            socket.emit('message-all', text);
            $('#i-all').val('');
        }
    });

    $('#b-join').click(function () {
        var text = $('#i-join').val();
        if (text.length > 0) {
            socket.emit('join', text);
            $('#i-join').val('');
        }
    });

    $('#b-room').click(function () {
        var room = $('#i-room-name').val();
        var message = $('#i-room-message').val();
        $('#i-room-name').val('');
        $('#i-room-message').val('');

        if (room.length > 0 && message.length > 0) {
            socket.emit('message-room', {
                room: room,
                message: message
            });
        }
    });


}(jQuery));
