import React from 'react';
import { HERO_IMAGES } from '../data/products';
import { Sparkles, Gift, ArrowRight, Tag } from 'lucide-react';

interface SpecialOffersProps {
  onShopCollection: () => void;
  onApplyPromoCode: (code: string) => void;
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({
  onShopCollection,
  onApplyPromoCode,
}) => {
  return (
    <section id="special-offers" className="py-20 bg-[#FFF9F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card Container */}
        <div className="relative rounded-3xl overflow-hidden border border-[#C6A56B]/40 shadow-2xl bg-gradient-to-r from-[#F5DDE3] via-[#FFF9F5] to-[#F5DDE3]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Info Column (7 Columns) */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6 z-10">
              
              <div className="inline-flex items-center gap-2 bg-[#38252B] text-[#FFF9F5] px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase shadow-sm">
                <Gift className="w-3.5 h-3.5 text-[#C6A56B]" />
                <span>Haute Gift Set Complimentary</span>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#38252B] tracking-tight text-balance">
                The Royal Botanical Vanity Chest
              </h2>

              <p className="text-sm sm:text-base text-[#38252B]/80 font-normal leading-relaxed max-w-xl">
                Receive our signature velvet travel pouch and 24K Petal Oil deluxe sample with any order over $120. Plus enjoy 15% off your first luxury order.
              </p>

              {/* Promo Code Copy Box */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2 bg-white border border-[#C6A56B] px-4 py-3 rounded-full text-xs font-mono text-[#38252B] shadow-inner">
                  <Tag className="w-4 h-4 text-[#C6A56B]" />
                  <span>PROMO CODE:</span>
                  <span className="font-bold text-sm text-[#C98598] tracking-widest">LUXE15</span>
                </div>

                <button
                  onClick={() => {
                    onApplyPromoCode('LUXE15');
                    onShopCollection();
                  }}
                  className="px-8 py-3.5 bg-[#38252B] text-[#FFF9F5] hover:bg-[#C6A56B] transition-all duration-300 rounded-full text-xs font-bold tracking-widest uppercase shadow-md flex items-center gap-2 group"
                >
                  <span>Claim 15% Off</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

            {/* Right Image Column (5 Columns) */}
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-square overflow-hidden">
              <img
                src={HERO_IMAGES.specialOffer}
                alt="Luxury beauty gift box flat lay with ribbon"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#F5DDE3] via-transparent to-transparent opacity-80" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
