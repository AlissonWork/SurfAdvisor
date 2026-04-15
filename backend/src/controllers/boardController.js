import BoardService from "../services/BoardServices.js";
import NaoEncontrado from "../error/NaoEncontrado.js";
import ErroBase from "../error/ErroBase.js";
import WeatherService from "../services/WeatherService.js";

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
      const idPrancha = req.params.id;
      const idUsuarioLogado = req.user.id;

      const board = await BoardService.buscarPorId(idPrancha);

      if (!board) {
        return next(new NaoEncontrado("Board not found."));
      }

      if (board.usuario._id.toString() !== idUsuarioLogado) {
        return next(
          new ErroBase("You don't have permission to view this board.", 403),
        );
      }

      res.status(200).json(board);
    } catch (error) {
      next(error);
    }
  };

  static listarBoardsPorUsuario = async (req, res, next) => {
    try {
      const idUsuarioLogado = req.user.id;
      const boards = await BoardService.buscarPorUsuario(idUsuarioLogado);

      res.status(200).json(boards);
    } catch (error) {
      next(error);
    }
  };

  static adicionarBoard = async (req, res, next) => {
    try {
      const dadosPrancha = req.body;
      dadosPrancha.usuario = req.user.id; // Atribui o ID do usuário autenticado
      dadosPrancha.imagem = req.file ? req.file.path : null; // Atribui o caminho da imagem se houver upload
      const boardResultado = await BoardService.criarBoard(dadosPrancha);
      res.status(201).json(boardResultado);
    } catch (error) {
      next(error);
    }
  };

  static atualizarBoard = async (req, res, next) => {
    try {
      const idPrancha = req.params.id;
      const idUsuarioLogado = req.user.id;

      const board = await BoardService.buscarPorId(idPrancha);

      if (!board) {
        return next(new NaoEncontrado("Board not found."));
      }

      if (board.usuario._id.toString() !== idUsuarioLogado) {
        return next(
          new ErroBase("You don't have permission to update this board.", 403),
        );
      }

      const dadosAtualizados = { ...req.body };

      if (req.file) {
        dadosAtualizados.imagem = req.file.path; // Atualiza o caminho da imagem se houver upload
      }

      const boardResultado = await BoardService.atualizar(idPrancha, dadosAtualizados);

      res.status(200).send({ message: "Updated board", data: boardResultado });
    } catch (error) {
      next(error);
    }
  };

  static excluirBoard = async (req, res, next) => {
    try {
      const idPrancha = req.params.id;
      const idUsuarioLogado = req.user.id;

      const board = await BoardService.buscarPorId(idPrancha);

      if (!board) {
        return next(new NaoEncontrado("Board not found."));
      }

      if (board.usuario._id.toString() !== idUsuarioLogado) {
        return next(
          new ErroBase("You don't have permission to delete this board.", 403),
        );
      }

      await BoardService.excluir(idPrancha);

      res.status(200).send({ message: "Board deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

  static recomendarBoard = async (req, res, next) => {
    try {
      const { pico } = req.query;
      const idUsuarioLogado = req.user.id;

      if (!pico) {
        return res.status(400).json({ message: "Please provide pico key." });
      }

      const dadosMar = await WeatherService.obterAlturaOnda(pico);
      console.log(
        `Consulta: ${dadosMar.pico} | Altura atual: ${dadosMar.altura}m`,
      );
      const boardSugeridas = await BoardService.gerarRecomendacaoPersonalizada(
        idUsuarioLogado,
        dadosMar.altura,
      );

      if (boardSugeridas) {
        boardSugeridas.local = dadosMar.pico;
        res.status(200).json(boardSugeridas);
      } else {
        next(
          new NaoEncontrado(
            "User not found or no boards match the conditions.",
          ),
        );
      }
    } catch (error) {
      next(error);
    }
  };
}

export default BoardController;
