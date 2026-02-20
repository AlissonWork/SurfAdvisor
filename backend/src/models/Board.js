import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  nome: { type: String, required: [true, "The surfboard name is required."] },
  estilo: {
    type: String,
    required: [true, "The style of the surfboard is required."],
    enum: {
      values: ["shortboard", "fish", "longboard", "funboard", "gun"],
      message: "{VALUE} not valid.",
    },
  },
  litragem: { type: Number },
  ondaMinima: { type: Number, required: true },
  ondaMaxima: { type: Number, required: true },
  descricao: { type: String },
});

const Board = mongoose.model("Board", boardSchema);

export default Board;
