import React from 'react';
import { Pet, PageRoute, PetType } from '../types';
import { PetCard } from '../components/PetCard';
import { SHELTER_INFO } from '../data/petsData';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  Clock, 
  MapPin, 
  Users, 
  Home as HomeIcon, 
  Award,
  CheckCircle2,
  Smile
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  pets: Pet[];
  favorites: string[];
  onToggleFavorite: (petId: string) => void;
  onOpenAdoptModal: (pet: Pet) => void;
  onSelectPetDetail: (petId: string) => void;
  onNavigate: (route: PageRoute, petTypeFilter?: PetType) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  pets,
  favorites,
  onToggleFavorite,
  onOpenAdoptModal,
  onSelectPetDetail,
  onNavigate,
}) => {
  const urgentPets = pets.filter(p => p.urgentAdoption || p.status === 'available').slice(0, 6);

  const stats = [
    { label: '成功媒合認養毛孩', value: '3,820+', icon: '🐕' },
    { label: '志工夥伴與安居家園', value: '150+', icon: '🤝' },
    { label: '醫療與疫苗贊助率', value: '100%', icon: '💉' },
    { label: '全台服務認養園區', value: '3 大館區', icon: '🏡' },
  ];

  const steps = [
    { num: '01', title: '線上瀏覽毛孩', desc: '詳細查看狗狗貓貓性格、背景故事與完整醫療健康檢測數據。' },
    { num: '02', title: '遞交認養申請', desc: '點擊「我想認養」填寫基本資料、照顧評估與預約園區參觀時間。' },
    { num: '03', title: '志工訪談與互動', desc: '前往園區與毛孩互動，並由專業行為志工評估彼此生活契合度。' },
    { num: '04', title: '帶毛孩回家陪伴', desc: '簽署正則認養契約與免費晶片轉移，開啟溫馨的終生陪伴里程！' },
  ];

  return (
    <div className="space-y-16 pb-12">
      
      {/* Hero Section */}
      <section className="relative pt-6 pb-12 px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-white/80 text-orange-900 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold shadow-xs">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>以領養代替購買 ‧ 給流浪毛孩永遠溫暖的家 🐾</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              每一個生命 <br />
              都值得被 <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">溫柔以待</span> ✨
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              在 PawHaven 認養家園，我們為每隻等待愛的狗狗貓貓提供完整的醫療檢測、預防針施打與性格社會化培育。尋找屬於您的命定毛孩，開啟一段溫馨相伴的幸福光陰。
            </p>

            {/* Quick Category Action Pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => onNavigate('pets')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-400 to-rose-400 text-white font-black text-sm sm:text-base shadow-lg shadow-orange-200/50 hover:shadow-orange-300 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <span>瀏覽全部待認養毛孩 (12+)</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavigate('pets', 'dog')}
                className="px-5 py-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-orange-200 text-slate-800 font-extrabold text-sm hover:bg-white shadow-xs flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>🐶 專看狗狗</span>
              </button>

              <button
                onClick={() => onNavigate('pets', 'cat')}
                className="px-5 py-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-orange-200 text-slate-800 font-extrabold text-sm hover:bg-white shadow-xs flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>🐱 專看貓咪</span>
              </button>
            </div>

            {/* Guarantee Pills */}
            <div className="pt-4 grid grid-cols-3 gap-2 max-w-md mx-auto lg:mx-0 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-1.5 justify-center lg:justify-start bg-white/60 backdrop-blur-md p-2.5 rounded-2xl border border-white/80 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" /> 100% 健康檢測
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start bg-white/60 backdrop-blur-md p-2.5 rounded-2xl border border-white/80 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" /> 晶片疫苗完整
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start bg-white/60 backdrop-blur-md p-2.5 rounded-2xl border border-white/80 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" /> 新手後續輔導
              </div>
            </div>

          </motion.div>

          {/* Hero Right Visual Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Background Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-300 to-rose-300 rounded-[3rem] blur-xl opacity-50 animate-pulse" />

              {/* Main Photo Card Collage */}
              <div className="relative bg-white/60 backdrop-blur-xl p-4 rounded-[2.5rem] border border-white/90 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1000&q=80"
                  alt="Cute Shiba and Cats"
                  className="w-full h-80 sm:h-96 object-cover rounded-[2rem] shadow-md"
                />

                {/* Overlaid Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/85 backdrop-blur-md p-4 rounded-2xl border border-white/90 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center text-xl shadow-md">
                      💖
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-800 text-sm">波波 (BoBo) 尋找家園中</div>
                      <div className="text-xs text-slate-500">赤柴 ‧ 1歲 ‧ 親人可愛討摸摸</div>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectPetDetail('pet-001')}
                    className="px-3.5 py-2 bg-gradient-to-r from-orange-400 to-rose-400 text-white text-xs font-bold rounded-xl hover:shadow-md cursor-pointer transition-all"
                  >
                    看牠故事
                  </button>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Shelter Impact Statistics Counter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 sm:p-10 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-orange-100">
            {stats.map((s, idx) => (
              <div key={idx} className="pt-4 md:pt-0 px-2 space-y-1">
                <div className="text-3xl sm:text-4xl">{s.icon}</div>
                <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent tracking-tight">{s.value}</div>
                <div className="text-xs sm:text-sm text-slate-600 font-bold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured / Urgent Adoption Spotlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-orange-200/60 pb-4">
          <div>
            <div className="text-xs font-extrabold text-orange-600 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-orange-500" /> 命定緣分等著您
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              急尋溫馨家庭 ‧ 待認養毛孩 🐾
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('pets')}
              className="text-sm font-bold text-orange-600 hover:text-rose-600 flex items-center gap-1 group cursor-pointer transition-colors"
            >
              <span>查看全部毛孩 ({pets.length})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Pet Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {urgentPets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              isFavorite={favorites.includes(pet.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenAdoptModal={onOpenAdoptModal}
              onSelectPetDetail={onSelectPetDetail}
            />
          ))}
        </div>
      </section>

      {/* 4-Step Adoption Workflow Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 sm:p-12 shadow-xl space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="bg-orange-100/80 text-orange-700 text-xs font-bold px-3 py-1 rounded-full border border-orange-200">
              透明安心 ‧ 簡單 4 步驟
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              如何完成一趟溫馨的認養之旅？
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              PawHaven 園區協助您從初次相遇到安心帶回家，專業志工團隊隨時為您提供諮詢與後續照護關懷。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <div 
                key={idx}
                className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white/90 shadow-md relative hover:shadow-lg transition-shadow space-y-3"
              >
                <div className="text-3xl font-black text-orange-400 font-mono">
                  {s.num}
                </div>
                <h3 className="text-lg font-extrabold text-slate-800">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => onNavigate('process')}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-400 to-rose-400 text-white font-extrabold text-sm shadow-lg shadow-orange-200/50 hover:shadow-orange-300 cursor-pointer transition-all active:scale-95"
            >
              閱讀完整認養須知與常見問答 FAQ 📖
            </button>
          </div>

        </div>
      </section>

      {/* Adopter Testimonials / Happy Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            認養家庭溫馨反饋 💖
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            聽聽曾經在 PawHaven 遇見命定毛孩的家長們，帶回毛孩後的幸福生活點滴。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/60 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/80 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                alt="Adopter"
                className="w-12 h-12 rounded-full object-cover border-2 border-orange-300 shadow-xs"
              />
              <div>
                <div className="font-extrabold text-slate-800 text-sm">台北 林小姐與「豆豆」</div>
                <div className="text-xs text-orange-600 font-medium">認養柴犬 ‧ 滿一週年</div>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic bg-white/70 p-3.5 rounded-2xl border border-white/80">
              「剛帶豆豆回家時有點緊張，幸好園區給了非常詳細的飼養指南與飲食建議。現在豆豆每天都會到門口迎接我下班，生活多了好多歡笑！」
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/80 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                alt="Adopter"
                className="w-12 h-12 rounded-full object-cover border-2 border-orange-300 shadow-xs"
              />
              <div>
                <div className="font-extrabold text-slate-800 text-sm">台中 張先生與「皮皮」</div>
                <div className="text-xs text-orange-600 font-medium">認養英短 ‧ 認養 6 個月</div>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic bg-white/70 p-3.5 rounded-2xl border border-white/80">
              「皮皮是個超級呼嚕大胃王，志工把他的習慣整理得很清楚。線上認養申請與現場訪談非常親切，讓第一次養貓的我很有安全感！」
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/80 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Adopter"
                className="w-12 h-12 rounded-full object-cover border-2 border-orange-300 shadow-xs"
              />
              <div>
                <div className="font-extrabold text-slate-800 text-sm">高雄 許一家人與「可可」</div>
                <div className="text-xs text-orange-600 font-medium">認養台灣犬 ‧ 認養 2 年</div>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic bg-white/70 p-3.5 rounded-2xl border border-white/80">
              「可可真的好聰明又忠誠，週末我們全家人都會帶牠去郊外露營。感謝 PawHaven 園區照顧出這麼乖巧體貼的孩子！」
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
