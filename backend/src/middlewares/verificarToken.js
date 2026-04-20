import jwt from "jsonwebtoken";
import ErroBase from "../error/ErroBase.js";

const verificarToken = (req, res, next) => {

  const token = req.cookies.token;

  if(!token) {
    return next(new ErroBase("No token provided.", 401));
  }

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decodificado.id };
      return next();
    
  } catch {
    return next(new ErroBase("Token verification failed.", 401));
  }
}

export default verificarToken;
