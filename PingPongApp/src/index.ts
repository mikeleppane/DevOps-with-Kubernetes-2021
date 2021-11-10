import express = require("express");
import http from "http";
import { setupRoutes } from "./startup/routes";
import { saveRequestsToFile } from "./utils/saveRequestsToFile";

const app = express();
setupRoutes(app);
const server = http.createServer(app);
const port = process.env.PORT || 6000;
server.listen(port, () => console.log(`Server started in port ${port}`));
saveRequestsToFile(0)
  .then()
  .catch((e) => console.error(e));
