import express = require("express");
import http from "http";
import { setupRoutes } from "./startup/routes";
import { connectToDatabase } from "./database/db";

const port = process.env.PORT || 5000;

const app = express();
setupRoutes(app);
const server = http.createServer(app);

const start = async () => {
  await connectToDatabase();
  server.listen(port, () => console.log(`Server started in port ${port}`));
};

start()
  .then()
  .catch((error) => console.error(error));
