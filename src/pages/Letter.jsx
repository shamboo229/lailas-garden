import { motion } from 'framer-motion';

export default function Letter() {
  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="pt-10 px-6">
      <div className="bg-white p-8 rounded-t-[50px] rounded-b-xl shadow-xl border-t-8 border-rose-400">
        <h2 className="text-2xl font-bold text-rose-600 mb-6 font-serif underline decoration-rose-200">Warkah Buat Awak</h2>
        <div className="space-y-4 text-slate-700 leading-loose text-sm italic">
          <p>Assalamuallaikum Sayang,</p>
          <p>Saya tahu saya tak sempurna. Kadang-kadang saya buat silap tanpa sedar sampai lukakan hati awak.</p>
          <p>Tujuan saya buat website ni bukan sekadar nak nampak "cool", tapi saya nak awak tahu yang saya sanggup luangkan masa untuk buat sesuatu yang boleh buat awak senyum semula.</p>
          <p>Please give us another chance to make things right? I promise to be better.</p>
          <p className="pt-4 font-bold text-right">— Dari Saya Yang Sayangkan Awak</p>
        </div>
      </div>
    </motion.div>
  );
}
