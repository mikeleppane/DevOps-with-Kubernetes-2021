import express = require("express");
import cors = require("cors");
import { morganMiddleware } from "../middleware/httpLogging";
import indexRouter from "../routes";
import todoRouter from "../routes/todos";

export const setupRoutes = (app: express.Express) => {
  app.use(cors());
  app.use(express.json());
  app.use(morganMiddleware);
  app.use("/", indexRouter);
  app.use("/todos", todoRouter);
};
