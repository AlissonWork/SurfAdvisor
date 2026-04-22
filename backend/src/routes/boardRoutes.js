import express from "express";
import BoardController from "../controllers/boardController.js";
import verificarToken from "../middlewares/verificarToken.js";
import uploadMulter from "../middlewares/uploadMulter.js";

const router = express.Router();

router
  .get("/boards", BoardController.listarBoards)
  .get("/boards/usuario", verificarToken, BoardController.listarBoardsPorUsuario)
  .get("/boards/recomendacao", verificarToken, BoardController.recomendarBoard)
  .get("/boards/:id", verificarToken, BoardController.buscarBoardPorId)
  .post("/boards", verificarToken, uploadMulter, BoardController.adicionarBoard)
  .put("/boards/:id", verificarToken, uploadMulter, BoardController.atualizarBoard)
  .delete("/boards/:id", verificarToken, BoardController.excluirBoard);

export default router;
