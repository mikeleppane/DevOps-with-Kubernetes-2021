import express = require("express");
import http from "http";
import { setupRoutes } from "./startup/routes";
import { connectToDatabase } from "./database/db";
import { NatsService } from "./services/nats";
// import { create } from "apisauce";
//
// const api = create({
//   baseURL:
//     "https://api.telegram.org/bot2039063645:AAEE6g1uO_Fd6B0x5entqhnrP0v4fUW0vcE/sendMessage",
//   timeout: 5000,
// });
//
// api
//   .post("", {
//     chat_id: 2135565126,
//     text: "Testing from node",
//   })
//   .then((response) => console.log(response))
//   .catch((error) => console.error(error));

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
