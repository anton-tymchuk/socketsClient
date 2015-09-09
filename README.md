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

### FAQ
Q: A wildcard '*' cannot be used in the 'Access-Control-Allow-Origin' header when the credentials flag is true. Origin 'null' is therefore not allowed access.
A: Easiest way - search on your project by string 'Access-Control-Allow-Origin', find it, and replace * to your domain name (in case of local dev server). Don't forget to restart socket server. 
 

### Todo

- Move config data to separate file
- Prettify JSON output with colors and stuff
- Store message body in browser's WebStorage
- Add error handling