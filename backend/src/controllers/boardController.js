import Board from "../models/Board.js";
import NaoEncontrado from "../error/NaoEncontrado.js";

class boardController {
  static listarBoards = async (req, res, next) => {
    try {
      const listaBoards = await Board.find();
      res.status(200).json(listaBoards);
    } catch (error) {
      next(error);
    }
  };

  static buscarBoardPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const boardResultado = await Board.findById(id);

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
      let board = new Board(req.body);
      const boardResultado = await board.save();
      res.status(201).send(boardResultado.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static atualizarBoard = async (req, res, next) => {
    try {
      const id = req.params.id;
      const boardResultado = await Board.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true },
      );

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
      const boardResultado = await Board.findByIdAndDelete(id);

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

      const boardSugeridas = await Board.find({
        ondaMinima: { $lte: alturaMar },
        ondaMaxima: { $gte: alturaMar },
      });

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

export default boardController;
