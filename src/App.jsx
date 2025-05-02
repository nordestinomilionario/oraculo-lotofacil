import React, { useState } from 'react';
import './index.css';

const gerarNumeros = (quantidadeJogos) => {
  const resultadosMock = [
    3, 7, 8, 10, 11, 13, 14, 15, 17, 18,
    2, 5, 6, 9, 12, 16, 19, 20, 21, 23,
    1, 4, 22, 24, 25
  ];

  const jogos = [];
  for (let i = 0; i < quantidadeJogos; i++) {
    const shuffle = [...resultadosMock].sort(() => 0.5 - Math.random());
    const jogo = shuffle.slice(0, 15).sort((a, b) => a - b);
    jogos.push(jogo);
  }
  return jogos;
};

function App() {
  const [quantidade, setQuantidade] = useState(5);
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const gerarJogos = () => {
    setCarregando(true);
    setTimeout(() => {
      const novosJogos = gerarNumeros(quantidade);
      setJogos(novosJogos);
      setCarregando(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Oráculo da Lotofácil 🔮</h1>
        <p className="mb-4">Gere jogos com base em padrões inteligentes para aumentar suas chances!</p>

        <div className="flex justify-center gap-2 mb-4">
          <input
            type="number"
            className="text-black p-2 rounded w-24"
            value={quantidade}
            onChange={(e) => setQuantidade(parseInt(e.target.value))}
            min={1}
            max={20}
          />
          <button
            onClick={gerarJogos}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Gerar Jogos
          </button>
        </div>

        {carregando && <p className="animate-pulse">🔄 Gerando jogos...</p>}

        <div className="mt-4 grid gap-3">
          {jogos.map((jogo, idx) => (
            <div
              key={idx}
              className="bg-gray-700 p-2 rounded border border-green-500"
            >
              <p>🎰 Jogo {idx + 1}: {jogo.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
