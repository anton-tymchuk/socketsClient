$(function () {
    var sock = null;
    var server = $('#server');
    var port = $('#port');
    var path = $('#path');
    var messageBody = $('#body');

    var getConfig = function () {
        // @todo: make file implementation instead of mock
        var connectionParams = {
            "server": "http://talpa.local",
            "port": 3001,
            "path": "soccom"
        }
        server.val(connectionParams.server);
        port.val(connectionParams.port);
        path.val(connectionParams.path)
        return connectionParams;
    }
    var loadConfig = function() {
        var config = getConfig();
        if(!config.server) {
            writeOutput('Did you forgot to create your own config?');
        }
    }
    var getConnectionParams = function () {
        return {
            server: server.val(),
            port: port.val(),
            path: path.val()
        }
    }
    var run = function() {
        loadConfig();
        prettyPrint();
        messageBody.focusout(function(){prettyPrint()});
    }

    function prettyPrint() {
        var ugly = messageBody.val();
        var obj = JSON.parse(ugly);
        var pretty = JSON.stringify(obj, undefined, 4);
        messageBody.val(pretty);
    }

    $("#open").click(function (e) {
        e.preventDefault();
        var cp = getConnectionParams();
        sock = new SockJS(cp.server + ':' + cp.port + '/' + cp.path)
        sock.onopen = function () {
            writeOutput('socket open');
        };
        sock.onmessage = function (message) {
            writeOutput(JSON.parse(message.data), 'Message received');
        };
        sock.onclose = function () {
            writeOutput('socket closed');
        };
    })
    $("#send").click(function (e) {
        e.preventDefault();
        sock.send($('#body').val());
        return;
    });
    $("#close").click(function (e) {
        e.preventDefault();
        sock.close();
        return;
    });


    var writeOutput = function (output, message) {
        console.log(output);
        resultString = '';
        if(message) resultString += '<h5>' + message + '</h5>';
        $('#output').prepend(
            resultString + '<pre>'
            + JSON.stringify(output, null, 4)
            + '</pre>'
        );
    }
    run();


});
