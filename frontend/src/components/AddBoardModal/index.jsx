import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import api from "../../services/api";
import IconClose from "../IconClose";
import IconUpload from "../IconUpload";
import IconSurfboard from "../IconSurfboard";
import IconChevronDown from "../IconChevronDown";

// Board sizes list
const BOARD_SIZES = [
  "5'0\"",
  "5'2\"",
  "5'4\"",
  "5'5\"",
  "5'6\"",
  "5'7\"",
  "5'8\"",
  "5'9\"",
  "5'10\"",
  "5'11\"",
  "6'0\"",
  "6'1\"",
  "6'2\"",
  "6'3\"",
  "6'4\"",
  "6'5\"",
  "6'6\"",
  "6'8\"",
  "6'10\"",
  "7'0\"",
  "7'2\"",
  "7'4\"",
  "7'6\"",
  "7'8\"",
  "7'10\"",
  "8'0\"",
  "8'6\"",
  "9'0\"",
  "9'2\"",
  "9'4\"",
  "9'6\"",
  "10'0\"",
  "10'6\"",
  "11'0\"",
];

// Board styles list
const BOARD_STYLES = [
  { value: "shortboard", label: "Shortboard" },
  { value: "fish", label: "Fish" },
  { value: "longboard", label: "Longboard" },
  { value: "funboard", label: "Funboard" },
  { value: "gun", label: "Gun" },
  { value: "softboard", label: "Softboard" },
];

export default function AddBoardModal({
  isOpen,
  onClose,
  onBoardAdded,
  prancha,
}) {
  const [nome, setNome] = useState("");
  const [estilo, setEstilo] = useState("shortboard");
  const [litragem, setLitragem] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [ondaMinima, setOndaMinima] = useState("");
  const [ondaMaxima, setOndaMaxima] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState(null);
  const [loading, setLoading] = useState(false);

  const ehEdicao = !!prancha;

  // Preenche os campos automaticamente quando a janela abre em modo Edição
  useEffect(() => {
    if (isOpen) {
      if (ehEdicao) {
        setNome(prancha.nome || "");
        setEstilo(prancha.estilo || "shortboard");
        setLitragem(prancha.litragem || "");
        setTamanho(prancha.tamanho || "");
        setOndaMinima(prancha.ondaMinima || "");
        setOndaMaxima(prancha.ondaMaxima || "");
        setDescricao(prancha.descricao || "");
        setImagem(null);
      } else {
        setNome("");
        setEstilo("shortboard");
        setLitragem("");
        setTamanho("");
        setOndaMinima("");
        setOndaMaxima("");
        setDescricao("");
        setImagem(null);
      }
    }
  }, [isOpen, prancha, ehEdicao]);

  if (!isOpen) return null;

  async function handleAddBoard(e) {
    e.preventDefault();

    if (!tamanho) {
      alert("Please select the board size.");
      return;
    }

    setLoading(true);

    const dadosParaEnviar = new FormData();
    dadosParaEnviar.append("nome", nome);
    dadosParaEnviar.append("estilo", estilo);
    dadosParaEnviar.append("tamanho", tamanho);
    dadosParaEnviar.append("descricao", descricao);
    dadosParaEnviar.append("litragem", Number(litragem));
    dadosParaEnviar.append("ondaMinima", Number(ondaMinima));
    dadosParaEnviar.append("ondaMaxima", Number(ondaMaxima));

    if (imagem) {
      dadosParaEnviar.append("imagem", imagem);
    }

    try {
      if (ehEdicao) {
        await api.put(`/boards/${prancha._id}`, dadosParaEnviar, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Board updated successfully!");
      } else {
        await api.post("/boards", dadosParaEnviar, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Board added successfully!");
      }

      if (onBoardAdded) onBoardAdded();
      onClose();
    } catch (erro) {
      console.error("Error during registration:", erro);
      const mensagemErro =
        erro.response?.data?.message ||
        "Error registering board. Please try again.";
      alert(mensagemErro);
    } finally {
      setLoading(false);
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <form
        onSubmit={handleAddBoard}
        className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/50 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/50 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-slate-800/90 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4 rounded-t-3xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
                <IconSurfboard />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">New Board</h2>
                <p className="text-xs text-slate-500">Add to your quiver</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-200"
            >
              <IconClose />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Name and Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Board Name
              </label>
              <input
                required
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                placeholder="e.g. Pyzel Ghost"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Style
              </label>
              <div className="relative">
                <select
                  value={estilo}
                  onChange={(e) => setEstilo(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all appearance-none cursor-pointer"
                >
                  {BOARD_STYLES.map((style) => (
                    <option
                      key={style.value}
                      value={style.value}
                      className="bg-slate-800 text-white"
                    >
                      {style.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <IconChevronDown />
                </div>
              </div>
            </div>
          </div>

          {/* Size and Volume */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Size
              </label>
              <div className="relative">
                <select
                  required
                  value={tamanho}
                  onChange={(e) => setTamanho(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option
                    value=""
                    disabled
                    className="bg-slate-800 text-slate-500"
                  >
                    Select size
                  </option>
                  {BOARD_SIZES.map((size) => (
                    <option
                      key={size}
                      value={size}
                      className="bg-slate-800 text-white"
                    >
                      {size}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <IconChevronDown />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Volume (L)
              </label>
              <input
                required
                type="number"
                step="0.1"
                value={litragem}
                onChange={(e) => setLitragem(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all no-spinner"
                placeholder="e.g. 28.5"
              />
            </div>
          </div>

          {/* Wave Range */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Ideal Wave Range (meters)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                  Min
                </span>
                <input
                  required
                  type="number"
                  step="0.5"
                  value={ondaMinima}
                  onChange={(e) => setOndaMinima(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all no-spinner"
                  placeholder="0.5"
                />
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                  Max
                </span>
                <input
                  required
                  type="number"
                  step="0.5"
                  value={ondaMaxima}
                  onChange={(e) => setOndaMaxima(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all no-spinner"
                  placeholder="2.0"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Description
            </label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows="3"
              className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none"
              placeholder="Board details, ideal conditions..."
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Image
            </label>
            <label className="flex flex-col items-center justify-center w-full h-32 bg-slate-900/30 border-2 border-dashed border-slate-600/50 rounded-xl cursor-pointer hover:border-cyan-500/50 hover:bg-slate-900/50 transition-all group">
              <div className="flex flex-col items-center justify-center text-slate-500 group-hover:text-cyan-400 transition-colors">
                <IconUpload />
                <p className="mt-2 text-sm">
                  {imagem ? imagem.name : "Click to select an image"}
                </p>
              </div>
              <input
                type="file"
                onChange={(e) => setImagem(e.target.files[0])}
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-900/90 backdrop-blur-sm border-t border-slate-700/50 px-6 py-4 flex justify-end gap-3 rounded-b-3xl">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/50 font-medium transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 disabled:from-slate-600 disabled:to-slate-700 text-slate-900 disabled:text-slate-400 font-semibold py-2.5 px-6 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:shadow-none transition-all duration-300"
          >
            {loading ? "Saving..." : "Add Board"}
          </button>
        </div>
      </form>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .no-spinner::-webkit-outer-spin-button,
        .no-spinner::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .no-spinner {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>,
    document.body,
  );
}
