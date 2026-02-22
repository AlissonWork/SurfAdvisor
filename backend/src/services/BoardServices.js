import Board from "../models/Board.js";

class BoardService {
  static listarTudo = async () => {
    return await Board.find();
  };

  static buscarPorId = async (id) => {
    return await Board.findById(id).populate("usuario", "nome").exec();
  };

  static criarBoard = async (dados) => {
    const board = new Board(dados);
    return await board.save();
  };

  static atualizar = async (id, dados) => {
    return await Board.findByIdAndUpdate(id, { $set: dados }, { new: true });
  };

  static excluir = async (id) => {
    return await Board.findByIdAndDelete(id);
  };

  static buscarPorAltura = async (alturaMar) => {
    return await Board.find({
      ondaMinima: { $lte: alturaMar },
      ondaMaxima: { $gte: alturaMar },
    });
  };
}

export default BoardService;
