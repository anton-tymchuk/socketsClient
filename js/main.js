$(function () {
    var sock = null;


    $("#open").click(function (e) {
        e.preventDefault();
        sock = new SockJS($('#server').val() + ':' + $('#port').val() + '/' + $('#path').val())
        sock.onopen = function () {
            writeOutput('socket open');
        };
        sock.onmessage = function (message) {
            writeOutput('message received ', message.data);
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


});
/**
 * Created by igor on 09/09/15.
 */
