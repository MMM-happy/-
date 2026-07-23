import React, { useState, useMemo } from 'react';
import { Pet, PetType, FilterState } from '../types';
import { PetCard } from '../components/PetCard';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Grid, 
  List, 
  Sparkles, 
  Heart, 
  CheckCircle2, 
  Eye, 
  AlertCircle 
} from 'lucide-react';
import { motion } from 'motion/react';

interface PetsViewProps {
  pets: Pet[];
  favorites: string[];
  initialType?: PetType;
  onToggleFavorite: (petId: string) => void;
  onOpenAdoptModal: (pet: Pet) => void;
  onSelectPetDetail: (petId: string) => void;
}

export const PetsView: React.FC<PetsViewProps> = ({
  pets,
  favorites,
  initialType = 'all',
  onToggleFavorite,
  onOpenAdoptModal,
  onSelectPetDetail,
}) => {
  const [filterState, setFilterState] = useState<FilterState>({
    type: initialType,
    ageGroup: 'all',
    gender: 'all',
    urgentOnly: false,
    search: '',
    sortBy: 'default',
  });

  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      // Type Filter
      if (filterState.type !== 'all' && pet.type !== filterState.type) {
        return false;
      }

      // Gender Filter
      if (filterState.gender !== 'all' && pet.gender !== filterState.gender) {
        return false;
      }

      // Age Group Filter
      if (filterState.ageGroup !== 'all' && pet.ageGroup !== filterState.ageGroup) {
        return false;
      }

      // Urgent Only Filter
      if (filterState.urgentOnly && !pet.urgentAdoption) {
        return false;
      }

      // Keyword Search
      if (filterState.search.trim()) {
        const q = filterState.search.toLowerCase().trim();
        const matchName = pet.name.toLowerCase().includes(q);
        const matchBreed = pet.breed.toLowerCase().includes(q);
        const matchLocation = pet.shelterLocation.toLowerCase().includes(q);
        const matchPersonality = pet.personality.some(p => p.toLowerCase().includes(q));
        if (!matchName && !matchBreed && !matchLocation && !matchPersonality) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'urgent') {
        return (b.urgentAdoption ? 1 : 0) - (a.urgentAdoption ? 1 : 0);
      }
      if (filterState.sortBy === 'youngest') {
        const ageRank = { puppy: 1, adult: 2, senior: 3 };
        return ageRank[a.ageGroup] - ageRank[b.ageGroup];
      }
      return 0;
    });
  }, [pets, filterState]);

  const handleResetFilters = () => {
    setFilterState({
      type: 'all',
      ageGroup: 'all',
      gender: 'all',
      urgentOnly: false,
      search: '',
      sortBy: 'default',
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Title */}
      <div className="bg-gradient-to-r from-orange-400 via-rose-400 to-amber-400 rounded-[2.5rem] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-100" /> 認養代替購買 ‧ 尋找命定夥伴
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            待認養毛孩專區 🐾
          </h1>
          <p className="text-amber-50 text-xs sm:text-sm font-medium">
            共有 <span className="font-bold underline text-white">{pets.length}</span> 隻狗狗與貓咪在園區等待溫馨家庭，所有毛孩皆完成預防針施打與健康檢查。
          </p>
        </div>

        {/* Subtle Watermark */}
        <div className="absolute right-4 bottom-2 text-8xl opacity-15 pointer-events-none select-none">
          🐶🐱
        </div>
      </div>

      {/* Primary Category Filter Tabs (全部 / 狗狗 / 貓咪) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/60 backdrop-blur-xl p-3.5 rounded-[2rem] border border-white/80 shadow-md">
        
        {/* All / Dog / Cat Pills */}
        <div className="flex items-center gap-1.5 bg-white/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/80 w-full sm:w-auto">
          {[
            { id: 'all' as PetType, label: '全部毛孩', icon: '🐾', count: pets.length },
            { id: 'dog' as PetType, label: '狗狗專區', icon: '🐶', count: pets.filter(p => p.type === 'dog').length },
            { id: 'cat' as PetType, label: '貓咪專區', icon: '🐱', count: pets.filter(p => p.type === 'cat').length },
          ].map((tab) => {
            const isActive = filterState.type === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterState({ ...filterState, type: tab.id })}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-400 to-rose-400 text-white shadow-md'
                    : 'text-slate-700 hover:bg-white/80'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/30 text-white' : 'bg-orange-100 text-orange-800 font-bold'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Layout Mode & Urgent Filter Toggle */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          
          <button
            onClick={() => setFilterState({ ...filterState, urgentOnly: !filterState.urgentOnly })}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
              filterState.urgentOnly
                ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                : 'bg-white/80 backdrop-blur-md border-orange-200 text-slate-700 hover:bg-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>只看急尋家 ({pets.filter(p => p.urgentAdoption).length})</span>
          </button>

          <div className="flex items-center gap-1 bg-white/60 p-1 rounded-xl border border-white/80">
            <button
              onClick={() => setLayoutMode('grid')}
              className={`p-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                layoutMode === 'grid' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="網格卡片檢視"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayoutMode('list')}
              className={`p-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                layoutMode === 'list' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="條列清單檢視"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Secondary Search Bar & Detailed Filters */}
      <div className="bg-white/60 backdrop-blur-xl p-5 rounded-[2rem] border border-white/80 shadow-md space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          
          {/* Keyword Search Field (5 cols) */}
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-orange-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜尋毛孩名稱、品種、個性標籤 (例: 柴犬, 活潑, 波波)"
              value={filterState.search}
              onChange={(e) => setFilterState({ ...filterState, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-xs sm:text-sm bg-white/80 backdrop-blur-md"
            />
          </div>

          {/* Gender Filter (2 cols) */}
          <div className="lg:col-span-2">
            <select
              value={filterState.gender}
              onChange={(e) => setFilterState({ ...filterState, gender: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 text-xs sm:text-sm bg-white/80 font-medium text-slate-800"
            >
              <option value="all">性別：不限</option>
              <option value="male">♂️ 性別：公毛孩</option>
              <option value="female">♀️ 性別：母毛孩</option>
            </select>
          </div>

          {/* Age Group Filter (2 cols) */}
          <div className="lg:col-span-2">
            <select
              value={filterState.ageGroup}
              onChange={(e) => setFilterState({ ...filterState, ageGroup: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 text-xs sm:text-sm bg-white/80 font-medium text-slate-800"
            >
              <option value="all">年齡：不限</option>
              <option value="puppy">幼年 (未滿 1 歲)</option>
              <option value="adult">成年 (1 ~ 4 歲)</option>
              <option value="senior">高齡/熟齡 (5 歲以上)</option>
            </select>
          </div>

          {/* Sort By (2 cols) */}
          <div className="lg:col-span-2">
            <select
              value={filterState.sortBy}
              onChange={(e) => setFilterState({ ...filterState, sortBy: e.target.value as any })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 text-xs sm:text-sm bg-white/80 font-medium text-slate-800"
            >
              <option value="default">排序：預設推薦</option>
              <option value="urgent">優先顯示急尋家</option>
              <option value="youngest">年齡最小優先</option>
            </select>
          </div>

          {/* Reset Filters (1 col) */}
          <div className="lg:col-span-1">
            <button
              onClick={handleResetFilters}
              className="w-full py-2.5 px-3 rounded-xl border border-orange-200 bg-white/80 hover:bg-white text-orange-600 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
              title="重設所有篩選"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重置</span>
            </button>
          </div>

        </div>

        {/* Results Counter & Active Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 text-xs text-slate-600">
          <div>
            顯示 <span className="font-extrabold text-orange-600 text-sm">{filteredPets.length}</span> 隻符合條件的待認養毛孩
          </div>

          {(filterState.type !== 'all' || filterState.gender !== 'all' || filterState.ageGroup !== 'all' || filterState.search || filterState.urgentOnly) && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-slate-500">已套用條件：</span>
              {filterState.type !== 'all' && <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-md font-bold">{filterState.type === 'dog' ? '狗狗' : '貓咪'}</span>}
              {filterState.gender !== 'all' && <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-md font-bold">{filterState.gender === 'male' ? '公' : '母'}</span>}
              {filterState.urgentOnly && <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md font-bold">急尋家</span>}
              {filterState.search && <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-md font-bold">搜尋: "{filterState.search}"</span>}
            </div>
          )}
        </div>

      </div>

      {/* Main Results Display */}
      {filteredPets.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-amber-200 p-12 text-center space-y-4 max-w-lg mx-auto my-12 shadow-sm">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto text-3xl">
            🐶
          </div>
          <h3 className="text-xl font-extrabold text-amber-950">
            沒有找到符合當前條件的毛孩
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            請嘗試調整搜尋關鍵字或清空部分條件，或直接聯繫園區志工為您推薦！
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer"
          >
            重設所有篩選條件
          </button>
        </div>
      ) : layoutMode === 'grid' ? (
        /* Grid Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
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
      ) : (
        /* List Layout */
        <div className="space-y-4">
          {filteredPets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-2xl border border-amber-200/80 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={pet.photo}
                  alt={pet.name}
                  className="w-20 h-20 rounded-xl object-cover shrink-0 cursor-pointer"
                  onClick={() => onSelectPetDetail(pet.id)}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      onClick={() => onSelectPetDetail(pet.id)}
                      className="text-lg font-extrabold text-amber-950 hover:text-orange-600 cursor-pointer"
                    >
                      {pet.name}
                    </span>
                    <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold">
                      {pet.breed}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-md font-bold text-white ${
                      pet.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'
                    }`}>
                      {pet.gender === 'male' ? '公' : '母'} ‧ {pet.age}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {pet.personality.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    園區：{pet.shelterLocation} | 健康：已預防針與絕育
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => onToggleFavorite(pet.id)}
                  className={`p-2.5 rounded-xl border cursor-pointer ${
                    favorites.includes(pet.id)
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                  }`}
                  aria-label="收藏"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(pet.id) ? 'fill-white' : ''}`} />
                </button>

                <button
                  onClick={() => onSelectPetDetail(pet.id)}
                  className="px-3.5 py-2.5 rounded-xl border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 cursor-pointer"
                >
                  詳細資訊
                </button>

                <button
                  onClick={() => onOpenAdoptModal(pet)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs shadow-md hover:from-amber-600 hover:to-orange-600 cursor-pointer flex items-center gap-1"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>我想認養</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
