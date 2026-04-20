import { useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import api from "../../services/api";
import { BOARD_STYLES_INFO } from "../../data/boardStylesData.js";
import BoardStyleCard from "../../components/BoardStyleCard/index.jsx";

const SPOTS = [
  { value: "praia_do_futuro", label: "Praia do Futuro (Fortaleza)" },
  { value: "titanzinho", label: "Titanzinho (Fortaleza)" },
  { value: "taiba", label: "Taíba" },
  { value: "paracuru", label: "Paracuru" },
  { value: "jericoacoara", label: "Jericoacoara" },
  { value: "leste_oeste", label: "Leste Oeste (Fortaleza)" },
  { value: "praia_de_iracema", label: "Praia de Iracema (Fortaleza)" },
];

export default function SmartMatch() {
  const [selectedSpot, setSelectedSpot] = useState("praia_do_futuro");
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState("");

  const scrollContainerRef = useRef(null);

  const scrollCards = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  async function getRecommendation() {
    setLoading(true);
    setError("");
    setRecommendation(null);

    try {
      const response = await api.get(
        `/boards/recomendacao?pico=${selectedSpot}`,
      );
      setRecommendation(response.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Error fetching recommendation. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950">
      <Navbar />

      <main className="p-6 md:p-10 max-w-6xl mx-auto mt-8">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-4">
            AI Powered
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Smart{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
              Match
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Select your surf spot. We analyze real-time ocean data and your
            skill level to pick the perfect board from your quiver.
          </p>
        </div>

        <div className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="w-full md:w-2/3">
              <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">
                Select Spot
              </label>
              <select
                value={selectedSpot}
                onChange={(e) => setSelectedSpot(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all cursor-pointer appearance-none"
              >
                {SPOTS.map((spot) => (
                  <option key={spot.value} value={spot.value}>
                    {spot.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full pt-6 md:w-1/3 flex items-end">
              <button
                onClick={getRecommendation}
                disabled={loading}
                className="w-full h-[52px] mt-auto bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 disabled:from-slate-700 disabled:to-slate-800 disabled:text-slate-500 text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="animate-pulse">Analyzing Ocean...</span>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Check Forecast
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="min-h-[200px] mb-16">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center">
              {error}
            </div>
          )}

          {recommendation && !loading && (
            <div className="bg-gradient-to-b from-cyan-950/40 to-slate-900/40 border border-cyan-900/50 rounded-3xl p-6 md:p-8 animate-fade-in-up">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-6 border-b border-slate-700/50 gap-4">
                <div className="text-center md:text-left">
                  <p className="text-slate-400 text-sm uppercase tracking-widest mb-1">
                    Current Condition at {recommendation.local || "Spot"}
                  </p>
                  <p className="text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                    <span className="text-cyan-400 text-4xl">≈</span>{" "}
                    {recommendation.condicaoMar}
                  </p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-slate-400 text-sm uppercase tracking-widest mb-1">
                    Surfer Profile
                  </p>
                  <p className="text-white font-medium capitalize">
                    {recommendation.surfista} • {recommendation.nivel} •{" "}
                    {recommendation.peso}kg
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">✓</span> Recommended Boards
              </h3>

              {recommendation.suggestions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recommendation.suggestions.map((board) => (
                    <div
                      key={board._id}
                      className="bg-slate-800/80 border border-slate-600/50 rounded-2xl p-4 hover:border-cyan-500/50 transition-all flex gap-4 items-center group cursor-default"
                    >
                      <div className="w-20 h-24 sm:w-24 sm:h-28 flex-shrink-0 bg-slate-900 rounded-xl overflow-hidden relative border border-slate-700/50 group-hover:border-cyan-500/30 transition-colors">
                        {board.imagem ? (
                          <img
                            src={`http://localhost:3000/${board.imagem}`}
                            alt={board.nome}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-600">
                            <svg
                              className="w-6 h-6 mb-1 opacity-50"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              ></path>
                            </svg>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4
                            className="text-base sm:text-lg font-bold text-white leading-tight truncate pr-2"
                            title={board.nome}
                          >
                            {board.nome}
                          </h4>
                        </div>

                        <span className="inline-block text-[10px] sm:text-xs font-semibold bg-cyan-500/15 text-cyan-400 px-2 py-0.5 rounded-full uppercase tracking-wider mb-2">
                          {board.estilo}
                        </span>

                        <div className="text-slate-300 text-xs sm:text-sm space-y-0.5">
                          <p>
                            Size:{" "}
                            <span className="text-white font-medium">
                              {board.tamanho}
                            </span>
                          </p>
                          <p>
                            Volume:{" "}
                            <span className="text-white font-medium">
                              {board.litragem}L
                            </span>
                          </p>
                          <p className="text-slate-400 text-[11px] sm:text-xs mt-1 truncate">
                            Ideal: {board.ondaMinima}m to {board.ondaMaxima}m
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-800/50 border border-orange-500/20 rounded-2xl p-8 text-center">
                  <p className="text-orange-400 text-lg mb-2">
                    No perfect match found!
                  </p>
                  <p className="text-slate-400 text-sm">
                    Based on your {recommendation.peso}kg weight and{" "}
                    {recommendation.nivel} skill level, none of your boards are
                    ideal for {recommendation.condicaoMar} waves. Time to buy a
                    new one?
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <section className="mt-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">
              Board{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                Styles Guide
              </span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Learn about each board style and find the perfect match for your
              skill level and wave conditions.
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => scrollCards("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-slate-800/90 hover:bg-cyan-500/20 border border-slate-600/50 hover:border-cyan-500/50 rounded-full flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all shadow-lg backdrop-blur-sm -translate-x-1/2 md:-translate-x-6"
              aria-label="Previous"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => scrollCards("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-slate-800/90 hover:bg-cyan-500/20 border border-slate-600/50 hover:border-cyan-500/50 rounded-full flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all shadow-lg backdrop-blur-sm translate-x-1/2 md:translate-x-6"
              aria-label="Next"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div className="px-8 md:px-12">
              <div
                ref={scrollContainerRef}
                className="flex gap-5 overflow-x-auto py-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
              >
                {BOARD_STYLES_INFO.map((style) => (
                  <BoardStyleCard key={style.id} style={style} />
                ))}
                <div className="flex-shrink-0 w-1" aria-hidden="true" />
              </div>
            </div>

            <div className="flex justify-center gap-1 mt-2">
              <span className="text-slate-500 text-xs">
                Swipe or use buttons to navigate
              </span>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
