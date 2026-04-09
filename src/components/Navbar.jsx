import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { pathname } = useLocation();
  const menu = [
    { path: '/', label: 'HOME', icon: '🏠' },
    { path: '/memories', label: 'MEMO', icon: '📸' },
    { path: '/arcade', label: 'PLAY', icon: '🕹️' },
    { path: '/letter', label: 'LOVE', icon: '💌' },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-sm bg-white border-4 border-[#551c31] rounded-lg pixel-shadow flex justify-around p-1 z-50">
      {menu.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link key={item.path} to={item.path} className="relative p-3 flex flex-col items-center gap-1">
            {isActive && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 border-4 border-dashed border-rose-400 -z-10"
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              />
            )}
            <span className={`text-2xl ${isActive ? 'animate-pixel-float' : ''}`}>{item.icon}</span>
            <span className={`text-[7px] font-black ${isActive ? 'text-rose-500' : 'text-slate-500'}`}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
