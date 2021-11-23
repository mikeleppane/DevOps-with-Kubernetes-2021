import express from "express";

const healthRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
healthRouter.get("/", (_req, res) => {
  res.status(200).send("ok");
});

export default healthRouter;
