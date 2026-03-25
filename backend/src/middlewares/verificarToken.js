import jwt from "jsonwebtoken";
import ErroBase from "../error/ErroBase.js";

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new ErroBase("Token not provided.", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        return next(new ErroBase("Invalid token.", 401));
      }
      req.user = user;
      next();
    });
  } catch {
    next(new ErroBase("Token verification failed.", 401));
  }
}

export default verificarToken;
