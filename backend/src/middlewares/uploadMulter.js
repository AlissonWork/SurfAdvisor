import { upload } from "../utils/multer.js";

function uploadMulter(req, res, next) {
  const uploadSingle = upload.single("imagem");
  uploadSingle(req, res, function (erro) {
    if (erro) {
      return next(erro);
    }
    next();
  });
}

export default uploadMulter;
