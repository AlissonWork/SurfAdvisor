import User from "../models/User.js";
import Boards from "../models/Board.js";
import NaoEncontrado from "../error/NaoEncontrado.js";

class userController {
  static listarUsers = async (req, res, next) => {
    try {
      const listaUsers = await User.find();
      res.status(200).json(listaUsers);
    } catch (error) {
      next(error);
    }
  };

  static listarUserPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const userResultado = await User.findById(id);

      if (userResultado !== null) {
        const pranchas = await Boards.find({ usuario: id }).select(
          "id nome estilo litragem tamanho ondaMinima ondaMaxima descricao",
        );
        res.status(200).json({ ...userResultado.toObject(), boards: pranchas });
      } else {
        next(new NaoEncontrado("User not found"));
      }
    } catch (error) {
      next(error);
    }
  };

  static cadastratarUser = async (req, res, next) => {
    try {
      const user = new User(req.body);
      const userResultado = await user.save();
      res.status(201).json(userResultado);
    } catch (error) {
      next(error);
    }
  };

  static atualizarUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      const userResultado = await User.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true },
      );
      if (userResultado !== null) {
        res.status(200).json({ message: "User updated", data: userResultado });
      } else {
        next(new NaoEncontrado("User not found"));
      }
    } catch (error) {
      next(error);
    }
  };

  static deletarUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      const userResultado = await User.findByIdAndDelete(id);
      if (userResultado !== null) {
        res.status(200).json({ message: "User deleted" });
      } else {
        next(new NaoEncontrado("User not found"));
      }
    } catch (error) {
      next(error);
    }
  };
}

export default userController;
