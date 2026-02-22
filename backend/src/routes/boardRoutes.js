import express from "express";
import BoardController from "../controllers/BoardController.js";

const router = express.Router();

router
  .get("/boards", BoardController.listarBoards)
  .get("/boards/recomendacao", BoardController.recomendarBoard)
  .get("/boards/:id", BoardController.buscarBoardPorId)
  .post("/boards", BoardController.adicionarBoard)
  .put("/boards/:id", BoardController.atualizarBoard)
  .delete("/boards/:id", BoardController.excluirBoard);

export default router;
