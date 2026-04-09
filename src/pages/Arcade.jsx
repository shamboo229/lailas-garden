import { useState } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../utils/sounds';

export default function Arcade() {
  const [noProps, setNoProps] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [yesScale, setYesScale] = useState(1);

  const moveNo = () => {
    playSound('move');
    const newX = Math.random() * 200 - 100;
    const newY = Math.random() * 200 - 100;
    setNoProps({ x: newX, y: newY });
    // Every time she tries to click NO, the YES button gets BIGGER
    setYesScale(prev => prev + 0.2);
  };

  const handleYes = () => {
    playSound('success');
    setIsAccepted(true);
  };

  return (
    <div className="pt-12 px-4 flex flex-col items-center min-h-[80vh]">
      {!isAccepted ? (
        <motion.div
          initial={{ scale: 0.5 }} animate={{ scale: 1 }}
          className="pixel-box p-8 w-full max-w-sm text-center"
        >
          <div className="text-5xl mb-6 animate-bounce">🥺</div>
          <h2 className="text-sm mb-10 leading-relaxed">AWAK MAAFKAN SAYA TAK?</h2>

          <div className="flex flex-col gap-6 items-center">
            {/* THE YES BUTTON */}
            <motion.button
              style={{ scale: yesScale }}
              onClick={handleYes}
              className="bg-green-400 border-4 border-[#1a3a1a] py-4 px-8 text-white text-xs w-full pixel-shadow active:translate-y-2"
            >
              MESTILAH YA! ❤️
            </motion.button>

            {/* THE RUNAWAY NO BUTTON */}
            <motion.button
              animate={{ x: noProps.x, y: noProps.y }}
              onMouseEnter={moveNo}
              onClick={moveNo} // For mobile touch
              className="bg-rose-500 border-4 border-[#4a0e1e] py-2 px-4 text-white text-[8px] opacity-70"
            >
              TAKNAK 🙊
            </motion.button>
          </div>

          <p className="mt-10 text-[7px] text-slate-400 underline">Tip: Butang 'Taknak' tu pemalu sikit</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1.2 }}
          className="text-center bg-white p-10 border-8 border-green-400 rounded-lg"
        >
          <div className="text-6xl mb-4">💖✨</div>
          <h2 className="text-lg text-green-600 font-black mb-4">MISSION PASSED!</h2>
          <p className="text-[10px] leading-loose text-slate-600">
            Terima kasih sayang! Awaklah <br/> "Player 2" saya selamanya. <br/> Jom kita sambung <br/> "Level" seterusnya!
          </p>
        </motion.div>
      )}
    </div>
  );
}
