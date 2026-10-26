import React from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';

interface NewArrivalsProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({ onQuickView, onAddToCart }) => {
  const newProducts = PRODUCTS.filter((p) => p.isNewArrival);

  return (
    <section id="new-arrivals" className="py-24 bg-[#F5DDE3]/30 relative overflow-hidden">
      {/* Decorative Gold Foil Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C6A56B] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#C6A56B] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autumn / Winter Collection</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#38252B] tracking-tight">
            The Celestial Mineral Series
          </h2>
          <p className="text-sm text-[#38252B]/70 leading-relaxed font-normal">
            New formula arrivals featuring triple-milled quartz, 24K gold foil particles, and cold-pressed Damask rose oils.
          </p>
        </div>

        {/* Asymmetrical Editorial Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Hero Spotlight Product (7 Columns) */}
          {newProducts[0] && (
            <div className="lg:col-span-7 bg-[#FFF9F5] rounded-3xl overflow-hidden border border-[#C6A56B]/30 shadow-xl flex flex-col md:flex-row justify-between group">
              <div className="md:w-1/2 relative aspect-[4/3] md:aspect-auto overflow-hidden">
                <img
                  src={newProducts[0].image}
                  alt={newProducts[0].name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-[#38252B] text-[#FFF9F5] text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full border border-[#C6A56B]/40">
                  Edition Premiere
                </span>
              </div>

              <div className="md:w-1/2 p-8 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-xs font-medium text-[#C6A56B] uppercase tracking-widest">
                    {newProducts[0].category}
                  </span>
                  <h3 className="font-serif-luxury text-2xl font-bold text-[#38252B] mt-1">
                    {newProducts[0].name}
                  </h3>
                  <p className="text-xs text-[#38252B]/70 mt-3 leading-relaxed">
                    {newProducts[0].description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#C6A56B]/20 space-y-2">
                    <p className="text-[11px] font-semibold text-[#38252B] uppercase tracking-wider">Key Ingredients:</p>
                    <div className="flex flex-wrap gap-1.5 text-[11px] text-[#38252B]/70 font-mono">
                      {newProducts[0].ingredients.map((ing, i) => (
                        <span key={i} className="bg-[#F5DDE3]/60 px-2.5 py-0.5 rounded">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[#C6A56B]/20">
                  <span className="text-xl font-bold font-mono text-[#38252B] tabular-nums">
                    ${newProducts[0].price}.00
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onQuickView(newProducts[0])}
                      className="px-4 py-2 border border-[#C6A56B] text-[#38252B] hover:bg-[#F5DDE3] transition-colors rounded-full text-xs font-semibold uppercase tracking-wider"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onAddToCart(newProducts[0])}
                      className="px-5 py-2 bg-[#38252B] text-[#FFF9F5] hover:bg-[#C6A56B] transition-colors rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-md"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Acquire</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Spotlight Products Stack (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-8 justify-between">
            {newProducts.slice(1, 3).map((product: Product) => (
              <div
                key={product.id}
                className="bg-[#FFF9F5] rounded-3xl overflow-hidden border border-[#C6A56B]/30 p-5 flex items-center gap-5 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-32 aspect-square rounded-2xl overflow-hidden shrink-0 relative bg-[#F5DDE3]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between h-full space-y-2">
                  <div>
                    <span className="text-[10px] font-semibold text-[#C6A56B] uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h4 className="font-serif-luxury text-base font-bold text-[#38252B] line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#38252B]/70 line-clamp-1 mt-0.5">
                      {product.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-base font-bold font-mono text-[#38252B] tabular-nums">
                      ${product.price}.00
                    </span>
                    <button
                      onClick={() => onQuickView(product)}
                      className="p-2 text-[#38252B] hover:text-[#C6A56B] transition-colors rounded-full bg-[#F5DDE3]/50 hover:bg-[#F5DDE3]"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
