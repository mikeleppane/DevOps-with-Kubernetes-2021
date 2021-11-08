import express = require("express");
import http from "http";

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server started in port ${port}`));
