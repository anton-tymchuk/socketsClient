$(function() {
    var sock = null;
    $("#open").click(function(e){
        e.preventDefault();
        sock = new SockJS('http://talpa.local:3001/soccom')
        // sock.open();
        sock.onopen = function() {
            // console.log('loaded');
            console.log('socket open');
        };
        sock.onmessage = function(message) {
            console.log('message received', message.data);
        };
        sock.onclose = function() {
            console.log('close');
        };
    })
    $("#send").click(function(e){
        e.preventDefault();

        var toSend = {
            "t": "request",
            "a": "performance.qualify",
            "d": {
                "accessToken":"7dbe8cbe314938aa248f94f8a960e8986f683efa412a6f118d95b3aef38acd5e",
                "id": "c924bf1e-0c73-435f-95c6-f85779ffc430",
                // "qualification:":"ok",
                // "performance:":"qwertyuiopasdfghjklzxcvbnmqwertyuiop",
                "qualify": "bret"
            }
        };

        sock.send(JSON.stringify(toSend));
        return;
    });
    $("#close").click(function(e){
        e.preventDefault();
        sock.close();
        return;
    });
});
/**
 * Created by igor on 09/09/15.
 */
