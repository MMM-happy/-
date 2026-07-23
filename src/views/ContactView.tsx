import React, { useState } from 'react';
import { SHELTER_INFO } from '../data/petsData';
import { PageRoute } from '../types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

interface ContactViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: '預約現場看毛孩',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('請填寫姓名與電話！');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-amber-200 text-amber-900 px-3.5 py-1 rounded-full text-xs font-extrabold border border-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          <span>我們隨時在這裡協助您</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-amber-950">
          聯絡我們與園區預約參觀 📞
        </h1>
        <p className="text-slate-600 text-sm">
          歡迎隨時來電諮詢認養問題，或線上預約時間親自前往園區與可愛毛孩互動見面！
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Contact Info & Locations (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl border border-amber-200 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-extrabold text-amber-950 border-b border-amber-100 pb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-500" /> 認養諮詢與客服專線
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div>
                <div className="text-amber-800 font-bold">認養免付費專線</div>
                <a href="tel:0800888929" className="text-lg font-black text-orange-600 hover:underline">
                  {SHELTER_INFO.phone}
                </a>
              </div>

              <div>
                <div className="text-amber-800 font-bold">24 小時急難救援與醫療</div>
                <div className="font-bold text-slate-800">{SHELTER_INFO.emergencyPhone}</div>
              </div>

              <div>
                <div className="text-amber-800 font-bold">電子信箱 Email</div>
                <div className="font-medium text-slate-800">{SHELTER_INFO.email}</div>
              </div>

              <div>
                <div className="text-amber-800 font-bold">園區開放參觀時間</div>
                <div className="font-medium text-slate-800">{SHELTER_INFO.hours}</div>
              </div>
            </div>
          </div>

          {/* Locations list */}
          <div className="bg-white rounded-3xl border border-amber-200 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-extrabold text-amber-950 border-b border-amber-100 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" /> 全台園區據點指引
            </h2>

            <div className="space-y-3">
              {SHELTER_INFO.locations.map((loc, idx) => (
                <div key={idx} className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/80 space-y-1 text-xs">
                  <div className="font-extrabold text-amber-950 flex justify-between">
                    <span>{loc.name}</span>
                    <span className="text-orange-600">{loc.phone}</span>
                  </div>
                  <div className="text-slate-600">{loc.address}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Inquiry & Reservation Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 shadow-md">
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-lg">
                  🎉
                </div>
                <h3 className="text-2xl font-black text-amber-950">訊息已成功送出！</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  感謝您的聯繫，PawHaven 園區志工團隊將於 24 小時內回覆您的預約或諮詢！
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs sm:text-sm hover:bg-amber-600"
                >
                  填寫其他諮詢
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-extrabold text-amber-950 border-b border-amber-100 pb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-orange-500" />
                  線上諮詢與參觀預約表單
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      您的姓名 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="請輸入您的真實姓名"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-amber-500 text-sm"
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
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-amber-500 text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      電子信箱 Email
                    </label>
                    <input
                      type="email"
                      placeholder="例：user@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-amber-500 text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      諮詢主題
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-amber-500 text-sm bg-white font-medium"
                    >
                      <option value="預約現場看毛孩">預約現場參觀與看毛孩</option>
                      <option value="認養流程諮詢">認養流程與資格諮詢</option>
                      <option value="報名志工夥伴">報名志工夥伴</option>
                      <option value="物資捐贈登記">物資捐贈登記</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      詢問內容或預約希望時間
                    </label>
                    <textarea
                      rows={4}
                      placeholder="請說明想參觀的園區館別、預計前往日期或相關問題..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-amber-500 text-sm resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-sm shadow-md hover:from-amber-600 hover:to-orange-600 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>確認送出訊息</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
