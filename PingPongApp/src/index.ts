import express = require("express");
import http from "http";
import { setupRoutes } from "./startup/routes";

const app = express();
setupRoutes(app);
const server = http.createServer(app);
const port = process.env.PORT || 6000;
server.listen(port, () => console.log(`Server started in port ${port}`));
