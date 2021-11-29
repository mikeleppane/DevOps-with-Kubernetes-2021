import express = require("express");
import http from "http";
import { setupRoutes } from "./startup/routes";
import { NatsSubscriber } from "./services/natsSubscriber";

const port = 6000;

const app = express();
const natsSubscriber = new NatsSubscriber();
setupRoutes(app);
const server = http.createServer(app);

const start = async () => {
  await natsSubscriber.connect();
};

start()
  .then(() => {
    server.listen(port, () => console.log(`Server started in port ${port}`));
    natsSubscriber
      .subscribe("TODO")
      .then()
      .catch((error) => console.error(error));
  })
  .catch((error) => console.error(error));
