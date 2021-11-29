import express from "express";
import { NatsSubscriber } from "../services/natsSubscriber";

const indexRouter = express.Router();
// eslint-disable-next-line @typescript-eslint/no-misused-promises
indexRouter.get("/healthz", (_req, res) => {
  if (NatsSubscriber.nc) {
    const isConnected = !NatsSubscriber.nc.isClosed();
    if (isConnected) {
      return res.status(200).send("ok");
    }
  }
});

export default indexRouter;
