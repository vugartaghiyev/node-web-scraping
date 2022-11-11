const http = require("http");
const app = require("./index.js");

const port = 1999;

const server = http.createServer(app);

server.listen(port);
