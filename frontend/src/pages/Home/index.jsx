import { useState, useEffect } from "react";
import api from "../../services/api";

function Home() {
  const [pranchas, setPranchas] = useState([]);

  useEffect(() => {
    async function buscarPranchas() {
      try {
        const response = await api.get("/boards");
        setPranchas(response.data);
      } catch (erro) {
        console.error("Erro ao buscar pranchas:", erro);
      }
    }
    buscarPranchas();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 p-6 md:p-10">
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Surf<span className="text-cyan-400">Advisor</span>
        </h1>
        <p className="mt-2 text-slate-400 text-lg">
          Todas as pranchas cadastradas no sistema.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {pranchas.map((prancha) => (
          <div
            key={prancha._id}
            className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
          >
            {prancha.imagem && (
              <div className="overflow-hidden">
                <img
                  src={`http://localhost:3000/${prancha.imagem}`}
                  alt={prancha.nome}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            <div className="p-5">
              <h2 className="text-xl font-semibold text-white mb-3">
                {prancha.nome}
              </h2>
              
              <span className="inline-block px-3 py-1 text-sm font-medium bg-cyan-500/20 text-cyan-400 rounded-full mb-3">
                {prancha.estilo}
              </span>
              
              <div className="flex items-center gap-4 text-slate-400 text-sm">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  {prancha.tamanho}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  {prancha.litragem}L
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pranchas.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">Nenhuma prancha encontrada.</p>
        </div>
      )}
    </div>
  );
}

export default Home;