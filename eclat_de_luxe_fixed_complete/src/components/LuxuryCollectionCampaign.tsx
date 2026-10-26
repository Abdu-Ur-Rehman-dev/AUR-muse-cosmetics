import React from 'react';
import { HERO_IMAGES, BRAND_STORY } from '../data/products';
import { Sparkles, CheckCircle2, ShieldCheck, Leaf } from 'lucide-react';

interface LuxuryCollectionCampaignProps {
  onShopCollection: () => void;
}

export const LuxuryCollectionCampaign: React.FC<LuxuryCollectionCampaignProps> = ({ onShopCollection }) => {
  return (
    <section className="py-24 bg-[#38252B] text-[#FFF9F5] relative overflow-hidden">
      {/* Soft Ambient Radiance Aura */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#C6A56B]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Cinematic Visual Composition (7 Columns) */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-[#C6A56B]/40 shadow-2xl group">
              <img
                src={HERO_IMAGES.campaign}
                alt="Luxury cosmetic items on gold leaf tray"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#38252B] via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-6 left-6 right-6 p-6 glass-dark rounded-2xl border border-[#C6A56B]/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#C6A56B] uppercase">L'Art de la Cosmétique</span>
                  <p className="font-serif-luxury text-lg text-[#FFF9F5] italic font-semibold">Parfumerie & Mineral Masterpieces</p>
                </div>
                <button
                  onClick={onShopCollection}
                  className="px-5 py-2.5 bg-[#C6A56B] text-[#38252B] hover:bg-[#FFF9F5] transition-colors rounded-full text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  Discover
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Brand Manifesto & Craft Highlights (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#C6A56B] uppercase">
              <Sparkles className="w-4 h-4 text-[#C6A56B]" />
              <span>Haute-Cosmétique Manifesto</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold tracking-tight text-[#FFF9F5]">
              {BRAND_STORY.headline}
            </h2>

            <blockquote className="border-l-2 border-[#C6A56B] pl-4 italic text-sm text-[#F5DDE3]/90 font-serif-luxury">
              "{BRAND_STORY.quote}"
            </blockquote>

            <p className="text-sm text-[#FFF9F5]/80 font-normal leading-relaxed">
              {BRAND_STORY.description}
            </p>

            {/* Quality Pillars List */}
            <div className="pt-4 space-y-3 border-t border-[#C6A56B]/30 text-xs text-[#F5DDE3]">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C6A56B] shrink-0" />
                <span>Micro-milled organic minerals without talc or parabens</span>
              </div>
              <div className="flex items-center gap-3">
                <Leaf className="w-4 h-4 text-[#C6A56B] shrink-0" />
                <span>Cold-pressed Damask Rose and Jojoba seed oil infusions</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#C6A56B] shrink-0" />
                <span>Leaping Bunny Certified 100% Cruelty-Free & Vegan</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onShopCollection}
                className="px-8 py-4 bg-[#C6A56B] text-[#38252B] hover:bg-[#FFF9F5] transition-all duration-300 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg"
              >
                Explore Full Collection
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
