import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/petsData';
import { PageRoute } from '../types';
import { 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ClipboardCheck, 
  Heart, 
  PhoneCall, 
  Home, 
  FileCheck, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProcessViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const ProcessView: React.FC<ProcessViewProps> = ({ onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean>>({});

  const quizQuestions = [
    '您是否已年滿 20 歲？（未滿 20 歲須法定代理人同意共同簽署）',
    '同住家人、伴侶或房東是否皆知情並同意家中飼養寵物？',
    '是否具備穩定經濟能力，能提供毛孩日常飲食、定期疫苗與醫療保健？',
    '每天是否能抽出至少 30-60 分鐘陪伴毛孩、玩耍或帶狗散步？',
    '是否願意承諾「不離不棄」，無論搬家、結婚或生活變動都終生陪伴？',
  ];

  const handleQuizToggle = (idx: number, val: boolean) => {
    setQuizAnswers(prev => ({ ...prev, [idx]: val }));
  };

  const answeredCount = Object.keys(quizAnswers).length;
  const passedCount = Object.values(quizAnswers).filter(Boolean).length;

  const processSteps = [
    {
      step: '01',
      title: '線上瀏覽與選擇命定毛孩',
      icon: '🐾',
      desc: '至「認養專區」詳細閱讀每隻狗狗貓貓的個性描繪、健康狀態與背景故事，挑選適合您生活型態的毛孩。'
    },
    {
      step: '02',
      title: '填寫「我想認養」意願單',
      icon: '📝',
      desc: '在毛孩卡片點擊「我想認養」，填寫您的聯絡方式、居住環境與照顧規劃。表單送出後系統將生成追蹤編號。'
    },
    {
      step: '03',
      title: '志工電話初審與溫馨訪談',
      icon: '📞',
      desc: '專屬志工將於 1-2 個工作天內主動與您電話聯繫，聊聊您的照顧想法、解答疑慮，並預約園區參觀時間。'
    },
    {
      step: '04',
      title: '園區現場互動與適應評估',
      icon: '🏡',
      desc: '前往指定園區進行 1-2 次實體互動，與毛孩散步、蹭蹭相處。若家中有其他寵物可安排「多寵見面會」。'
    },
    {
      step: '05',
      title: '簽署正則合約與幸福帶回家',
      icon: '💖',
      desc: '確認彼此適合後，完成免費晶片登記轉移與認養合約簽署，領取「新手飼主大禮包」開開心心帶毛孩回家！'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-md text-orange-900 px-4 py-1.5 rounded-full text-xs font-extrabold border border-white/80 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>透明公開 ‧ 愛心安心責任 🐾</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          認養須知與 5 步驟流程 📖
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          認養是一個長達十數年的美好承諾。我們期待幫助每一位愛寵人與流浪毛孩建立長久幸福的家人關係。
        </p>
      </div>

      {/* Section 1: Interactive Eligibility Test */}
      <section className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/80 shadow-xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-orange-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-orange-400 to-rose-400 text-white flex items-center justify-center text-xl font-bold shadow-md">
            📋
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-800">
              【認養資格自我快速評估】
            </h2>
            <p className="text-xs text-slate-500">
              請試著勾選以下 5 個問題，評估自己是否做好準備：
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {quizQuestions.map((q, idx) => (
            <div 
              key={idx}
              className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="text-sm font-bold text-slate-800 flex items-start gap-2">
                <span className="text-orange-600 font-mono">Q{idx + 1}.</span>
                <span>{q}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleQuizToggle(idx, true)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    quizAnswers[idx] === true
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-white/80 border border-slate-300 text-slate-700 hover:bg-white'
                  }`}
                >
                  ✓ 是的
                </button>
                <button
                  onClick={() => handleQuizToggle(idx, false)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    quizAnswers[idx] === false
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-white/80 border border-slate-300 text-slate-700 hover:bg-white'
                  }`}
                >
                  ✕ 尚在考量
                </button>
              </div>
            </div>
          ))}
        </div>

        {answeredCount === 5 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl text-center text-sm font-bold border ${
              passedCount === 5
                ? 'bg-emerald-50/90 text-emerald-900 border-emerald-300'
                : 'bg-amber-50/90 text-amber-950 border-amber-300'
            }`}
          >
            {passedCount === 5 ? (
              <div className="space-y-2">
                <p className="text-base text-emerald-700">🎉 太棒了！您具備極為完善的認養準備，隨時歡迎瀏覽毛孩並遞交申請！</p>
                <button
                  onClick={() => onNavigate('pets')}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-orange-400 to-rose-400 hover:shadow-md text-white text-xs font-bold cursor-pointer transition-all"
                >
                  立即尋找命定毛孩 🐾
                </button>
              </div>
            ) : (
              <p>感謝您的真誠評估！若有部分條件尚在考慮，歡迎聯繫我們的志工專線 0800-888-929，我們樂意為您提供諮詢與建議。</p>
            )}
          </motion.div>
        )}
      </section>

      {/* Section 2: Step-by-Step Flow */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 text-center">
          詳細 5 步驟認養服務流程 🐾
        </h2>

        <div className="space-y-4">
          {processSteps.map((s, idx) => (
            <div
              key={idx}
              className="bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/80 p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-400 to-rose-400 text-white flex items-center justify-center text-2xl font-black shrink-0 shadow-md">
                {s.step}
              </div>

              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
                  <span>{s.icon}</span>
                  <span>{s.title}</span>
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: FAQ Accordion */}
      <section className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/80 shadow-xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 border-b border-orange-100 pb-4">
          <HelpCircle className="w-6 h-6 text-orange-500" />
          <h2 className="text-xl font-extrabold text-slate-800">
            常見認養問題集 (FAQ)
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="border border-white/90 rounded-2xl overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 bg-white/70 backdrop-blur-md hover:bg-white text-left font-bold text-slate-800 text-sm sm:text-base flex items-center justify-between gap-3 cursor-pointer transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-orange-600 font-mono">Q.</span>
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-white/90 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Action Footer Callout */}
      <div className="bg-gradient-to-r from-orange-400 via-rose-400 to-amber-400 rounded-[2.5rem] p-8 text-white text-center space-y-4 shadow-xl">
        <h3 className="text-2xl font-black">準備好迎接專屬於您的暖心毛孩了嗎？</h3>
        <p className="text-amber-50 text-xs sm:text-sm max-w-xl mx-auto">
          立刻前往認養專區瀏覽待認養毛孩，點擊「我想認養」遞交意願單！
        </p>
        <button
          onClick={() => onNavigate('pets')}
          className="px-8 py-3.5 rounded-2xl bg-white text-slate-900 font-black text-sm shadow-md hover:bg-amber-50 cursor-pointer inline-flex items-center gap-2 transition-transform active:scale-95"
        >
          <span>開始瀏覽寵物名單</span>
          <ArrowRight className="w-4 h-4 text-orange-500" />
        </button>
      </div>

    </div>
  );
};
