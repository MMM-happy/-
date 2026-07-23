import React, { useState } from 'react';
import { Pet, AdoptionApplication } from '../types';
import { saveStoredApplication } from '../utils/storage';
import { 
  X, 
  Heart, 
  CheckCircle2, 
  Sparkles, 
  Home, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdoptionModalProps {
  pet: Pet | null;
  isOpen: boolean;
  onClose: () => void;
  onApplicationSubmitted: () => void;
  onNavigateToApplications: () => void;
}

export const AdoptionModal: React.FC<AdoptionModalProps> = ({
  pet,
  isOpen,
  onClose,
  onApplicationSubmitted,
  onNavigateToApplications,
}) => {
  const [formData, setFormData] = useState({
    applicantName: '',
    phone: '',
    email: '',
    city: '台北市',
    housingType: '自有公寓',
    hasPets: '無其他寵物',
    familyAgreed: true,
    experience: '曾經養過狗狗/貓咪',
    reason: '',
  });

  const [submittedApp, setSubmittedApp] = useState<AdoptionApplication | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !pet) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.applicantName || !formData.phone || !formData.email) {
      alert('請填寫完整姓名、電話與 Email 聯絡資訊！');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newApp: AdoptionApplication = {
        id: `PAW-${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`,
        petId: pet.id,
        petName: pet.name,
        petBreed: pet.breed,
        petPhoto: pet.photo,
        applicantName: formData.applicantName,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        housingType: formData.housingType,
        hasPets: formData.hasPets,
        familyAgreed: formData.familyAgreed,
        experience: formData.experience,
        reason: formData.reason || '希望能給毛孩一個溫暖永遠的家，陪伴牠健康快樂成長。',
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0],
      };

      saveStoredApplication(newApp);
      setSubmittedApp(newApp);
      setIsSubmitting(false);
      onApplicationSubmitted();
    }, 600);
  };

  const handleReset = () => {
    setSubmittedApp(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-md">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white/90 backdrop-blur-2xl w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-white/90 overflow-hidden my-8"
        >
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-orange-400 via-rose-400 to-amber-400 p-5 sm:p-6 text-white relative">
            <button
              onClick={handleReset}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <img
                src={pet.photo}
                alt={pet.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/90 shadow-md shrink-0"
              />
              <div>
                <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-0.5 rounded-full text-xs font-semibold mb-1 border border-white/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-100" />
                  <span>認養意願申請單</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
                  我想認養 {pet.name} 🐾
                </h2>
                <p className="text-xs sm:text-sm text-white/90 font-medium">
                  {pet.breed} ‧ {pet.gender === 'male' ? '公' : '母'} ‧ {pet.age} ({pet.shelterLocation})
                </p>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 max-h-[75vh] overflow-y-auto">
            
            {submittedApp ? (
              /* Success Confirmation Screen */
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-6 space-y-5"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-lg shadow-emerald-500/20">
                  🎉
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-amber-950">
                    認養申請表單已成功遞交！
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    感謝您為 {pet.name} 開啟幸福的契機，專屬志工將於 1-2 個工作天內聯繫您。
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-left text-xs sm:text-sm space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between font-bold text-amber-900 border-b border-amber-200/80 pb-2">
                    <span>申請單編號：</span>
                    <span className="text-orange-600 font-mono">{submittedApp.id}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>申請人：</span>
                    <span>{submittedApp.applicantName}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>聯絡電話：</span>
                    <span>{submittedApp.phone}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>預約園區：</span>
                    <span>{pet.shelterLocation}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      handleReset();
                      onNavigateToApplications();
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>查看我的認養進度</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-sm cursor-pointer"
                  >
                    繼續瀏覽其他毛孩
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Form Screen */
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Section 1: Basic Info */}
                <div>
                  <h3 className="text-sm font-extrabold text-amber-900 mb-3 flex items-center gap-2 border-b border-amber-100 pb-1.5">
                    <User className="w-4 h-4 text-orange-500" />
                    第一步：認養人基本資料
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        認養人真實姓名 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="請輸入姓名 (例：陳小明)"
                        value={formData.applicantName}
                        onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        聯絡電話 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="例：0912-345-678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        電子信箱 (Email) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="例：example@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Environment & Experience */}
                <div>
                  <h3 className="text-sm font-extrabold text-amber-900 mb-3 flex items-center gap-2 border-b border-amber-100 pb-1.5">
                    <Home className="w-4 h-4 text-orange-500" />
                    第二步：居住環境與照顧評估
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        居住縣市
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm bg-white"
                      >
                        {['台北市', '新北市', '基隆市', '桃園市', '新竹縣市', '台中市', '彰化縣', '台南市', '高雄市', '其他縣市'].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        住宅類型
                      </label>
                      <select
                        value={formData.housingType}
                        onChange={(e) => setFormData({ ...formData, housingType: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm bg-white"
                      >
                        <option value="自有公寓/住宅">自有公寓/住宅</option>
                        <option value="租屋(房東已同意可養寵)">租屋(房東已同意可養寵)</option>
                        <option value="獨棟透天厝">獨棟透天厝</option>
                        <option value="學生/員工宿舍">學生/員工宿舍</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        家中現有寵物
                      </label>
                      <select
                        value={formData.hasPets}
                        onChange={(e) => setFormData({ ...formData, hasPets: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm bg-white"
                      >
                        <option value="無其他寵物">無其他寵物</option>
                        <option value="有養狗狗">有養狗狗</option>
                        <option value="有養貓咪">有養貓咪</option>
                        <option value="有養其他小動物">有養其他小動物</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        養寵經歷
                      </label>
                      <select
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm bg-white"
                      >
                        <option value="曾經養過狗狗/貓咪">曾經養過狗狗/貓咪</option>
                        <option value="目前家中正有寵物">目前家中正有寵物</option>
                        <option value="第一次養寵物(新手)">第一次養寵物(新手)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 3: Motivation */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    想認養 {pet.name} 的初衷與給毛孩的話 (選填)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="簡單告訴志工您為什麼選擇這隻毛孩、預計給予的照顧規劃..."
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm resize-none"
                  />
                </div>

                {/* Checkbox agreement */}
                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="familyAgreed"
                    checked={formData.familyAgreed}
                    onChange={(e) => setFormData({ ...formData, familyAgreed: e.target.checked })}
                    className="mt-1 w-4 h-4 text-orange-600 rounded border-slate-300 focus:ring-amber-500"
                  />
                  <label htmlFor="familyAgreed" className="text-xs text-amber-950 font-medium cursor-pointer">
                    我已滿 20 歲，同住家人或房東皆知情並同意認養，我願意承諾給予毛孩終生照護、定期打疫苗與不離不棄。
                  </label>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    取消
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm shadow-md shadow-orange-500/20 hover:from-amber-600 hover:to-orange-600 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>遞交中...</span>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 fill-white" />
                        <span>確認送出認養申請</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        </motion.div>

      </div>
    </AnimatePresence>
  );
};
