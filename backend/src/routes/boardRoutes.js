import express from "express";
import boardController from "../controllers/boardController.js";

const router = express.Router();

router
  .get("/boards", boardController.listarBoards)
  .get("/boards/recomendacao", boardController.recomendarBoard)
  .get("/boards/:id", boardController.buscarBoardPorId)
  .post("/boards", boardController.adicionarBoard)
  .put("/boards/:id", boardController.atualizarBoard)
  .delete("/boards/:id", boardController.excluirBoard);

export default router;
