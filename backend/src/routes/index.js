import express from "express";
import boards from "./boardRoutes.js";
import user from "./userRoutes.js";
import manipuladorDeErros from "../middlewares/manipuladorDeErros.js";
import manipulador404 from "../middlewares/manipulador404.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "SurfAdvisor API" });
  });

  app.use(express.json(), boards, user);

  app.use(manipulador404);

  app.use(manipuladorDeErros);
};

export default routes;
