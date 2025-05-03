import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';
import { motion } from 'framer-motion';

const gerarNumeros = () => {
  const numeros = new Set();
  while (numeros.size < 15) {
    numeros.add(Math.floor(Math.random() * 25) + 1);
  }
  return Array.from(numeros).sort((a, b) => a - b);
};

export default function OraculoLotofacil() {
  const [jogo, setJogo] = useState([]);
  const [copiado, setCopiado] = useState(false);

  const handleGerar = () => {
    setJogo(gerarNumeros());
    setCopiado(false);
  };

  const copiarParaClipboard = () => {
    navigator.clipboard.writeText(jogo.join(', '));
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black to-zinc-900 text-white p-4">
      <motion.h1 
        className="text-3xl md:text-5xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        Oráculo da Lotofácil 🔮
      </motion.h1>

      <Card className="bg-zinc-800 border-zinc-700 w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <Button onClick={handleGerar} className="w-full bg-purple-600 hover:bg-purple-700">
            Gerar Números da Sorte
          </Button>

          {jogo.length > 0 && (
            <div className="bg-zinc-900 rounded-xl p-4 flex flex-wrap justify-center gap-2 text-lg border border-zinc-700">
              {jogo.map((n, i) => (
                <div key={i} className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-700 text-white">
                  {n.toString().padStart(2, '0')}
                </div>
              ))}
            </div>
          )}

          {jogo.length > 0 && (
            <Button onClick={copiarParaClipboard} variant="outline" className="w-full border-purple-600 text-purple-300">
              <Copy className="mr-2 h-4 w-4" /> {copiado ? 'Copiado!' : 'Copiar jogo'}
            </Button>
          )}

          <a href="https://wa.me/SEUNUMERO" target="_blank" className="block text-center text-sm text-green-400 hover:underline pt-2">
            Receber jogo exclusivo no WhatsApp
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
