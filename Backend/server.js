import express from "express";
const app = express();
import setUpMiddleware from "./api/middlewares/index.middleware.js";

setUpMiddleware(app);

app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});
