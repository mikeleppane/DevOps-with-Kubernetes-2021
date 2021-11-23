import express from "express";

const indexRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
indexRouter.get("/", (_req, res) => {
  res.status(200).send("ok");
});

export default indexRouter;
