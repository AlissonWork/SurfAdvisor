import { useState, useEffect } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import StatCard from "../../components/StatCard";
import BoardCard from "../../components/BoardCard";
import IconPlus from "../../components/IconPlus";
import IconDroplet from "../../components/IconDroplet";
import EmptyState from "../../components/EmptyState";
import IconBoard from "../../components/IconBoard";
import IconWave from "../../components/IconWave";

function Home() {
  const [pranchas, setPranchas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscarPranchas() {
      try {
        const response = await api.get("/boards/usuario");
        setPranchas(response.data);
      } catch (erro) {
        console.error("Erro ao buscar pranchas:", erro);
      } finally {
        setLoading(false);
      }
    }
    buscarPranchas();
  }, []);

  // Calcular estatisticas
  const totalPranchas = pranchas.length;
  const totalLitragem = pranchas.reduce((acc, p) => acc + (p.litragem || 0), 0);
  const estilosUnicos = [...new Set(pranchas.map((p) => p.estilo))].length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950">
      <Navbar />

      <main className="p-6 md:p-10 max-w-7xl mx-auto">
        
        {/* Cabecalho */}
        <header className="mb-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-8">
            <div>
              <p className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-2">
                Board Manager
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                My{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                  Quiver
                </span>
              </h1>
            </div>

            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-900 font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5">
              <IconPlus />
              New Board
            </button>
          </div>

          {/* Cards de Estatisticas */}
          {totalPranchas > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard icon={<IconBoard />} label="Boards" value={totalPranchas} />
              <StatCard icon={<IconDroplet />} label="Total Volume" value={`${totalLitragem}L`} />
              <StatCard icon={<IconWave />} label="Styles" value={estilosUnicos} />
            </div>
          )}
        </header>

        {/* Conteudo Principal */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden animate-pulse">
                <div className="w-full h-56 bg-slate-700/50" />
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-slate-700/50 rounded w-3/4" />
                  <div className="h-4 bg-slate-700/50 rounded w-1/4" />
                  <div className="h-4 bg-slate-700/50 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : pranchas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pranchas.map((prancha) => (
              <BoardCard key={prancha._id} prancha={prancha} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}

export default Home;