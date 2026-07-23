import React from 'react';
import { Pet } from '../types';
import { Heart, Sparkles, CheckCircle2, ShieldAlert, ArrowRight, Eye, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface PetCardProps {
  pet: Pet;
  isFavorite: boolean;
  onToggleFavorite: (petId: string) => void;
  onOpenAdoptModal: (pet: Pet) => void;
  onSelectPetDetail: (petId: string) => void;
}

export const PetCard: React.FC<PetCardProps> = ({
  pet,
  isFavorite,
  onToggleFavorite,
  onOpenAdoptModal,
  onSelectPetDetail,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-5 shadow-xl flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300"
    >
      {/* Photo Container */}
      <div 
        className="relative h-56 sm:h-60 w-full overflow-hidden rounded-[2rem] bg-orange-100/60 cursor-pointer" 
        onClick={() => onSelectPetDetail(pet.id)}
      >
        <img
          src={pet.photo}
          alt={pet.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {/* Urgent Badge / Type Badge */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md flex items-center gap-1 ${
              pet.type === 'dog' 
                ? 'bg-orange-500/90 text-white' 
                : 'bg-rose-500/90 text-white'
            }`}>
              <span>{pet.type === 'dog' ? '🐶 狗狗' : '🐱 貓咪'}</span>
            </span>

            {pet.urgentAdoption && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-sm animate-pulse flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> 急尋溫馨家
              </span>
            )}
          </div>

          {/* Favorite Heart Button */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(pet.id);
            }}
            className={`pointer-events-auto p-2.5 rounded-full backdrop-blur-md shadow-md transition-all duration-200 cursor-pointer ${
              isFavorite 
                ? 'bg-rose-500 text-white' 
                : 'bg-white/90 text-slate-600 hover:text-rose-500 hover:bg-white'
            }`}
            aria-label="收藏愛心"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
          </motion.button>
        </div>

        {/* Floating Gender & Location tag on bottom of photo */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-medium drop-shadow-md pointer-events-none">
          <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
            {pet.shelterLocation}
          </span>
          <span className={`px-2.5 py-1 rounded-full font-bold flex items-center gap-1 backdrop-blur-md border ${
            pet.gender === 'male'
              ? 'bg-blue-600/80 text-white border-blue-400/30'
              : 'bg-pink-600/80 text-white border-pink-400/30'
          }`}>
            {pet.gender === 'male' ? '♂️ 公' : '♀️ 母'} ‧ {pet.age}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="mt-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Name & Breed */}
          <div className="flex items-baseline justify-between mb-2">
            <h3 
              onClick={() => onSelectPetDetail(pet.id)}
              className="text-2xl font-bold text-slate-800 hover:text-orange-600 cursor-pointer transition-colors"
            >
              {pet.name}
            </h3>
            <span className="text-xs font-bold text-orange-600 bg-orange-100/80 px-2.5 py-1 rounded-full border border-orange-200">
              {pet.breed}
            </span>
          </div>

          {/* Personality Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {pet.personality.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="bg-white/80 text-slate-700 border border-slate-200/80 text-xs px-2.5 py-0.5 rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Short Personality Description */}
          <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-3 bg-white/50 backdrop-blur-sm p-2.5 rounded-2xl border border-white/80">
            {pet.personalityDesc}
          </p>

          {/* Health Status Summary Checklist */}
          <div className="bg-teal-50/70 border border-teal-200/80 rounded-2xl p-2.5 mb-4 text-xs text-teal-900 space-y-1">
            <div className="font-bold flex items-center gap-1 text-teal-800 text-[11px] mb-1 uppercase tracking-wide">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> 健康檢查紀錄
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-teal-800 font-medium">
              <span>✓ 疫苗：{pet.vaccineDone ? '已施打完畢' : '部分完成'}</span>
              <span>✓ 絕育：{pet.neutered ? '已完成手術' : '待安排'}</span>
              <span>✓ 晶片：{pet.microchipped ? '已植入晶片' : '帶回時植入'}</span>
              <span>✓ 驅蟲：體內外驅蟲OK</span>
            </div>
          </div>
        </div>

        {/* Card Action Buttons */}
        <div className="pt-2 border-t border-slate-200/60 flex items-center gap-2">
          {/* Detail Button */}
          <button
            onClick={() => onSelectPetDetail(pet.id)}
            className="px-3.5 py-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-orange-200 text-slate-700 hover:text-orange-600 hover:bg-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>詳細背景</span>
          </button>

          {/* "我想認養" Primary Action Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpenAdoptModal(pet)}
            className="flex-1 py-2.5 px-3 rounded-2xl bg-gradient-to-r from-orange-400 to-rose-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-200/50 hover:shadow-orange-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>我想認養 {pet.name}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
