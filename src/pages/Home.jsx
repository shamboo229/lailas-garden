import { motion } from 'framer-motion';
import { playSound } from '../utils/sounds';

export default function Home() {
  return (
    <div className="pt-20 px-6 text-center">
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="text-8xl mb-8 inline-block"
      >
        🐱
      </motion.div>

      <h1 className="text-2xl font-black mb-4 tracking-tighter text-[#4a0e1e]">
        LAILA'S <br/> WORLD
      </h1>

      <div className="pixel-box p-6 mb-8 transform -rotate-2">
        <p className="text-[12px] leading-loose">
          "Game ini takkan <br/> lengkap tanpa <br/> awak..."
        </p>
      </div>

      <button
        onClick={() => playSound('click')}
        className="bg-yellow-300 border-4 border-[#4a0e1e] px-6 py-3 text-[10px] font-bold hover:bg-yellow-200 transition-colors"
      >
        TEKAN UNTUK MULA
      </button>
    </div>
  );
}
