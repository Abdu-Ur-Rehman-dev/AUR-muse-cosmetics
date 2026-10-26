import React, { useState } from 'react';
import { HERO_IMAGES } from '../data/products';
import { ArrowRight, Sparkles, ShieldCheck, Heart, Award } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onShopClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onShopClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden bg-gradient-to-b from-[#FFF9F5] via-[#F5DDE3]/30 to-[#FFF9F5]">
      {/* Decorative Luxury Background Glow Radiance */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#F5DDE3]/40 via-[#C6A56B]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-[#C98598]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Editorial CTAs (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-6">
            
            {/* Unboxed Metadata Tag */}
            <div className="flex items-center gap-2 text-xs font-medium tracking-[0.25em] uppercase text-[#C6A56B]">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A56B]" />
              <span>Haute-Cosmétique Paris</span>
              <span aria-hidden="true">·</span>
              <span>24K Botanical Infusion</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#38252B] leading-[1.12] text-balance">
              Beauty, <br />
              <span className="italic font-light text-[#C98598]">Beautifully</span> Defined
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#38252B]/80 font-normal leading-relaxed max-w-xl">
              Discover timeless beauty essentials crafted for your everyday glow. Pure cold-pressed botanical oils, silk micro-pigments, and 24K gold infusions.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopClick}
                className="px-8 py-4 bg-[#38252B] text-[#FFF9F5] hover:bg-[#C6A56B] transition-all duration-300 rounded-full text-xs font-semibold tracking-widest uppercase shadow-md hover:shadow-xl flex items-center gap-3 group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreClick}
                className="px-8 py-4 border border-[#C6A56B] text-[#38252B] hover:bg-[#F5DDE3]/50 transition-all duration-300 rounded-full text-xs font-semibold tracking-widest uppercase"
              >
                Explore Collection
              </button>
            </div>

            {/* Trust Markers - Clean inline text */}
            <div className="pt-6 border-t border-[#C6A56B]/20 flex items-center justify-between text-xs text-[#38252B]/70 max-w-md">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C6A56B]" />
                <span>Cruelty-Free & Vegan</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#C6A56B]" />
                <span>100% Clean Formulas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#C6A56B]" />
                <span>Artisanal Crafted</span>
              </div>
            </div>

          </div>

          {/* Right Column: Large Premium Product Photography & Floating Product Cards (7 Columns) */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            
            {/* Main Composition Showcase Frame */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-[#C6A56B]/30 group">
              
              {/* Image Loading Placeholder Shimmer */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-[#F5DDE3] shimmer-bg" />
              )}

              <img
                src={HERO_IMAGES.main}
                alt="Luxury cosmetic flat lay featuring gold lipsticks, serum dropper, and rose gold powder texture"
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-1000 transform group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-98'
                }`}
              />

              {/* Gradient Vignette Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#38252B]/40 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 p-4 glass-luxury rounded-xl border border-[#C6A56B]/30 hidden sm:flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#38252B]">Featured Masterpiece</p>
                  <p className="text-sm font-serif-luxury italic text-[#C98598]">L'Élixir de Rose & 24K Gold Palette</p>
                </div>
                <span className="text-xs font-mono font-bold text-[#38252B] bg-[#F5DDE3] px-3 py-1 rounded-full">
                  Limited Edition
                </span>
              </div>
            </div>

            {/* Floating Element 1: Golden Lipstick Card */}
            <div className="absolute -top-6 -left-6 sm:top-4 sm:-left-8 w-32 sm:w-40 aspect-square rounded-2xl overflow-hidden border-2 border-[#FFF9F5] shadow-2xl animate-float pointer-events-none hidden sm:block">
              <img
                src={HERO_IMAGES.floatingLipstick}
                alt="Golden lipstick tube detail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#38252B]/60 via-transparent to-transparent flex items-end p-2">
                <span className="text-[10px] font-medium text-[#FFF9F5] tracking-wider uppercase">Rouge Satin</span>
              </div>
            </div>

            {/* Floating Element 2: Powder Swirl Texture Card */}
            <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:right-4 w-36 sm:w-44 aspect-square rounded-2xl overflow-hidden border-2 border-[#FFF9F5] shadow-2xl animate-float-delayed pointer-events-none hidden sm:block">
              <img
                src={HERO_IMAGES.powderTexture}
                alt="Mineral powder texture macro"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#38252B]/60 via-transparent to-transparent flex items-end p-2">
                <span className="text-[10px] font-medium text-[#FFF9F5] tracking-wider uppercase">Crushed Silk Pigment</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
