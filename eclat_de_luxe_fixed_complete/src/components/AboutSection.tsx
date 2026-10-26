import React from 'react';
import { Sparkles, Flower2, HeartHandshake, ShieldCheck, Gem } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: <Flower2 className="w-6 h-6 text-[#C6A56B]" />,
      title: 'Botanical Cold-Extraction',
      desc: 'All oils and flower essences are cold-pressed in small artisanal batches in Provence to preserve active vitamins and natural scent profiles.',
    },
    {
      icon: <Gem className="w-6 h-6 text-[#C6A56B]" />,
      title: 'Crushed Mineral Pigment',
      desc: 'Formulated with ultra-milled natural quartz and mica without talc, heavy metals, synthetic parabens, or artificial dyes.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#C6A56B]" />,
      title: '100% Cruelty-Free & Vegan',
      desc: 'Leaping Bunny certified. We strictly never test on animals and never formulate with animal derivatives.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#C6A56B]" />,
      title: 'Sustainable Recyclable Glass',
      desc: 'Housed in custom heavy-weight frosted crystal and 24K gold-plated aluminum compacts designed for refillable reuse.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#FFF9F5] border-t border-[#C6A56B]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#C6A56B] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Maison Quality Standards</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#38252B]">
            Haute-Cosmétique Excellence
          </h2>
          <p className="text-sm text-[#38252B]/70 font-normal">
            Every creation is engineered to honor the delicate balance between skin health, high-impact pigment, and environmental stewardship.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-[#C6A56B]/20 hover:border-[#C6A56B] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F5DDE3]/60 flex items-center justify-center group-hover:bg-[#C6A56B] group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-serif-luxury text-xl font-bold text-[#38252B]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#38252B]/70 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
