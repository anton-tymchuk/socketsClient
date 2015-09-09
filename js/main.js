$(function () {
    var socketClient = {
        // @todo: mowe this to separate file
        connectionParams: {
            "server": "http://talpa.local",
            "port": 3001,
            "path": "soccom"
        },
        sock: null,
        server: $('#server'),
        port: $('#port'),
        path: $('#path'),
        messageBody: $('#body'),
        getConfig: function () {
            socketClient.server.val(socketClient.connectionParams.server);
            socketClient.port.val(socketClient.connectionParams.port);
            socketClient.path.val(socketClient.connectionParams.path)
            return socketClient.connectionParams;
        },
        loadConfig: function () {
            var config = socketClient.getConfig();
            if (!config.server) {
                socketClient.writeOutput('Did you forgot to create your own config?');
            }
        },
        getConnectionParams: function () {
            return {
                server: socketClient.server.val(),
                port: socketClient.port.val(),
                path: socketClient.path.val()
            }
        },
        run: function () {
            socketClient.formProcessor();
            socketClient.loadConfig();
            socketClient.prettyPrint();
            socketClient.messageBody.focusout(function () {
                prettyPrint()
            });
        },
        prettyPrint: function () {
            var ugly = socketClient.messageBody.val();
            var obj = JSON.parse(ugly);
            var pretty = JSON.stringify(obj, undefined, 4);
            socketClient.messageBody.val(pretty);
        },
        formProcessor: function () {
            $("#open").click(function (e) {
                e.preventDefault();
                var cp = socketClient.getConnectionParams();
                socketClient.sock = new SockJS(cp.server + ':' + cp.port + '/' + cp.path)
                socketClient.sock.onopen = function () {
                    socketClient.writeOutput('socket open');
                };
                socketClient.sock.onmessage = function (message) {
                    socketClient.writeOutput(JSON.parse(message.data), 'Message received');
                };
                socketClient.sock.onclose = function () {
                    socketClient.writeOutput('socket closed');
                };
            })
            $("#send").click(function (e) {
                e.preventDefault();
                socketClient.sock.send($('#body').val());
            });
            $("#close").click(function (e) {
                e.preventDefault();
                socketClient.sock.close();
            });
        },
        writeOutput: function (output, message) {
            console.log(output);
            var resultString = '';
            if (message) resultString += '<h5>' + message + '</h5>';
            $('#output').prepend(
                resultString + '<pre>'
                + JSON.stringify(output, null, 4)
                + '</pre>'
            );
        }
    };


    socketClient.run();
});
