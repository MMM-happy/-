import React, { useState } from 'react';
import { Pet } from '../types';
import { 
  Heart, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Share2, 
  Award, 
  Calendar,
  Activity,
  Smile,
  Zap,
  Brain,
  Volume2,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface PetDetailViewProps {
  pet: Pet;
  allPets: Pet[];
  isFavorite: boolean;
  onToggleFavorite: (petId: string) => void;
  onOpenAdoptModal: (pet: Pet) => void;
  onSelectPetDetail: (petId: string) => void;
  onBackToPets: () => void;
}

export const PetDetailView: React.FC<PetDetailViewProps> = ({
  pet,
  allPets,
  isFavorite,
  onToggleFavorite,
  onOpenAdoptModal,
  onSelectPetDetail,
  onBackToPets,
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const images = pet.galleryImages && pet.galleryImages.length > 0 
    ? pet.galleryImages 
    : [pet.photo];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const relatedPets = allPets
    .filter(p => p.id !== pet.id && (p.type === pet.type || p.breed === pet.breed))
    .slice(0, 3);

  const traitLabels = [
    { key: 'friendliness', label: '親人討摸度', icon: Smile, color: 'bg-amber-500' },
    { key: 'energy', label: '精力活力值', icon: Zap, color: 'bg-orange-500' },
    { key: 'intelligence', label: '聰明學習力', icon: Brain, color: 'bg-emerald-500' },
    { key: 'quietness', label: '安靜程度', icon: Volume2, color: 'bg-blue-500' },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Breadcrumb & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onBackToPets}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 bg-white/70 backdrop-blur-md border border-white/80 px-4 py-2 rounded-xl shadow-xs hover:bg-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-orange-500" />
            <span>返回認養列表</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <span className="cursor-pointer hover:underline hover:text-orange-600" onClick={onBackToPets}>認養專區</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span>{pet.type === 'dog' ? '狗狗' : '貓咪'}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-900">{pet.name}</span>
          </div>
        </div>

        {/* Main Pet Detail Card */}
        <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/80 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Col: Photo Gallery (5 cols) */}
            <div className="lg:col-span-5 p-6 bg-white/40 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-white/60 flex flex-col justify-between">
              <div>
                {/* Main Large Image */}
                <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden shadow-md bg-orange-100 group">
                  <img
                    src={images[selectedPhotoIndex] || pet.photo}
                    alt={pet.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${
                      pet.type === 'dog' ? 'bg-orange-500' : 'bg-rose-500'
                    }`}>
                      {pet.type === 'dog' ? '🐶 狗狗' : '🐱 貓咪'}
                    </span>
                    {pet.urgentAdoption && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow-md animate-pulse">
                        急尋家 🐾
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onToggleFavorite(pet.id)}
                    className={`absolute top-3 right-3 p-3 rounded-full backdrop-blur-md shadow-md cursor-pointer transition-all ${
                      isFavorite ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-700 hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
                  </button>
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedPhotoIndex(idx)}
                        className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                          selectedPhotoIndex === idx
                            ? 'border-orange-500 ring-2 ring-orange-200'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Specs Grid */}
              <div className="mt-6 pt-6 border-t border-slate-200/60 grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-white/90 shadow-xs">
                  <div className="text-slate-500 font-bold">園區地點</div>
                  <div className="font-extrabold text-slate-800 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    {pet.shelterLocation}
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-white/90 shadow-xs">
                  <div className="text-slate-500 font-bold">體型重量</div>
                  <div className="font-extrabold text-slate-800 mt-0.5">
                    {pet.size === 'small' ? '小型' : pet.size === 'medium' ? '中型' : '大型'} ‧ {pet.weight}
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-white/90 shadow-xs">
                  <div className="text-slate-500 font-bold">入園日期</div>
                  <div className="font-extrabold text-slate-800 mt-0.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-orange-500" />
                    {pet.arrivalDate}
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-white/90 shadow-xs">
                  <div className="text-slate-500 font-bold">認養狀態</div>
                  <div className="font-extrabold text-emerald-600 mt-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    開放認養中
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Detailed Specs & Story (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                {/* Header Title */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-orange-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        {pet.name}
                      </h1>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                        pet.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'
                      }`}>
                        {pet.gender === 'male' ? '♂️ 公' : '♀️ 母'}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-orange-600 mt-1">
                      {pet.breed} ‧ {pet.age} 歲齡
                    </p>
                  </div>

                  <button
                    onClick={handleShare}
                    className="px-3.5 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200 text-slate-800 text-xs font-bold hover:bg-white flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Share2 className="w-4 h-4 text-orange-500" />
                    <span>{copiedLink ? '已複製分頁連結！' : '分享此毛孩'}</span>
                  </button>
                </div>

                {/* Personality Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {pet.personality.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-white/80 text-orange-800 border border-orange-200 text-xs font-extrabold px-3.5 py-1 rounded-full shadow-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Story Paragraph */}
                <div className="mt-6">
                  <h3 className="text-base font-extrabold text-slate-800 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    【背後救援與生命故事】
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white/90 shadow-xs">
                    {pet.story}
                  </p>
                </div>

                {/* Personality Traits Rating Bars */}
                <div className="mt-6">
                  <h3 className="text-base font-extrabold text-slate-800 mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-orange-500" />
                    【性格指數測量】
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white/90 shadow-xs">
                    {traitLabels.map((item) => {
                      const score = pet.traits[item.key as keyof typeof pet.traits] || 3;
                      const IconComp = item.icon;
                      return (
                        <div key={item.key} className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-slate-700">
                            <span className="flex items-center gap-1">
                              <IconComp className="w-3.5 h-3.5 text-orange-500" />
                              {item.label}
                            </span>
                            <span className="text-orange-600">{score} / 5</span>
                          </div>
                          <div className="w-full bg-slate-200/80 h-2.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${item.color} rounded-full transition-all duration-500`}
                              style={{ width: `${(score / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Health Record Checklist */}
                <div className="mt-6">
                  <h3 className="text-base font-extrabold text-slate-800 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    【完整健康與醫療紀錄】
                  </h3>
                  <div className="bg-emerald-50/80 backdrop-blur-md border border-emerald-200/80 rounded-2xl p-4 text-xs space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-emerald-950 font-bold">
                      <div className="bg-white/90 p-2 rounded-xl border border-emerald-200/60 text-center">
                        <span className="block text-[10px] text-emerald-700">預防針疫苗</span>
                        <span>{pet.vaccineDone ? '已施打完成 ✓' : '施打中'}</span>
                      </div>
                      <div className="bg-white/90 p-2 rounded-xl border border-emerald-200/60 text-center">
                        <span className="block text-[10px] text-emerald-700">絕育手術</span>
                        <span>{pet.neutered ? '已絕育 ✓' : '待安排'}</span>
                      </div>
                      <div className="bg-white/90 p-2 rounded-xl border border-emerald-200/60 text-center">
                        <span className="block text-[10px] text-emerald-700">晶片登記</span>
                        <span>{pet.microchipped ? '已植晶片 ✓' : '認養時植入'}</span>
                      </div>
                      <div className="bg-white/90 p-2 rounded-xl border border-emerald-200/60 text-center">
                        <span className="block text-[10px] text-emerald-700">驅蟲計畫</span>
                        <span>體內外OK ✓</span>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed pt-1">
                      {pet.healthDetails}
                    </p>
                  </div>
                </div>

                {/* Compatible Home Environment Tags */}
                {pet.compatibleWith && pet.compatibleWith.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-extrabold text-slate-800 mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-orange-500" />
                      相處與相容建議
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {pet.compatibleWith.map((c, i) => (
                        <span key={i} className="bg-white/80 text-slate-800 border border-slate-200 text-xs font-bold px-3 py-1 rounded-xl shadow-xs">
                          ✓ {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Action Buttons Section */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenAdoptModal(pet)}
                  className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-400 to-rose-400 text-white font-extrabold text-base shadow-lg shadow-orange-200/50 hover:shadow-orange-300 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  <span>我想認養 {pet.name} (填寫申請表)</span>
                </motion.button>

                <button
                  onClick={() => onToggleFavorite(pet.id)}
                  className={`w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-sm border flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                    isFavorite 
                      ? 'bg-rose-500 text-white border-rose-500 shadow-md' 
                      : 'bg-white/80 backdrop-blur-md border-slate-200 text-slate-800 hover:bg-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
                  <span>{isFavorite ? '已加入收藏' : '加入收藏'}</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Related Pets Bottom Bar */}
        {relatedPets.length > 0 && (
          <div className="pt-6">
            <h3 className="text-xl font-extrabold text-slate-900 mb-4 flex items-center justify-between">
              <span>看看其他類似的呆萌毛孩 🐾</span>
              <button 
                onClick={onBackToPets}
                className="text-xs text-orange-600 hover:underline font-bold cursor-pointer"
              >
                查看全部
              </button>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPets.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelectPetDetail(p.id)}
                  className="bg-white/60 backdrop-blur-xl p-3.5 rounded-2xl border border-white/80 shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-3"
                >
                  <img src={p.photo} alt={p.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div>
                    <div className="font-extrabold text-slate-800 text-sm">{p.name}</div>
                    <div className="text-xs text-slate-500">{p.breed} ‧ {p.age}</div>
                    <div className="text-[11px] text-orange-600 font-bold mt-1">
                      {p.gender === 'male' ? '公' : '母'} ({p.shelterLocation})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
