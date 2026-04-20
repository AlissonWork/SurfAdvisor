import express from "express";
import boards from "./boardRoutes.js";
import user from "./userRoutes.js";
import manipuladorDeErros from "../middlewares/manipuladorDeErros.js";
import manipulador404 from "../middlewares/manipulador404.js";
import cookieParser from "cookie-parser";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "SurfAdvisor API" });
  });

  app.use(express.json(), cookieParser(), boards, user);

  app.use("/uploads", express.static("uploads"));

  app.use(manipulador404);

  app.use(manipuladorDeErros);
};

export default routes;
