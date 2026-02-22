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
  litragem: { type: Number, required:[true, "The volume of the surfboard is required"] },
  tamanho: {type: String, required: [true, "5´11, 6´0..."]},
  ondaMinima: { type: Number, required: true },
  ondaMaxima: { type: Number, required: true },
  descricao: { type: String },
  usuario:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuarios",
    required: [true, "The user is required."]
  }
});

const Board = mongoose.model("boards", boardSchema);

export default Board;
