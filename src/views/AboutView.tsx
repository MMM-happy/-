import React from 'react';
import { PageRoute } from '../types';
import { SHELTER_INFO } from '../data/petsData';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Gift, 
  MapPin, 
  Award,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

interface AboutViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  const volunteerRoles = [
    {
      title: '園區貓狗照護與散步志工',
      desc: '協助園區狗狗日常戶外散步、梳毛互動、犬舍/貓房清潔與陪伴，給予毛孩滿滿的愛！',
      schedule: '每週六日 10:00 - 16:00 (排班制)'
    },
    {
      title: '毛孩特寫攝影與社群紀錄',
      desc: '運用鏡頭捕捉待認養毛孩最呆萌漂亮的瞬间，協助撰寫救援故事並發布認養文章。',
      schedule: '彈性排班 ‧ 具備單眼或攝影基礎者佳'
    },
    {
      title: '親人訓練與社會化陪伴志工',
      desc: '配合園區訓犬師與貓咪行為學志工，協助較害羞或曾受創傷的毛孩重新建立對人類的信任。',
      schedule: '平日下午 14:00 - 17:00'
    }
  ];

  const donationWishlist = [
    { name: '優質犬貓成幼罐頭 / 飼料', target: '不限品牌 (需包裝完整未開封)' },
    { name: '洗澡毛巾 / 寵物保暖毯', target: '乾淨二手或新品皆可' },
    { name: '貓砂 (礦砂 / 豆腐砂)', target: '貓房每日消耗極大物資' },
    { name: '犬用牽繩 / 胸背帶 (M/L號)', target: '每日散步安全防護' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Hero */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-8 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" /> 關於 PawHaven 寵物溫馨認養家園
        </div>
        <h1 className="text-3xl sm:text-4xl font-black">
          每一個生命，都值得擁有永遠的港灣 🐾
        </h1>
        <p className="text-amber-100 text-sm max-w-2xl leading-relaxed">
          PawHaven 創立於 2018 年，是由一群熱愛流浪動物的獸醫師、訓練師與愛心志工共同組成的非營利認養平台。我們堅持不關籠、給予毛孩最完善的醫療與家庭社會化培育。
        </p>
      </div>

      {/* Story & Values */}
      <section className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-black text-amber-950 flex items-center gap-2">
          <span>🌱 我們的核心理念與四大堅持</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 space-y-1">
            <div className="font-extrabold text-amber-950 text-base flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              1. 100% 醫療與健康透明
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              入園毛孩皆經獸醫師全套體檢、施打預防針、完成絕育手術與晶片植入，絕不隱瞞病史。
            </p>
          </div>

          <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 space-y-1">
            <div className="font-extrabold text-amber-950 text-base flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500" />
              2. 溫馨不關籠開放環境
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              園區設有陽光綠草坪與舒適貓咪遊戲室，讓毛孩在快樂放鬆的心情下展現真實個性。
            </p>
          </div>

          <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 space-y-1">
            <div className="font-extrabold text-amber-950 text-base flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-600" />
              3. 新手飼主陪伴與輔導
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              提供認養後 3 個月一對一線上志工隨身諮詢，解答飲食、行為與環境適應疑難雜症。
            </p>
          </div>

          <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 space-y-1">
            <div className="font-extrabold text-amber-950 text-base flex items-center gap-1.5">
              <Award className="w-4 h-4 text-orange-500" />
              4. 終生防護網與反悔機制
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              若因不可抗力極特殊因素無法繼續飼養，園區承諾無條件接回，確保毛孩絕不再次流浪。
            </p>
          </div>
        </div>
      </section>

      {/* Volunteer Recruitment */}
      <section className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex justify-between items-end border-b border-amber-100 pb-3">
          <div>
            <span className="text-xs font-bold text-orange-600 uppercase">JOIN OUR TEAM</span>
            <h2 className="text-2xl font-black text-amber-950 mt-0.5">
              招募志工夥伴 🤝
            </h2>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>填寫志工報名</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {volunteerRoles.map((role, idx) => (
            <div key={idx} className="bg-amber-50/40 p-5 rounded-2xl border border-amber-200 space-y-2">
              <h3 className="font-extrabold text-amber-950 text-sm">{role.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{role.desc}</p>
              <div className="text-[11px] font-bold text-orange-600 pt-2 border-t border-amber-200/60">
                ⏰ 排班：{role.schedule}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Donation Wishlist */}
      <section className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-2 border-b border-amber-100 pb-3">
          <Gift className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-black text-amber-950">
            園區物資捐贈需求單 🎁
          </h2>
        </div>

        <p className="text-xs text-slate-600">
          若您暫時不便認養毛孩，亦可以寄送物資的方式支持園區日常運作！物資可直接寄至園區總館。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {donationWishlist.map((item, idx) => (
            <div key={idx} className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                ✓
              </div>
              <div>
                <div className="font-bold text-emerald-950 text-sm">{item.name}</div>
                <div className="text-xs text-emerald-800/80">{item.target}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-amber-50 rounded-2xl text-xs text-amber-900 border border-amber-200">
          <span className="font-bold">物資寄送地址：</span>{SHELTER_INFO.address} (收件人：PawHaven 園區物資組)
        </div>
      </section>

    </div>
  );
};
