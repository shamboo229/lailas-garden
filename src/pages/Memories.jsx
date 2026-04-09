import { motion } from 'framer-motion';

export default function Memories() {
  // You can replace these URLs with your own photos later!
  const photos = [
    { url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500', caption: 'Kenangan 1' },
    { url: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=500', caption: 'Kenangan 2' },
    { url: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=500', caption: 'Kenangan 3' },
    { url: 'https://images.unsplash.com/photo-1516589174184-c685266d4af4?w=500', caption: 'Kenangan 4' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-10 px-4 pb-10"
    >
      <h2 className="text-2xl font-bold text-rose-600 mb-6 text-center">Gallery Kita ✨</h2>
      <div className="grid grid-cols-2 gap-3">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            whileTap={{ scale: 0.95 }}
            className="relative aspect-square bg-white p-2 rounded-2xl shadow-md border border-rose-100 overflow-hidden"
          >
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-full object-cover rounded-xl"
            />
          </motion.div>
        ))}
      </div>
      <p className="text-center text-slate-400 text-xs mt-6 italic">
        "Setiap gambar ada cerita, dan saya nak buat lebih banyak cerita dengan awak."
      </p>
    </motion.div>
  );
}
