import axios from "axios";
import { picosCeara } from "../utils/PicosCeara.js";

class WeatherService {
  static async obterAlturaOnda(chavePico) {
    const pico = picosCeara[chavePico];

    if (!pico) {
      throw new Error(`Pico ${chavePico} não encontrado.`);
    }

    try {
      const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${pico.lat}&longitude=${pico.lon}&hourly=wave_height`;

      const resposta = await axios.get(url);
      const dados = resposta.data;

      const horaAtualIso = new Date().toISOString().slice(0, 14) + "00";
      const indexHoraAtual = dados.hourly.time.findIndex((tempo) =>
        tempo.startsWith(horaAtualIso),
      );

      const indexSeguro = indexHoraAtual !== -1 ? indexHoraAtual : 0;

      const alturaOndaAtual = dados.hourly.wave_height[indexSeguro];
      return {
        pico: pico.nome,
        altura: alturaOndaAtual,
      };
    } catch (error) {
      console.error("Erro ao buscar dados na Open-Meteo:", error);
      throw new Error("Não foi possível obter a previsão do mar no momento.");
    }
  }
}

export default WeatherService;
