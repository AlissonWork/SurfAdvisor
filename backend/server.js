import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./src/routes/index.js";
import dns from "node:dns/promises";
import "dotenv/config";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.STRING_CONEXAO_DB)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((error) => console.error("Erro ao conectar", error));

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

;
routes(app);

app.listen(PORT, () => {
  console.log(`🚀 Servidor voando na porta ${PORT}`);
});
