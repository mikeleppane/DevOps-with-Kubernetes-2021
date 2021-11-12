import express from "express";
import { increaseCounter } from "../utils/requestCounter";

const indexRouter = express.Router();

indexRouter.get("/", (_req, res) => {
  increaseCounter();
  res.status(200).send("ok");
  // const data = "Ping / Pong: " + numberOfRequests.toString() + "\n";
  // saveRequestsToFile(increaseCounter())
  //   .then(() => {
  //     res.status(200).send("ok");
  //   })
  //   .catch((e) => {
  //     console.error(e);
  //     res.status(500).json({ error: e.message });
  //   });
});

export default indexRouter;
