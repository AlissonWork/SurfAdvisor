import express from "express";
import BoardController from "../controllers/BoardController.js";
import verificarToken from "../middlewares/verificarToken.js";

const router = express.Router();

router
  .get("/boards", BoardController.listarBoards)
  .get("/boards/usuario", verificarToken, BoardController.listarBoardsPorUsuario)
  .get("/boards/recomendacao", verificarToken, BoardController.recomendarBoard)
  .get("/boards/:id", verificarToken, BoardController.buscarBoardPorId)
  .post("/boards", verificarToken, BoardController.adicionarBoard)
  .put("/boards/:id", verificarToken, BoardController.atualizarBoard)
  .delete("/boards/:id", verificarToken, BoardController.excluirBoard);

export default router;
