import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { 
  Heart, 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  Clock, 
  Search,
  Sparkles,
  ClipboardList
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentRoute: PageRoute;
  selectedPetId?: string | null;
  favoritesCount: number;
  applicationsCount: number;
  onNavigate: (route: PageRoute, petId?: string) => void;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  favoritesCount,
  applicationsCount,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home' as PageRoute, label: '首頁', icon: '🏠' },
    { id: 'pets' as PageRoute, label: '認養專區', icon: '🐾' },
    { id: 'process' as PageRoute, label: '認養須知', icon: '📖' },
    { 
      id: 'applications' as PageRoute, 
      label: '我的申請與收藏', 
      icon: '💖',
      badge: favoritesCount + applicationsCount
    },
    { id: 'about' as PageRoute, label: '關於我們', icon: '🌱' },
    { id: 'contact' as PageRoute, label: '聯絡我們', icon: '📞' },
  ];

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Notification / Hotline Strip */}
      <div className="bg-slate-900/80 backdrop-blur-md text-amber-100 text-xs py-1.5 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-2 font-medium border-b border-white/10 relative z-20">
        <div className="flex items-center gap-4 text-xs sm:text-sm">
          <span className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-orange-400" />
            認養專線：<a href="tel:0800888929" className="hover:underline font-bold text-orange-300">0800-888-929</a>
          </span>
          <span className="hidden md:flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            開放參觀：週二至週日 10:00 - 18:00
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1 bg-white/10 px-2.5 py-0.5 rounded-full text-[11px] text-amber-200 backdrop-blur-sm border border-white/10">
            <Sparkles className="w-3 h-3 text-orange-300" /> 終生陪伴 ‧ 不離不棄
          </span>
          <a 
            href="#/contact" 
            onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
            className="hover:text-orange-300 flex items-center gap-1 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5" /> 園區據點
          </a>
        </div>
      </div>

      {/* Main Header Bar */}
      <div 
        className={`bg-white/40 backdrop-blur-md border-b border-white/50 transition-all duration-300 ${
          scrolled ? 'shadow-md py-2.5 bg-white/60' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Brand Name */}
          <a
            href="#/"
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20"
            >
              <span className="text-2xl">🐾</span>
            </motion.div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent tracking-tight">
                  PawHaven
                </span>
                <span className="text-xs bg-white/80 text-orange-600 font-bold px-2 py-0.5 rounded-full border border-orange-200 shadow-xs backdrop-blur-sm">
                  認養家園
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                讓每個生命遇見溫暖的家
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/60 backdrop-blur-lg p-1.5 rounded-2xl border border-white/60 shadow-sm">
            {navItems.map((item) => {
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-600 hover:text-orange-600 hover:bg-white/50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl shadow-md"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 text-base">{item.icon}</span>
                  <span className="relative z-10">{item.label}</span>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`relative z-10 ml-0.5 text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center shadow-xs ${
                      isActive ? 'bg-white text-rose-600' : 'bg-rose-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Callout Button (Desktop) */}
          <div className="hidden sm:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNavClick('pets')}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-orange-400 to-rose-400 text-white font-bold text-sm shadow-lg shadow-orange-200/50 hover:shadow-orange-300 flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>尋找命定毛孩</span>
              <span className="text-base">🐶</span>
            </motion.button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('applications')}
              className="relative p-2 rounded-xl bg-amber-100 text-amber-900 text-sm font-bold flex items-center justify-center"
              aria-label="查看收藏與申請"
            >
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              {(favoritesCount > 0 || applicationsCount > 0) && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount + applicationsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-amber-200/70 text-amber-900 hover:bg-amber-200 focus:outline-none"
              aria-label="選單"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-amber-50/98 border-b border-amber-200 shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              <div className="text-xs font-bold text-amber-700/70 uppercase tracking-wider px-2 mb-1">
                導覽功能選單
              </div>

              {navItems.map((item) => {
                const isActive = currentRoute === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-amber-200/80 text-amber-950 font-bold shadow-xs'
                        : 'text-amber-900 hover:bg-amber-100/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {item.badge} 個項目
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-3 border-t border-amber-200/80 mt-2">
                <button
                  onClick={() => handleNavClick('pets')}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-center shadow-md flex items-center justify-center gap-2"
                >
                  <span>瀏覽全部待認養毛孩</span>
                  <span>🐾</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
