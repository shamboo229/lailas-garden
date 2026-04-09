import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home as HomeIcon, Gamepad2, Mail, ChevronRight, Volume2 } from 'lucide-react';

// --- SOUND UTILITY ---
const playSound = (type) => {
  const sounds = {
    pop: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3",
    win: "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3",
    woosh: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
  };
  const audio = new Audio(sounds[type]);
  audio.volume = 0.4;
  audio.play().catch(() => console.log("Audio blocked. Click first!"));
};

// --- BACKGROUND: DENSE CHERRIES ---
const CherryBackground = () => {
  const cherryCount = 30;
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(cherryCount)].map((_, i) => {
        const size = Math.random() * (40 - 20) + 20;
        const left = Math.random() * 100;
        const duration = Math.random() * (12 - 6) + 6;
        const delay = Math.random() * 10;
        return (
          <div key={i} className="cherry-float"
            style={{
              left: `${left}%`, fontSize: `${size}px`,
              animationDuration: `${duration}s`, animationDelay: `-${delay}s`,
              opacity: Math.random() * (1 - 0.4) + 0.4
            }}>🍒</div>
        );
      })}
    </div>
  );
};

// --- GAME: CUTE QUIZ ---
const CuteQuiz = () => {
  const [step, setStep] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const questions = [
    { q: "Siapa orang paling comel dalam hidup saya?", a: ["Laila ✨", "Mestilah Laila 🍒", "Laila Forever ❤️"] },
    { q: "Kalau saya masak untuk awak, awak makan tak?", a: ["Makan je la..", "Makan dengan gembira!", "Tapau bawa balik"] },
    { q: "Antara Ceri dan Sayang, mana lagi manis?", a: ["Ceri 🍒", "Sayang ❤️", "Dua-dua!"] },
    { q: "Berapa banyak saya sayang awak hari ni?", a: ["Sikit", "Banyak gila!", "Infinite + 1"] },
    { q: "Boleh tak saya nak ada dengan awak sampai tua?", a: ["Boleh sangat!", "Mestilah!", "Confirm!"] }
  ];

  const handleAnswer = () => {
    playSound('pop');
    if (step < questions.length - 1) setStep(step + 1);
    else { playSound('win'); setShowFinal(true); }
  };

  return (
    <div className="p-8 text-center glass-menu rounded-[2.5rem] w-full max-w-sm">
      {!showFinal ? (
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <p className="text-sm font-bold mb-8 leading-relaxed">{questions[step].q}</p>
          <div className="flex flex-col gap-3">
            {questions[step].a.map((ans, i) => (
              <button key={i} onClick={handleAnswer} className="bg-white border-2 border-pink-200 text-pink-500 py-4 rounded-2xl text-[11px] font-bold hover:bg-pink-500 hover:text-white transition-all shadow-sm">
                {ans}
              </button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-xl font-black text-pink-600 mb-2">SCORE: 100%!</h3>
          <p className="text-[11px] text-slate-500 italic">"Awak lulus! Awak memang pemilik hati saya selamanya."</p>
        </motion.div>
      )}
    </div>
  );
};

// --- GAME: FORGIVENESS ---
const ForgivenessGame = () => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [solved, setSolved] = useState(false);

  const moveNo = () => {
    playSound('woosh');
    setNoPos({ x: Math.random() * 240 - 120, y: Math.random() * 240 - 120 });
    setYesScale(s => Math.min(s + 0.35, 4));
  };

  const handleWin = () => {
    playSound('win');
    setSolved(true);
  };

  return (
    <div className="flex flex-col items-center w-full px-4">
      {!solved ? (
        <div className="text-center w-full min-h-[400px] flex flex-col justify-center">
          <h2 className="text-lg font-black mb-12 text-[#4a0e1e]">AWAK MAAFKAN <br/> SAYA TAK? 🥺</h2>
          <div className="relative w-full flex items-center justify-center">
            <motion.button style={{ scale: yesScale }} onClick={handleWin} className="bg-[#ff4d6d] text-white px-10 py-5 rounded-full font-bold shadow-2xl z-20 whitespace-nowrap">
              YA, DAH MAAFKAN ❤️
            </motion.button>
            <motion.button animate={{ x: noPos.x, y: noPos.y }} onMouseEnter={moveNo} onClick={moveNo} className="absolute bg-white/40 text-slate-400 px-6 py-3 rounded-full text-[10px] border border-white/50 backdrop-blur-md">
              TIDAK... 🙊
            </motion.button>
          </div>
        </div>
      ) : (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center bg-white p-10 rounded-[3rem] shadow-2xl border-4 border-pink-100">
          <div className="text-8xl mb-6">🍒🌸✨</div>
          <h2 className="text-2xl font-black text-pink-600 mb-4 tracking-tighter uppercase">Success!</h2>
          <p className="text-xs text-slate-500 italic">"Terima kasih sayang! I love you sooo much!"</p>
        </motion.div>
      )}
    </div>
  );
};

// --- MENU & NAVIGATION ---
const ArcadeMenu = () => {
  const [activeGame, setActiveGame] = useState(null);
  const games = [
    { id: 'maaf', title: 'Boss Level', icon: '💝', comp: <ForgivenessGame /> },
    { id: 'quiz', title: 'Love Quiz', icon: '📝', comp: <CuteQuiz /> }
  ];

  return (
    <div className="pt-24 px-6 pb-32 flex flex-col items-center min-h-screen">
      <AnimatePresence mode="wait">
        {!activeGame ? (
          <motion.div key="menu" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-sm space-y-4">
            <h2 className="text-center font-black text-pink-500 mb-8 tracking-widest text-sm uppercase">Arcade Mode</h2>
            {games.map(g => (
              <button key={g.id} onClick={() => { playSound('pop'); setActiveGame(g); }} className="glass-menu w-full p-6 rounded-[2rem] flex items-center gap-6 active:scale-95 transition-all">
                <span className="text-4xl">{g.icon}</span>
                <div className="text-left">
                  <p className="font-black text-xs uppercase tracking-tight">{g.title}</p>
                </div>
                <ChevronRight className="ml-auto text-pink-200" size={20} />
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div key="game" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full flex flex-col items-center">
            <button onClick={() => { playSound('pop'); setActiveGame(null); }} className="mb-10 text-[9px] font-bold bg-white text-pink-500 border border-pink-100 px-6 py-2 rounded-full shadow-sm uppercase tracking-widest">
              ← Return
            </button>
            {activeGame.comp}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MAIN WRAPPER ---
export default function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <CherryBackground />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-28 px-10 text-center flex flex-col items-center">
              <motion.div animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 4 }} className="text-[120px] mb-8">🍒</motion.div>
              <h1 className="text-4xl font-black text-[#4a0e1e] mb-2 tracking-tighter uppercase">Welcome.</h1>

              <button onClick={() => playSound('pop')} className="flex items-center gap-2 mb-8 bg-white/50 px-4 py-2 rounded-full text-[9px] font-bold border border-white uppercase tracking-widest text-pink-500 shadow-sm">
                <Volume2 size={14} /> Enable Sound
              </button>

              <div className="glass-menu p-8 rounded-[2.5rem]">
                <p className="text-[12px] italic leading-loose text-slate-600">"I made this little universe just for you. Every cherry falling represents how much I care."</p>
              </div>
            </motion.div>
          } />
          <Route path="/arcade" element={<ArcadeMenu />} />
          <Route path="/letter" element={
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-28 px-8">
              <div className="glass-menu p-8 rounded-[3rem] border-t-[12px] border-pink-400 shadow-2xl relative text-center">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-6xl">💌</div>
                <h2 className="font-black text-xs mb-8 mt-4 tracking-widest text-pink-500 uppercase">Warkah Ikhlas</h2>
                <div className="text-[12px] leading-loose space-y-6 italic text-slate-700 text-left">
                  <p>Haii Laila Sayang,</p>
                  <p>Saya betul-betul minta maaf. Saya tak nak awak jauh lagi. Saya bina website ni sebab saya nak awak tahu yang awak sangat istimewa bagi saya.</p>
                  <p>Please... beri saya satu peluang lagi?</p>
                  <p className="text-right mt-10 font-black not-italic text-pink-500 uppercase text-xs">I Love You, Forever. ❤️</p>
                </div>
              </div>
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>

      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[85%] max-w-sm glass-menu rounded-full p-2 flex justify-around z-50">
        <Link to="/" onClick={() => playSound('pop')} className="p-4 text-slate-400 hover:text-pink-500 transition-colors"><HomeIcon size={24} /></Link>
        <Link to="/arcade" onClick={() => playSound('pop')} className="p-4 text-slate-400 hover:text-pink-500 transition-colors"><Gamepad2 size={24} /></Link>
        <Link to="/letter" onClick={() => playSound('pop')} className="p-4 text-slate-400 hover:text-pink-500 transition-colors"><Mail size={24} /></Link>
      </nav>
    </div>
  );
}
