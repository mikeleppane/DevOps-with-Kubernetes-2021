import express from "express";
import { generateLog } from "../utils/logGenerator";

const statusRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
statusRouter.get("/", async (_req, res) => {
  const log = await generateLog();
  if (log) {
    res.status(200).send(log);
  } else {
    res.status(500).send("Something went wrong while getting status");
  }
  // generateLog()
  //   .then((response) => {
  //     res.status(200).send(response);
  //   })
  //   .catch((e) => {
  //     console.error(e);
  //     res.status(500).json({ error: e.message });
  //   });
});

export default statusRouter;
