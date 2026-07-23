import React from 'react';
import { SHELTER_INFO } from '../data/petsData';
import { PageRoute } from '../types';
import { Phone, Mail, MapPin, Clock, Heart, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (route: PageRoute) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white/40 backdrop-blur-md text-slate-700 pt-12 pb-8 border-t border-white/50 overflow-hidden mt-16 z-10">
      {/* Decorative Ribbon */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-orange-400 via-rose-400 to-amber-400" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Banner Message */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-6 mb-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-400 to-rose-400 flex items-center justify-center text-white text-2xl shrink-0 shadow-md">
              🐶
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                以領養代替購買 ‧ 用愛終結流浪
              </h3>
              <p className="text-slate-600 text-sm mt-0.5">
                每一隻等待認養的毛孩都有獨一無二的故事，邀請您來園區與牠們親密互動！
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNav('pets')}
            className="px-6 py-3 bg-gradient-to-r from-orange-400 to-rose-400 text-white font-bold rounded-2xl shadow-lg shadow-orange-200/50 hover:shadow-orange-300 shrink-0 text-sm flex items-center gap-2 cursor-pointer transition-all"
          >
            <span>立即預約現場看毛孩</span>
            <Heart className="w-4 h-4 fill-white" />
          </motion.button>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 flex items-center justify-center text-white text-xl shadow-md">
                🐾
              </div>
              <span className="text-xl font-black bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent tracking-tight">
                {SHELTER_INFO.name}
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {SHELTER_INFO.slogan}
            </p>
            <div className="flex items-center gap-2 text-xs bg-white/80 text-slate-700 border border-slate-200 p-3 rounded-2xl shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>合法立案流浪動物收容機構 ‧ 100% 醫療與健康保證</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-slate-800 font-bold text-base mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-500" /> 快速導覽
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 font-medium">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-orange-600 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span>•</span> 園區首頁 (Home)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('pets')} className="hover:text-orange-600 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span>•</span> 狗狗貓貓認養專區 (Pets)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('process')} className="hover:text-orange-600 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span>•</span> 認養條件與 5 步驟流程 (Guide)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('applications')} className="hover:text-orange-600 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span>•</span> 我的認養申請進度 (Tracker)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-orange-600 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span>•</span> 志工招募與物資捐贈 (Support)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-slate-800 font-bold text-base mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4 text-rose-500" /> 聯絡資訊
            </h4>
            <ul className="space-y-3 text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900">{SHELTER_INFO.phone}</div>
                  <div className="text-xs text-slate-500">免費認養諮詢與客服</div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                <span className="break-all text-slate-600">{SHELTER_INFO.email}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                <span className="text-slate-600">{SHELTER_INFO.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                <span className="text-slate-600">{SHELTER_INFO.hours}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Shelter Locations */}
          <div>
            <h4 className="text-slate-800 font-bold text-base mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" /> 全台園區據點
            </h4>
            <div className="space-y-2.5 text-xs">
              {SHELTER_INFO.locations.map((loc, idx) => (
                <div key={idx} className="bg-white/60 backdrop-blur-md p-3 rounded-2xl border border-white/80 shadow-xs">
                  <div className="font-bold text-slate-800 flex items-center justify-between">
                    <span>{loc.name}</span>
                    <span className="text-orange-600">{loc.phone}</span>
                  </div>
                  <div className="text-slate-500 mt-0.5">{loc.address}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PawHaven 寵物溫馨認養家園. All Rights Reserved. 終生陪伴不離不棄。</p>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('process')} className="hover:text-orange-600 cursor-pointer">認養須知</button>
            <span>•</span>
            <button onClick={() => handleNav('contact')} className="hover:text-orange-600 cursor-pointer">交通資訊</button>
            <span>•</span>
            <button onClick={() => handleNav('about')} className="hover:text-orange-600 cursor-pointer">隱私權條款</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
