import UserServices from "../services/UserServices.js";
import NaoEncontrado from "../error/NaoEncontrado.js";
import RequisicaoIncorreta from "../error/RequisicaoIncorreta.js";
import ErroBase from "../error/ErroBase.js";

class UserController {
  static listarUsers = async (req, res, next) => {
    try {
      const listaUsers = await UserServices.listarUsuarios();
      res.status(200).json(listaUsers);
    } catch (error) {
      next(error);
    }
  };

  static listarUserPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const userResultado = await UserServices.bucarUsuarioPorId(id);

      if (userResultado) {
        res.status(200).json(userResultado);
      } else {
        next(new NaoEncontrado("User not found"));
      }
    } catch (error) {
      next(error);
    }
  };

  static cadastrarUser = async (req, res, next) => {
    try {
      const userResultado = await UserServices.criarUser(req.body);
      res.status(201).json(userResultado);
    } catch (error) {
      next(error);
    }
  };

  static atualizarUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      const userResultado = await UserServices.atualizarUser(id, req.body);
      if (userResultado !== null) {
        res.status(200).json({ message: "User updated", data: userResultado });
      } else {
        next(new NaoEncontrado("User not found"));
      }
    } catch (error) {
      next(error);
    }
  };

  static excluirUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      const userResultado = await UserServices.excluirUser(id);
      if (userResultado !== null) {
        res.status(200).json({ message: "User deleted" });
      } else {
        next(new NaoEncontrado("User not found"));
      }
    } catch (error) {
      next(error);
    }
  };

  static login = async (req, res, next) => {
    try {
      const {email, password} = req.body;

      if (!email || !password) {
        return next(new RequisicaoIncorreta("Email and password are required"));
      }

      const token = await UserServices.autenticar(email, password);

      if(!token) {
        return next(new ErroBase("Invalid email or password", 401));
      }else {
        res.status(200).json({ token });
      }

    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
