import dotenv from "dotenv";
import ConnectMongo from "../../config/DB.js";
import { router as homeRouter } from "../routes/home.routes.js";
import { router as blogRouter } from "../routes/blog.routes.js";
import express from "express";
export default function setUpMiddleware(app) {
  dotenv.config({
    override: true,
    silent: true,
  });

  ConnectMongo().then((res) => {
    console.log("Connected to mongoDB");
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/", homeRouter);
  app.use("/blog", blogRouter);
}
