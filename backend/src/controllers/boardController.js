import BoardService from "../services/BoardServices.js";
import NaoEncontrado from "../error/NaoEncontrado.js";

class BoardController {
  static listarBoards = async (req, res, next) => {
    try {
      const listaBoards = await BoardService.listarTudo();
      res.status(200).json(listaBoards);
    } catch (error) {
      next(error);
    }
  };

  static buscarBoardPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const boardResultado = await BoardService.buscarPorId(id);
      if (boardResultado !== null) {
        res.status(200).json(boardResultado);
      } else {
        next(new NaoEncontrado("Board ID not found."));
      }
    } catch (error) {
      next(error);
    }
  };

  static adicionarBoard = async (req, res, next) => {
    try {
      const boardResultado = await BoardService.criarBoard(req.body);
      res.status(201).send(boardResultado.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static atualizarBoard = async (req, res, next) => {
    try {
      const id = req.params.id;
      const boardResultado = await BoardService.atualizar(id, req.body);

      if (boardResultado !== null) {
        res
          .status(200)
          .send({ message: "Updated board", data: boardResultado });
      } else {
        next(new NaoEncontrado("Board ID not found."));
      }
    } catch (error) {
      next(error);
    }
  };

  static excluirBoard = async (req, res, next) => {
    try {
      const id = req.params.id;
      const boardResultado = await BoardService.excluir(id);

      if (boardResultado !== null) {
        res.status(200).send({ message: "Data deleted" });
      } else {
        next(new NaoEncontrado("Board ID not found."));
      }
    } catch (error) {
      next(error);
    }
  };

  static recomendarBoard = async (req, res, next) => {
    try {
      const { altura } = req.query;
      if (!altura) {
        return res
          .status(400)
          .send({ message: "Please provide the sea level." });
      }

      const alturaMar = parseFloat(altura);

      const boardSugeridas = await BoardService.buscarPorAltura(alturaMar);

      if (boardSugeridas.length > 0) {
        res.status(200).json({
          message: `Your recommended boards for sea level ${altura} m`,
          sugestoes: boardSugeridas.map((board) => {
            return {
              id: board._id,
              nome: board.nome,
              estilo: board.estilo,
            };
          }),
        });
      } else {
        next(new NaoEncontrado("No boards found for the given sea level."));
      }
    } catch (error) {
      next(error);
    }
  };
}

export default BoardController;
