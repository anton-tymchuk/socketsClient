# socketsClient

### What is it?

This is a client for WebSockets, which you can run in browser and see server response.

### Quick start

Clone this repo to localhost and run index.html in your browser

### Config specification

After page reload form data usually disappears. To fix this situation — open `js/main.js` and in the top of the file 
specify your connection data.
 
### What used?
- SockJS
- TwitterBootstrap3
- jQuery
 

### Todo

- Move config data to separate file
- Prettify JSON output with colors and stuff
- Store message body in browser's WebStorage
- Add error handling