import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router
.get("/users", UserController.listarUsers)
.get("/users/:id", UserController.listarUserPorId)
.post("/users", UserController.cadastratarUser)
.post("/users/login", UserController.login)
.put("/users/:id", UserController.atualizarUser)
.delete("/users/:id", UserController.excluirUser);

export default router;
