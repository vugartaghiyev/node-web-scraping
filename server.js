import http from "http";
import app from "./app.js";

const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port);
