import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router
.get("/users", userController.listarUsers)
.get("/users/:id", userController.listarUserPorId)
.post("/users", userController.cadastratarUser)
.put("/users/:id", userController.atualizarUser)
.delete("/users/:id", userController.deletarUser);

export default router;
