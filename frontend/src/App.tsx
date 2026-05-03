/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode } from 'react';
import { 
  Menu, 
  Settings, 
  Zap, 
  LayoutGrid, 
  FileText, 
  Users, 
  Rocket, 
  Activity, 
  Fingerprint, 
  TriangleAlert, 
  ArrowRight,
  ChevronRight,
  Terminal,
  Search,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Page = 'home' | 'gallery' | 'crew' | 'enlist';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onEnlist={() => setCurrentPage('enlist')} />;
      case 'gallery':
        return <GalleryPage />;
      case 'crew':
        return <CrewPage />;
      case 'enlist':
        return <EnlistPage />;
      default:
        return <HomePage onEnlist={() => setCurrentPage('enlist')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-chaos-cyan/30 flex justify-between items-center px-6 h-16 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4">
          <button className="text-chaos-cyan hover:scale-110 active:scale-95 transition-all">
            <Menu size={24} />
          </button>
          <h1 className="font-display font-black uppercase tracking-tighter text-xl text-chaos-cyan drop-shadow-[0_0_8px_rgba(0,204,255,0.8)]">
            混乱控制
          </h1>
        </div>
        <button className="text-chaos-cyan hover:scale-110 active:scale-95 transition-all">
          <Settings size={24} />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-24 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 h-20 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-chaos-cyan/30 flex justify-around items-center px-6 pb-2 rounded-t-[24px] shadow-[0_-10px_30px_rgba(0,204,255,0.2)]">
        <NavButton 
          active={currentPage === 'home'} 
          onClick={() => setCurrentPage('home')}
          icon={<Zap size={24} />} 
          label="HEIST"
        />
        <NavButton 
          active={currentPage === 'gallery'} 
          onClick={() => setCurrentPage('gallery')}
          icon={<LayoutGrid size={24} />} 
          label="ZONE"
        />
        <NavButton 
          active={currentPage === 'enlist'} 
          onClick={() => setCurrentPage('enlist')}
          icon={<FileText size={24} />} 
          label="REPORT"
        />
        <NavButton 
          active={currentPage === 'crew'} 
          onClick={() => setCurrentPage('crew')}
          icon={<Users size={24} />} 
          label="CREW"
        />
      </nav>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 transition-all ${
        active 
          ? 'bg-chaos-cyan/20 text-chaos-cyan rounded-xl ring-1 ring-chaos-cyan/50 shadow-[0_0_15px_rgba(0,204,255,0.3)]' 
          : 'text-neutral-500 hover:text-chaos-cyan/60'
      }`}
    >
      {icon}
      <span className="text-[10px] font-display font-bold uppercase tracking-widest mt-1">{label}</span>
    </button>
  );
}

function HomePage({ onEnlist }: { onEnlist: () => void }) {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-end p-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/aida/ADBb0uhS4L3gbH8IZJfEVkmFKKS0BB5pFXeYunzQRhr4RFH2IC6mdyTjx_IFC-uUiF7w8haENWlge-EZ3nAjRQrMyLH5oEWwtvxrxwK0_NMZYLgktJLbJ03JJyHUAFqRh_4vG0VKIk7ALujXwoQWXMs3fUKgZMEj7fNtR_JM6O05V21U7FVGn-Q8vJSDzs7q71hZVRV7ay2NfNEL55CCRX-YlOvbU5mkCAFMA3hT7_npYhVKuClynN9JQmEolBM6hHYvhOjp3ahe26R2uA4" 
            alt="Undercity Hero" 
            className="w-full h-full object-cover opacity-80 mix-blend-lighten"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#131313]/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 space-y-6 max-w-sm">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="inline-block transform -rotate-3 bg-chaos-pink text-white px-4 py-1 font-display font-black text-lg skew-x-12"
          >
            已释放
          </motion.div>
          
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-7xl text-chaos-cyan drop-shadow-[0_0_20px_rgba(0,204,255,0.6)] uppercase tracking-tighter"
          >
            金克丝
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-sans text-neutral-400 border-l-2 border-chaos-pink pl-4 text-sm"
          >
            “规则就是用来打破的…… 就像建筑！或者人！”
          </motion.p>
          
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={onEnlist}
            className="w-full py-5 bg-transparent border-2 border-chaos-cyan text-chaos-cyan font-display font-black uppercase text-xl relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-chaos-cyan/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative flex items-center justify-center gap-3">
              加入混乱 <Zap size={20} className="fill-chaos-cyan" />
            </span>
          </motion.button>
        </div>
      </section>

      {/* Dossier Section */}
      <section className="p-6">
        <div className="scratched-metal border border-neutral-800 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-chaos-red/10 rotate-45 translate-x-12 -translate-y-12 flex items-end justify-center pb-2">
            <span className="text-chaos-red font-display font-bold text-[10px] uppercase tracking-widest">DANGER</span>
          </div>
          
          <h3 className="font-display font-bold text-2xl text-chaos-pink mb-8 flex items-center gap-3 italic">
            <Fingerprint size={24} /> 实验对象_04
          </h3>
          
          <div className="space-y-8">
            <StatBar label="鲁莽指数" value="100%" progress={100} color="cyan" />
            <StatBar label="爆炸潜力" value="是" progress={95} color="pink" animated />
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed border-neutral-800">
              <div>
                <span className="block text-[10px] text-neutral-500 uppercase tracking-widest mb-1">最后出现</span>
                <span className="block font-sans text-sm text-neutral-200">皮尔特沃夫飞艇</span>
              </div>
              <div>
                <span className="block text-[10px] text-neutral-500 uppercase tracking-widest mb-1">威胁等级</span>
                <span className="block font-sans text-sm text-chaos-red font-bold">极限混乱</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Arsenal Section */}
      <section className="p-6 space-y-8">
        <h3 className="font-display font-black text-3xl text-center uppercase skew-y-1">锁定并加载</h3>
        
        <div className="space-y-12">
          <WeaponCard 
            name="鱼骨头" 
            desc="Long-range destructive capability. Personality: Moody." 
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuBnabpYPnbTK5eEWICRMpbI9p_3hMl0C49YdrYVigEO0p_GJrCeC2E-O-2Idmb3XzlJob4YzfKM_LK4w9i3C30_ka8CsdCbhdmIgdmNYTNLnjQEmn1wUMEw4yBYzBAlqyqn8nr7Q-H3tn1MJY03G9fAkr7PoCP-jRGVnboHmqlfEtoshB1j7byXmzZseg_wBafLPAr1pKXPmLcVjbdvfOUpNRMNEvSilQ3Pec5ia85vDMI1YVb-hnMx-CdXUFAfLyT0ghZl_x6wNYZJ"
            color="cyan"
            icon={<Rocket size={20} />}
          />
          <WeaponCard 
            name="砰砰" 
            desc="Rapid-fire chaos delivery system. No brakes included." 
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuDR_rP3LIcOkDppiwXh_UH3_CU6tDS3Nf0RV3anw7Nby4n55W76-diZDE0PD-EJnBHXg9ec3XZSPWZlNC0IwJek360WeZj3sUD7sxmPyc4YCXmMwVXag_AitV50aWPTcIILEr3zwty4QBG66uGRcMIOKTuqB71bmooeyE3jgzjnF9MKxwx_llndBp96mRtMa3Te_82ZM2nMi-ybZzSlirqV5Jf2ZWUFTNJJLq3UpzqCJYx-XVtOKjTOS5lISJ199M3R4spbjmWUGnFY"
            color="pink"
            icon={<Activity size={20} />}
            reversed
          />
        </div>
      </section>

      {/* Visual Static / Gallery Small */}
      <section className="p-6">
        <h3 className="font-display font-black text-2xl uppercase border-l-8 border-chaos-cyan pl-4 mb-8">视觉静电</h3>
        <div className="columns-2 gap-3 space-y-3">
          {[1,2,3,4].map(i => (
            <div key={i} className="border border-neutral-800 overflow-hidden group">
              <img 
                src={`https://picsum.photos/seed/jinx${i}/400/600`} 
                alt="Static" 
                className="grayscale group-hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Wanted Poster Signup */}
      <section className="p-6 pb-12">
        <div className="bg-[#2a2a2a] p-8 border-4 border-dashed border-chaos-red relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
            <div className="hazard-stripes h-full w-full rotate-45 scale-150"></div>
          </div>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-chaos-red text-white font-display font-black px-6 py-1 skew-x-12 text-lg">
            悬赏
          </div>
          
          <div className="text-center mt-4 space-y-6 relative z-10">
            <h4 className="font-display font-black text-3xl uppercase leading-none italic">
              死活不论<br/><span className="text-sm opacity-60">（最好炸飞）</span>
            </h4>
            <p className="font-sans text-chaos-red text-sm font-bold uppercase tracking-widest">
              奖励：永恒荣耀与弹药
            </p>
            
            <form className="space-y-6 text-left pt-6">
              <div className="space-y-1">
                <label className="text-[10px] font-display font-bold uppercase text-neutral-500 tracking-widest">代号</label>
                <input 
                  type="text" 
                  placeholder="请输入代号" 
                  className="w-full bg-transparent border-b-2 border-chaos-cyan text-white py-2 focus:outline-none focus:border-chaos-pink transition-colors font-sans"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-display font-bold uppercase text-neutral-500 tracking-widest">加密频道</label>
                <input 
                  type="email" 
                  placeholder="爆炸信息发送至？" 
                  className="w-full bg-transparent border-b-2 border-chaos-cyan text-white py-2 focus:outline-none focus:border-chaos-pink transition-colors font-sans"
                />
              </div>
              <button className="w-full py-4 bg-chaos-red text-white font-display font-black uppercase text-xl hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_15px_rgba(255,77,77,0.3)]">
                报名制造混乱
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function GalleryPage() {
  const filters = ['ALL', 'MAYHEM', 'ARSENAL', 'GRAFFITI'];
  const galleryImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCvBllASmuH_RZ2XS3kvaED9sBvHPYsF8Hhg-p5OBgZPkRYwYwiQY_2ZJ5mXJTr0KrYawZhjREmHlFspPXJVCehyaq8xasaJDH1Ojf9uQX_IAmvXFulUlNogXXhfZzqpjDLHrkGp9-BPFfQJPm2q5MMdsWYbdlCJojLl2f1BjqgaCcHBWANs4l3Vje6bpxPkVl4ToBzr2EbH59iw11shKWWInOzjvvhIyWVgj212xL2MW5bTw3xE60uDQefw1p_LA-cRdHk0Dg0pe-L",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBl8clp_2_iFjBemktrPX8QxzQozYLWNr7MjCQAvUsxDcIxvWt8hBVobksoVkT0yrQuZ7EYAn06wRMNlBjDZ5AT2wbNaVZ0GALaS9-Q5RlylXimhfx4cl-zTPj1JNQnMPFaO1YLFrZ7vqdxxDqXM287IGIz3yjhAvn3cuZu8ndTKF89F3WsoGDdfMIQiL0bCS2xbm0lrx3FWzKyJLsdNgGZERGlAec-ztSA2fno4v3yvwSqxVXSb162KnNeh0c1PTnBbAf0jsglefQH",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDsSgG9ZwghVfOKtSbBPWdiN-sQ5REOEjvqAER7CYiM7HhfQRk070MUqaMd68f8l1gUQXdKuR6Ma5I3s142-w0cAmb63Z9uE4NVmRhFFARyh3qqF84gp4o3Ozlno5GwsoSRcdLrarwtEmg-aK1L6WwftYqwiTgcNHzmaVCrBDVqExmqDo38gLdg0SIE7ABDFKQnP2WdV4fWzy7AgEmnOkpEY_emzgjkHyq854CyH3fhrJMI-zvn7srGVqnrppZkD9pkOmynjtMeQ1nu",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC10jK744orodIx8dBeTBe0EtHGgdOzk9pEQXq0l-5OFvHcfRClXtzgQpIbPTcUJNZfGh2INMd3GayCbUPE0zW6NhDwD6KFotheirHecaQpLtIq7QrijfC-iNq6w50IIokJFyAx3O9fdyU1NrLAfEOK1P-MEJb5r1leo_4dLSLi7iQ-ZgtyIf-gfUkAFQ4N5cKvOkDyTS-TGjE235UA5qcJIzodlPU-ILHUNoJtuk8Eu9wdmMPgN8wQgmTKBEffEXvYf9O464MSqNeF",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDA4QsCr0gfD0aW2T-0DbBpzYWeJcQnJY8nEN-TwZQ3A4BOWN7kM9DZY8Ka3B6v6ELUC_Tssq8waQFS5FMuq8Vd6mlHIyuxboKAZ7lNsgk3Ng31EhBBzS9TnSHPIQ1Ww32a1Vyq1ltCfmpxBE2ChHaXjHfu-Ou2nVNqlrtMFxxqQ0yIE0H5VqtTsCIaUcGCpWvufztAitRUEqXM4Tau3dkOBBxY4vtWu1kNiijGiDqYWQJkATwvTbiTAEeqrX7DFpP6JIDhRRCFZZBB",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDk-A-ObZry1kk0D7me6bXpuL4T0w-r4slY5gDXc7-dNYAtWHmT92llYcG9p0WE2uFOeowS7rO_dpx9hNsQmGKe7pLO6DrY1oJwNJ3dXwu1S9nhZ01r_16hK0NGWXCFwZRCH1rr1OX3I5izjofwWVe-vaoP31SopPjwcYv2z7kgU6RZZf0JDRo5_g9ZxIuVWnGn9IJbEzaKbo8RFiCgePwXst6coX2Y7Sn4JF1ZBkipghKWGILCwu-fkjuui8kX57iVhpQHcitzbEZH"
  ];
  return (
    <div className="p-6 pt-24 space-y-8">
      <div className="flex flex-col gap-2 -rotate-1 origin-left">
        <h2 className="font-display font-black text-6xl text-chaos-cyan drop-shadow-[4px_4px_0px_#5b005b] tracking-tighter">
          GALLERY_REBELS
        </h2>
        <div className="h-1 bg-gradient-to-r from-chaos-cyan via-chaos-pink to-transparent opacity-50"></div>
      </div>

      <div className="flex flex-wrap gap-3">
        {filters.map((f, i) => (
          <button 
            key={f}
            className={`px-6 py-2 font-display font-bold skew-x-[-12deg] transition-all border-2 ${
              i === 0 
                ? 'bg-chaos-cyan text-black border-chaos-cyan shadow-[4px_4px_0px_#005369]' 
                : 'bg-neutral-950 text-chaos-cyan border-neutral-800 hover:border-chaos-cyan'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="columns-2 gap-4 space-y-4">
        {galleryImages.map((src, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5, skewX: -1 }}
            className={`bg-[#201f1f] p-2 border border-neutral-800 relative group overflow-hidden ${
              i % 3 === 0 ? '-rotate-2' : i % 2 === 0 ? 'rotate-1' : ''
            }`}
          >
            <img 
              src={src} 
              alt="Rebel Art"
              className="grayscale group-hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            {i === 0 && (
              <div className="absolute top-4 right-4 bg-chaos-pink text-white text-[8px] font-display font-black px-2 py-1 skew-x-12 uppercase">
                Stamped_By_Jinx
              </div>
            )}
            {i === 3 && (
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm border border-chaos-cyan p-2 text-[8px] font-display font-bold text-chaos-cyan">
                ARSENAL_X
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <button className="group relative px-10 py-5 bg-neutral-900 border-2 border-chaos-pink overflow-hidden active:scale-95 transition-all">
          <div className="absolute inset-0 bg-chaos-pink/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute top-0 left-0 w-2 h-2 bg-chaos-pink"></div>
          <div className="absolute top-0 right-0 w-2 h-2 bg-chaos-pink"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-chaos-pink"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-chaos-pink"></div>
          <span className="relative font-display font-black text-chaos-pink flex items-center gap-3">
            LOAD_MORE_CHAOS <ArrowRight size={20} />
          </span>
        </button>
      </div>

      <div className="h-8 w-full hazard-stripes opacity-30 skew-y-1"></div>
    </div>
  );
}

function CrewPage() {
  const members = [
    { name: 'VI', threat: 4, status: 'ON_THE_LOOSE', color: 'pink', badge: 'PRIORITY_RED', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtUgqyuQzoXkDhpBo7x6NFoDotGA2dacLn_aUBXkP9aZav0YJJYYlp5JkUl5v8wsiNNRu5dbcSZmxp-PcjKqJo-z9vY5uIK7uh3fMiQlrA13jTZ2_3vpof8nbStKCSpewTiuIstyHwnqSctfBtuelID5OEXjfnttLRvPvwOmTDkp2v4s_GET7QRpVEvHfqKJrCNFZ6PaN9gg_MrXuUx2EEoLzw1QsM6G5USJhBex_cnDgSje4fATSB_lrJUn5LSTK8nPaE_8LBAJGz" },
    { name: 'EKKO', threat: 2, status: 'IN_SECTOR_4', color: 'cyan', badge: 'ALLY_PROBABLE', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnbF4q73lvRHFfXmLvhmTqu6D5LoBp0Lw1EeqcNdFW6HsZZpYB-9l0A7P2mwyKBYvLJRnnsXY_RO55R0NoWPeXVofh_LZtwqPAK3U37AZ2zwvJPMzNgq59UEYSVs41cuos-_5jv1DrDI4tm6U_aA10KCBwf0m_zvfviV1BMHZKExPVHDCQ2u5l63ajBN2971N3ftJKVvcmjRb5YsPB2Mc3sW_SCQ_Bec4A79vwch4PmmS8D2qncN9PpM6FbEv9Z9p5FOBsRT0WEpoX" },
    { name: 'SILCO', threat: 5, status: 'UNKNOWN_LOC', color: 'red', badge: 'HIGH_DANGER', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfd9ZO6tA_olZKt6Dp3MnV0GyjbNQ6wf3LppKn6ihXSzcf2ZsyBZboL_KgZ6Dl0I27esaxKMOyKOtdnXshQZ_dGsd97bPuD8adDsoQ9UbZfMJA551ZYU27AN6HIlxKmG2nkO1v4MqMhCTP2dWt6yrRMMBAaxZqHDoRzbImwd8GH6VFzzDAvIt3VJB1YqhQPywfhdurUvJzv1WDOs8nWBeVvRdQyxCjoK_yocH56bc-C1W9yOog5QDZLFEILvl1KzvJnb0ZT2rrqnoI" },
  ];

  return (
    <div className="p-6 pt-24 space-y-10">
      <div className="scratched-metal border-l-4 border-chaos-pink p-6">
        <div className="flex flex-col space-y-2">
          <span className="text-[10px] font-display font-bold text-chaos-pink flex items-center gap-2">
            <span className="w-2 h-2 bg-chaos-pink rounded-full animate-pulse"></span>
            SYSTEM_LINK_ACTIVE
          </span>
          <h2 className="font-display font-black text-4xl text-chaos-cyan italic">CREW_OVERRIDE</h2>
          <p className="text-sm text-neutral-400 opacity-80 max-w-xs">
            Tracking high-value targets across Undercity sectors. Priority: Neutralize or Recruit.
          </p>
          <div className="pt-4 flex items-center gap-4">
            <div className="h-1 flex-1 bg-neutral-800">
              <div className="h-full bg-chaos-cyan w-[72%] shadow-[0_0_10px_#00ccff]"></div>
            </div>
            <span className="text-[10px] font-display font-bold text-chaos-cyan whitespace-nowrap">72% SYNC</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {members.map((m, i) => (
          <div key={m.name} className={`relative flex flex-col group ${i % 2 !== 0 ? 'ml-8' : '-ml-2'}`}>
            <div className={`absolute -top-3 ${i % 2 !== 0 ? '-right-2' : '-left-2'} z-10 ${m.color === 'pink' ? 'bg-chaos-pink' : m.color === 'cyan' ? 'bg-chaos-cyan' : 'bg-chaos-red'} text-white px-3 py-1 font-display font-black text-[10px] ${i % 2 !== 0 ? 'skew-x-12' : 'skew-x-[-12deg]'}`}>
              {m.badge}
            </div>
            
            <div className="aspect-[4/3] border-2 border-neutral-800 overflow-hidden relative">
              <img 
                src={m.image} 
                alt={m.name}
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className={`font-display font-black text-3xl px-3 py-1 ${
                  m.color === 'pink' ? 'bg-chaos-pink text-white' : 
                  m.color === 'cyan' ? 'bg-chaos-cyan text-black' : 
                  'bg-chaos-red text-white'
                }`}>
                  {m.name}
                </h3>
              </div>
            </div>

            <div className="p-4 bg-neutral-900/50 border-x-2 border-b-2 border-neutral-800 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Threat_Level</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <div key={idx} className={`w-6 h-2 ${idx < m.threat ? (m.color === 'pink' ? 'bg-chaos-pink' : m.color === 'cyan' ? 'bg-chaos-cyan' : 'bg-chaos-red') : 'bg-neutral-800'}`}></div>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Status</p>
                <span className={`text-[10px] font-display font-black ${
                  m.color === 'pink' ? 'text-chaos-pink' : 
                  m.color === 'cyan' ? 'text-chaos-cyan' : 
                  'text-chaos-red'
                }`}>
                  {m.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="relative py-8 border-t border-chaos-cyan/20">
        <div className="absolute -top-4 right-0 font-display font-black text-chaos-cyan opacity-5 select-none rotate-12 text-5xl">
          JINX_WAS_HERE
        </div>
        <button className="w-full py-4 bg-neutral-900 border-2 border-chaos-cyan text-chaos-cyan font-display font-black uppercase text-lg tracking-widest hover:bg-chaos-cyan/10 transition-colors shadow-[0_0_15px_rgba(0,204,255,0.2)]">
          SCAN_NEW_SIGNAL
        </button>
      </div>
    </div>
  );
}

function EnlistPage() {
  const recruitingBg = "https://lh3.googleusercontent.com/aida-public/AB6AXuAZyYDDmwGLQBO4rDpCrHhvOe8_vLDtf1y4dRurBF-_8v6bYc-UKWfpQihENesiz1dJh4mK5uNGJI_NSx9V2CBl6xky1uyu_AKyqA0n1575tx9Ilq80yq7jI6fsdl3A0GegYHykpb-HOJPrsvjh798O6-9-8tn8JPsOiyMCbIzPE-zcUbQwuFTeht3WhEOs6C4CXjh4TlIoqFVzfAtj0Oe69luk_NzeBVaG7wRhHG9JajDQCJxbyLZIaaDO2_yt9G5mOLxEX8lkq-eg";
  const specialties = [
    { id: 'explosives', name: 'EXPLOSIVES', icon: <Zap size={18} /> },
    { id: 'sniping', name: 'SNIPING', icon: <ChevronRight size={18} /> },
    { id: 'hacking', name: 'HACKING', icon: <Terminal size={18} /> },
    { id: 'chaos', name: 'CHAOS_MGMT', icon: <TriangleAlert size={18} /> },
  ];

  return (
    <div className="p-6 pt-24 space-y-10 relative">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
        <img 
          src={recruitingBg} 
          className="absolute -right-20 top-40 w-[150%] grayscale contrast-150 rotate-12 mix-blend-screen" 
          alt="Recruit Background"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="space-y-2 translate-x-[-4px] relative z-10">
        <div className="inline-block bg-chaos-cyan text-black px-4 py-1 skew-x-[-15deg] mb-2 font-display font-bold text-[10px] uppercase tracking-widest">
          ACCESS GRANTED: CHAOS_NODE_09
        </div>
        <h2 className="font-display font-black text-5xl italic leading-none drop-shadow-[4px_4px_0px_#fe00fe] uppercase">
          ENLIST FOR <span className="text-chaos-cyan">MAYHEM</span>
        </h2>
        <div className="w-full h-1 hazard-stripes mt-4 skew-x-[-5deg] opacity-50"></div>
      </div>

      <div className="bg-[#1c1b1b]/80 backdrop-blur-xl border-l-4 border-chaos-cyan p-6 scratched-metal space-y-8 relative">
        <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-chaos-pink/40"></div>
        
        <div className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-display font-bold text-chaos-cyan uppercase tracking-[0.2em] flex items-center gap-2">
              <ChevronRight size={14} /> WANTED ALIAS
            </label>
            <input 
              type="text" 
              placeholder="TYPE_YOUR_DOOM..." 
              className="w-full bg-transparent border-b-2 border-neutral-800 py-3 text-white focus:outline-none focus:border-chaos-cyan transition-colors font-sans"
            />
            <div className="flex justify-between text-[8px] text-neutral-600 font-bold uppercase tracking-widest">
              <span>ID_VERIFICATION_REQUIRED</span>
              <span>0%_ANONYMITY</span>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-display font-bold text-chaos-pink uppercase tracking-[0.2em]">SPECIALTY_SET</label>
            <div className="grid grid-cols-2 gap-3">
              {specialties.map((s, i) => (
                <button 
                  key={s.id}
                  className={`p-4 border-2 flex flex-col gap-3 group transition-all text-left ${
                    i < 2 ? 'border-chaos-cyan/30 bg-chaos-cyan/5 hover:border-chaos-cyan hover:bg-chaos-cyan/20' : 'border-neutral-800 bg-neutral-800/20 hover:border-neutral-600'
                  }`}
                >
                  <span className={i < 2 ? 'text-chaos-cyan' : 'text-neutral-500'}>{s.icon}</span>
                  <span className="text-[8px] font-display font-black text-white">{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-display font-bold text-chaos-cyan uppercase tracking-[0.2em]">MANIFESTO_UPLOAD</label>
            <textarea 
              placeholder="WHY SHOULD WE RECRUIT A LOSER LIKE YOU?"
              rows={4}
              className="w-full bg-neutral-900/50 border-2 border-neutral-800 p-4 text-white focus:outline-none focus:border-chaos-pink transition-colors font-sans resize-none"
            />
            <div className="flex items-center gap-3">
              <div className="h-1 flex-1 bg-neutral-800">
                <div className="h-full bg-chaos-pink w-1/3 shadow-[0_0_8px_#fe00fe]"></div>
              </div>
              <span className="text-[10px] font-display font-bold text-chaos-pink italic">THREAT_LEVEL: LOW</span>
            </div>
          </div>

          <button className="w-full bg-chaos-cyan py-6 font-display font-black italic text-black text-xl hover:bg-chaos-pink hover:text-white transition-all active:scale-95 group relative overflow-hidden">
            <span className="relative z-10">SIGN MY DEATH WARRANT</span>
            <div className="absolute top-0 right-0 p-2 opacity-30">
              <Zap size={24} />
            </div>
          </button>
          
          <p className="text-[8px] font-display font-bold text-neutral-600 text-center uppercase tracking-[0.3em]">
            NO REFUNDS. NO RETREAT. NO REMORSE.
          </p>
        </div>
      </div>
      
      <div className="opacity-40">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-[10px] font-display font-black text-chaos-cyan">SYSTEM_LOG_ERR:</span>
          <div className="h-[1px] flex-1 bg-neutral-800"></div>
        </div>
        <p className="text-[10px] text-neutral-600 font-mono italic leading-tight">
          0x88492 // ATTEMPTING_TO_SYNC_WILL_CAUSE_INSTABILITY <br/>
          NULL_POINTER_EXCEPTION_IN_GANG_LOGIC <br/>
          READY_FOR_DETONATION...
        </p>
      </div>
    </div>
  );
}

function StatBar({ label, value, progress, color, animated = false }: { label: string, value: string, progress: number, color: 'cyan' | 'pink', animated?: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-display font-bold text-neutral-500 uppercase tracking-widest">{label}</span>
        <span className={`font-display font-black text-2xl ${color === 'cyan' ? 'text-chaos-cyan' : 'text-chaos-pink'}`}>{value}</span>
      </div>
      <div className="h-4 bg-neutral-900 border border-neutral-800 p-0.5 overflow-hidden relative">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className={`h-full relative shadow-[0_0_15px_rgba(0,0,0,0.5)] ${color === 'cyan' ? 'bg-chaos-cyan text-chaos-cyan' : 'bg-chaos-pink text-chaos-pink'} animate-pulse-glow`}
        >
          {/* Flowing Waveform Animation */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="flex w-[200%] h-full animate-wave">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-4 h-full flex items-center justify-center"
                >
                  <div 
                    className="w-1 bg-black rounded-full" 
                    style={{ 
                      height: `${30 + Math.sin(i * 0.8) * 40}%`,
                      opacity: 0.5 + Math.cos(i * 0.5) * 0.5
                    }}
                  />
                </div>
              ))}
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i + 20} 
                  className="w-4 h-full flex items-center justify-center"
                >
                  <div 
                    className="w-1 bg-black rounded-full" 
                    style={{ 
                      height: `${30 + Math.sin(i * 0.8) * 40}%`,
                      opacity: 0.5 + Math.cos(i * 0.5) * 0.5
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Animated Hazard Stripes */}
          {animated && (
            <div className="absolute inset-0 hazard-stripes-moving opacity-40"></div>
          )}

          {/* Scanning Beam */}
          <div className="absolute inset-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-scan"></div>
        </motion.div>
      </div>
    </div>
  );
}

function WeaponCard({ name, desc, image, color, icon, reversed = false }: { name: string, desc: string, image: string, color: 'cyan' | 'pink', icon: ReactNode, reversed?: boolean }) {
  const colorClasses = color === 'cyan' 
    ? { bg: 'bg-chaos-cyan', text: 'text-black', border: 'border-chaos-cyan' }
    : { bg: 'bg-chaos-pink', text: 'text-white', border: 'border-chaos-pink' };
  
  return (
    <div className={`relative flex flex-col group ${reversed ? 'ml-6' : '-ml-2'}`}>
      <div className={`absolute -top-4 ${reversed ? '-right-4' : '-left-4'} ${colorClasses.bg} p-3 z-10 ${colorClasses.text} shadow-lg`}>
        {icon}
      </div>
      <div className={`border-2 ${colorClasses.border} bg-[#201f1f] p-4 group-hover:scale-[1.02] transition-transform duration-500 shadow-[10px_10px_0px_rgba(0,0,0,0.4)]`}>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover mb-4 grayscale group-hover:grayscale-0 transition-all duration-700" 
          referrerPolicy="no-referrer"
        />
        <h4 className={`font-display font-black text-2xl uppercase ${color === 'cyan' ? 'text-chaos-cyan' : 'text-chaos-pink'}`}>{name}</h4>
        <p className="font-sans text-neutral-400 italic text-xs leading-relaxed mt-1">{desc}</p>
      </div>
    </div>
  );
}
