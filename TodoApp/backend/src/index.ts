import express = require("express");
import http from "http";
import { setupRoutes } from "./startup/routes";
import { connectToDatabase } from "./database/db";
import { NatsService } from "./services/nats";

const port = process.env.PORT || 5000;

const app = express();
const natsService = new NatsService();
setupRoutes(app);
const server = http.createServer(app);

const start = async () => {
  await connectToDatabase();
  await natsService.connect();
};

start()
  .then(() => {
    server.listen(port, () => console.log(`Server started in port ${port}`));
  })
  .catch((error) => console.error(error));
