import User from "../models/User.js";
import Boards from "../models/Board.js";

class UserServices {
  static listarUsuarios = async () => {
    return await User.find();
  };

  static bucarUsuarioPorId = async (id) => {
    const userResultado = await User.findById(id);

    if (!userResultado) {
      return null;
    }

    const pranchas = await Boards.find({ usuario: id }).select(
      "id nome estilo litragem tamanho ondaMinima ondaMaxima descricao",
    );

    return {
      ...userResultado.toObject(),
      boards: pranchas,
    };
  };

  static criarUser = async (dados) => {
    const user = new User(dados);
    return await user.save();
  };

  static atualizarUser = async (id, dados) => {
    return await User.findByIdAndUpdate(id, {$set: dados}, {new: true});
  };

  static excluirUser = async (id) => {
    return await User.findByIdAndDelete(id);
  };
}

export default UserServices;
