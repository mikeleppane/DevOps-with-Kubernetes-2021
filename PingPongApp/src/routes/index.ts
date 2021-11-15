import express from "express";

import { Pingpong } from "../database/models/pingpong";

const indexRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
indexRouter.get("/", (_req, res) => {
  Pingpong.findByPk(1)
    .then((pingpong) => {
      if (pingpong) {
        pingpong.count = pingpong.count + 1;
        pingpong
          .save()
          .then((savedModel) => {
            console.log("Update ok> ", savedModel);
            res.status(200).send("ok");
          })
          .catch((error) => console.error(error));
      }
    })
    .catch((error) => console.error(error));

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
