$(function () {

    var socketClient = function () {

        var connectionParams = {
            'server': 'http://talpa.local',
            'port': 3001,
            'path': 'soccom'
        };

        var settings = {
            sock: null,
            server: $('#server'),
            port: $('#port'),
            path: $('#path'),
            messageBody: $('#body')
        };

        // Privat methods
        function getConfig(){
            settings.server.val(connectionParams.server);
            settings.port.val(connectionParams.port);
            settings.path.val(connectionParams.path);
            return connectionParams;
        }

        function loadConfig() {
            var config = getConfig();
            if (!config.server) {
                writeOutput('Did you forgot to create your own config?');
            }
        }

        function getConnectionParams() {
            return {
                server: settings.server.val(),
                port: settings.port.val(),
                path: settings.path.val()
            };
        }

        function prettyPrint() {
            var ugly = settings.messageBody.val();
            var obj = JSON.parse(ugly);
            var pretty = JSON.stringify(obj, undefined, 4);
            settings.messageBody.val(pretty);
        }

        function formProcessor() {
            $("#open").click(function (e) {
                e.preventDefault();
                var cp = getConnectionParams();
                settings.sock = new SockJS(cp.server + ':' + cp.port + '/' + cp.path)
                settings.sock.onopen = function () {
                    writeOutput('socket open');
                };
                settings.sock.onmessage = function (message) {
                    writeOutput(JSON.parse(message.data), 'Message received');
                };
                settings.sock.onclose = function () {
                    writeOutput('socket closed');
                };
            })
            $("#send").click(function (e) {
                e.preventDefault();
                settings.sock.send($('#body').val());
            });
            $("#close").click(function (e) {
                e.preventDefault();
                settings.sock.close();
            });
        }

        function writeOutput (output, message) {
            console.log(output);
            var resultString = '';
            if (message) resultString += '<h5>' + message + '</h5>';
            $('#output').prepend(
                resultString + '<pre>'
                + JSON.stringify(output, null, 4)
                + '</pre>'
            );
        }

        // Public methods
        var run = function () {
            formProcessor();
            loadConfig();
            prettyPrint();
            settings.messageBody.focusout(prettyPrint);
        };

        // Return public methods
        return {
            run: run
        };
    };

    socketClient().run();
});
