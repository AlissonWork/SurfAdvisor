import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

router
  .get("/users", UserController.listarUsers)
  .get("/users/:id", UserController.listarUserPorId)
  .post("/users/register", UserController.cadastrarUser)
  .post("/users/login", UserController.login)
  .post("/users/logout", UserController.logout)
  .put("/users/:id", UserController.atualizarUser)
  .delete("/users/:id", UserController.excluirUser);

export default router;
