import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import routes from "./src/routes/index.js";
import dns from "node:dns/promises";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.STRING_CONEXAO_DB)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((error) => console.error("Erro ao conectar", error));

const app = express();

app.use(cors());

routes(app);

app.listen(PORT, () => {
  console.log(`🚀 Servidor voando na porta ${PORT}`);
});
