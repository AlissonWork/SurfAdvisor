import Board from "../models/Board.js";
import User from "../models/User.js";

class BoardService {
  static listarTudo = async () => {
    return await Board.find();
  };

  static buscarPorId = async (id) => {
    return await Board.findById(id).populate("usuario", "nome").exec();
  };

  static criarBoard = async (dados) => {
    const board = new Board(dados);
    return await board.save();
  };

  static atualizar = async (id, dados) => {
    return await Board.findByIdAndUpdate(id, { $set: dados }, { new: true });
  };

  static excluir = async (id) => {
    return await Board.findByIdAndDelete(id);
  };

  static gerarRecomendacaoPersonalizada = async (usuarioId, alturaMar) => {
    const usuario = await User.findById(usuarioId);

    if (!usuario) {
      return null;
    }

    //Fator de litragem baseado no nível de habilidade do usuário
    const matrizLitragem = {
      pro: {
        shortboard: 0.33,
        fish: 0.42,
        funboard: 0.48,
        longboard: 1.05,
        gun: 0.35,
        softboard: 0.5,
      },
      advanced: {
        shortboard: 0.36,
        fish: 0.44,
        funboard: 0.52,
        longboard: 1.15,
        gun: 0.38,
        softboard: 0.55,
      },
      intermediate: {
        shortboard: 0.42,
        fish: 0.48,
        funboard: 0.58,
        longboard: 1.3,
        gun: 0.44,
        softboard: 0.65,
      },
      beginner: {
        shortboard: 0.5,
        fish: 0.55,
        funboard: 0.65,
        longboard: 1.45,
        gun: 0.5,
        softboard: 0.75,
      },
    };

    const prancha = await Board.find({
      usuario: usuarioId,
      ondaMinima: { $lte: alturaMar },
      ondaMaxima: { $gte: alturaMar },
    });

    const recomendacoesFinais = prancha.filter((board) => {
      const estilo = board.estilo.toLowerCase();
      const nivel = usuario.nivel.toLowerCase();

      const fatorDoNivel = matrizLitragem[nivel] || matrizLitragem.intermediate;
      const fatorAplicado = fatorDoNivel[estilo] || fatorDoNivel.shortboard;

      const litragemAlvo = fatorAplicado * usuario.peso;

      const recomendadasPorLitragem =
        board.litragem >= litragemAlvo * 0.9 &&
        board.litragem <= litragemAlvo * 1.1;

      if (!recomendadasPorLitragem) {
        return false;
      }

      //--- LOGS DE TERMINAL ---
      console.log(`\n> Analisando: ${board.nome} (${estilo.toUpperCase()})`);
      console.log(
        `  Litragem: ${board.litragem}L | Alvo p/ Estilo: ${litragemAlvo.toFixed(1)}L`,
      );
      console.log(
        `  Status Litragem: ${recomendadasPorLitragem ? "✅ OK" : "❌ FORA DA MARGEM"}`,
      );

      if (alturaMar >= 1.5) {
        return !["longboard", "funboard", "softboard"].includes(estilo);
      } else if (alturaMar <= 0.5) {
        return !["gun", "shortboard"].includes(estilo);
      } else if (alturaMar > 0.5 && alturaMar < 1.5) {
        return !["gun", "softboard"].includes(estilo);
      }

      return true;
    });

    return {
      surfista: usuario.nome,
      nivel: usuario.nivel,
      peso: usuario.peso,
      condicaoMar: `${alturaMar}m`,
      suggestions: recomendacoesFinais,
    };
  };
}

export default BoardService;
