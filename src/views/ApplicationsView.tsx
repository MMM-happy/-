import React, { useState } from 'react';
import { Pet, AdoptionApplication, PageRoute } from '../types';
import { 
  Heart, 
  ClipboardList, 
  Sparkles, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  PhoneCall,
  XCircle
} from 'lucide-react';
import { motion } from 'motion/react';

interface ApplicationsViewProps {
  applications: AdoptionApplication[];
  favorites: string[];
  allPets: Pet[];
  onToggleFavorite: (petId: string) => void;
  onOpenAdoptModal: (pet: Pet) => void;
  onSelectPetDetail: (petId: string) => void;
  onNavigate: (route: PageRoute) => void;
}

export const ApplicationsView: React.FC<ApplicationsViewProps> = ({
  applications,
  favorites,
  allPets,
  onToggleFavorite,
  onOpenAdoptModal,
  onSelectPetDetail,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'applications' | 'favorites'>('applications');

  const favoritePets = allPets.filter(p => favorites.includes(p.id));

  const statusConfig = {
    pending: { label: '初審進行中', bg: 'bg-amber-100 text-amber-900 border-amber-300', icon: Clock },
    interviewing: { label: '已預約電話訪談', bg: 'bg-blue-100 text-blue-900 border-blue-300', icon: PhoneCall },
    approved: { label: '審核通過！預約見面', bg: 'bg-emerald-100 text-emerald-900 border-emerald-300', icon: CheckCircle2 },
    rejected: { label: '未通過審核', bg: 'bg-slate-100 text-slate-700 border-slate-300', icon: XCircle },
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" /> 個人追蹤中心
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            我的認養申請與收藏紀錄 💖
          </h1>
          <p className="text-amber-100 text-xs sm:text-sm mt-1">
            隨時掌握送出的認養意願單處理進度與您收藏關注的可愛毛孩。
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-black/20 backdrop-blur-md p-1.5 rounded-2xl w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('applications')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'applications'
                ? 'bg-white text-amber-950 shadow-md'
                : 'text-amber-100 hover:text-white'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>已遞交申請 ({applications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'favorites'
                ? 'bg-white text-amber-950 shadow-md'
                : 'text-amber-100 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>愛心收藏 ({favorites.length})</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'applications' ? (
        /* Applications Tab */
        <div className="space-y-4">
          {applications.length === 0 ? (
            <div className="bg-white rounded-3xl border border-amber-200 p-12 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                📝
              </div>
              <h3 className="text-xl font-extrabold text-amber-950">
                您尚未遞交任何認養申請單
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                前往「認養專區」尋找心儀的狗狗貓貓，在卡片上點擊「我想認養」即可填表！
              </p>
              <button
                onClick={() => onNavigate('pets')}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer"
              >
                前往認養專區 🐾
              </button>
            </div>
          ) : (
            applications.map((app) => {
              const status = statusConfig[app.status] || statusConfig.pending;
              const StatusIcon = status.icon;

              return (
                <div
                  key={app.id}
                  className="bg-white rounded-3xl border border-amber-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-100 pb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={app.petPhoto}
                        alt={app.petName}
                        className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-amber-200"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-black text-amber-950">{app.petName}</span>
                          <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold">
                            {app.petBreed}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          申請編號：<span className="font-mono text-amber-900 font-bold">{app.id}</span> ‧ 遞交日期：{app.createdAt}
                        </div>
                      </div>
                    </div>

                    <div className={`self-start sm:self-auto px-3.5 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${status.bg}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span>{status.label}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200/60 text-slate-700">
                    <div>
                      <span className="font-bold text-amber-900">申請人：</span>
                      <span>{app.applicantName} ({app.phone})</span>
                    </div>
                    <div>
                      <span className="font-bold text-amber-900">居住縣市：</span>
                      <span>{app.city} ({app.housingType})</span>
                    </div>
                    <div>
                      <span className="font-bold text-amber-900">家中寵物：</span>
                      <span>{app.hasPets}</span>
                    </div>
                  </div>

                  {app.reason && (
                    <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
                      <span className="font-bold text-slate-800">給毛孩的話：</span>
                      <span>"{app.reason}"</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-amber-800/80">
                      如有疑問請致電志工專線 0800-888-929 並告知申請單號。
                    </span>
                    <button
                      onClick={() => onSelectPetDetail(app.petId)}
                      className="text-orange-600 hover:underline font-bold flex items-center gap-1"
                    >
                      <span>檢視此毛孩資料</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* Favorites Tab */
        <div>
          {favoritePets.length === 0 ? (
            <div className="bg-white rounded-3xl border border-amber-200 p-12 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto text-3xl">
                💖
              </div>
              <h3 className="text-xl font-extrabold text-amber-950">
                您尚未收藏任何毛孩
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                在瀏覽寵物時，點擊愛心按鈕即可加入我的收藏，方便您比較與隨時查看！
              </p>
              <button
                onClick={() => onNavigate('pets')}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer"
              >
                尋找喜愛的毛孩 🐾
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoritePets.map((pet) => (
                <div
                  key={pet.id}
                  className="bg-white rounded-3xl border border-amber-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-amber-100">
                    <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => onToggleFavorite(pet.id)}
                      className="absolute top-3 right-3 p-2 bg-rose-500 text-white rounded-full shadow-md cursor-pointer hover:bg-rose-600"
                      title="移除收藏"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-black text-amber-950">{pet.name}</h3>
                      <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                        {pet.breed}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {pet.personalityDesc}
                    </p>

                    <div className="pt-2 border-t border-amber-100 flex items-center gap-2">
                      <button
                        onClick={() => onSelectPetDetail(pet.id)}
                        className="flex-1 py-2 rounded-xl border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-50"
                      >
                        詳細背景
                      </button>
                      <button
                        onClick={() => onOpenAdoptModal(pet)}
                        className="flex-1 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-xs hover:from-amber-600 hover:to-orange-600"
                      >
                        我想認養
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
