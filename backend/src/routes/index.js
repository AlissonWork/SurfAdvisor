import express from "express";
import boards from "./boardRoutes.js";
import manipuladorDeErros from "../middlewares/manipuladorDeErros.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "SurfAdvisor API" });
  });

  app.use(express.json(),boards);

  app.use(manipuladorDeErros);
};

export default routes;
