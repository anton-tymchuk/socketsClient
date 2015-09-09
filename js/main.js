$(function () {
    var sock = null;
    var server = $('#server');
    var port = $('#port');
    var path = $('#path');

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
        if(!config) {
            writeOutput('Did you forgot to create your own config? ');
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
    }


    $("#open").click(function (e) {
        e.preventDefault();
        var cp = getConnectionParams();
        sock = new SockJS(cp.server + ':' + cp.port + '/' + cp.path)
        sock.onopen = function () {
            writeOutput('socket open');
        };
        sock.onmessage = function (message) {
            writeOutput('message received ' + JSON.stringify(message.data));
        };
        sock.onclose = function () {
            writeOutput('socket closed');
        };
    })
    $("#send").click(function (e) {
        e.preventDefault();

        var toSend = {
            "t": "request",
            "a": "performance.qualify",
            "d": {
                "accessToken": "7dbe8cbe314938aa248f94f8a960e8986f683efa412a6f118d95b3aef38acd5e",
                "id": "c924bf1e-0c73-435f-95c6-f85779ffc430",
                "qualify": "bret"
            }
        };

        sock.send(JSON.stringify(toSend));
        return;
    });
    $("#close").click(function (e) {
        e.preventDefault();
        sock.close();
        return;
    });


    var writeOutput = function (output) {
        console.log(output);
        $('#output').append('<div>' + output + '</div>');
    }
    run();


});
/**
 * Created by igor on 09/09/15.
 */
