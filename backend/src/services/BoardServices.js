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
    const fatores = {
      beginner: 0.5,
      intermediate: 0.4,
      advanced: 0.35,
      pro: 0.33,
    };

    const fatorIdeal = fatores[usuario.nivel];
    const litragemAlvo = fatorIdeal * usuario.peso;

    const prancha = await Board.find({
      usuario: usuarioId,
      ondaMinima: { $lte: alturaMar },
      ondaMaxima: { $gte: alturaMar },
    });

    const recomendadasPorLitragem = prancha.filter((board) => {
      return (
        board.litragem >= litragemAlvo * 0.9 &&
        board.litragem <= litragemAlvo * 1.1
      );
    });

    const recomendacoesFinais = recomendadasPorLitragem.filter((board) => {
      const estilo = board.estilo.toLowerCase();

      if (alturaMar >= 1.5) {
        const estilosProibidos = ["longboard", "funboard", "softboard"];
        return !estilosProibidos.includes(estilo);
      }

      if (alturaMar <= 0.5) {
        const estilosProibidos = ["gun", "shortboard"];
        return !estilosProibidos.includes(estilo);
      }

      if (alturaMar > 0.5 && alturaMar < 1.5) {
        const estilosProibidos = ["gun", "softboard"];
        return !estilosProibidos.includes(estilo);
      }

      return true;
    });

    return {
      surfista: usuario.nome,
      nivel: usuario.nivel,
      peso: usuario.peso,
      litragemIdeal: litragemAlvo.toFixed(1),
      condicaoMar: `${alturaMar}m`,
      suggestions: recomendacoesFinais,
    };
  };
}

export default BoardService;
