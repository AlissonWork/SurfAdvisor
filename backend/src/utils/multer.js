import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  // Diz para onde a foto vai
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  
  // Cria um nome único para a foto não sobrescrever outra
  filename: function (req, file, cb) {
    const extensao = path.extname(file.originalname);
    // Criando o nome impossível de repetir
    const nomeUnico = Date.now() + "-" + Math.round(Math.random() * 1E9) + extensao;
    cb(null, nomeUnico);
  }
});

export const upload = multer({ storage: storage });
