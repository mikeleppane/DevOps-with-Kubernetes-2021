import express = require("express");
import cors = require("cors");
import { morganMiddleware } from "../middleware/httpLogging";
import statusRouter from "../routes/status";
import indexRouter from "../routes";

export const setupRoutes = (app: express.Express) => {
  app.use(cors());
  app.use(express.json());
  app.use(morganMiddleware);
  app.use("/", indexRouter);
  app.use("/status", statusRouter);
};
