import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Sparkles, Check, RefreshCw, ShoppingBag, ArrowRight } from 'lucide-react';

interface ShadeFinderProps {
  onAddToCart: (product: Product, shade?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ShadeFinder: React.FC<ShadeFinderProps> = ({ onAddToCart, onQuickView }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('Lipsticks');
  const [selectedFinish, setSelectedFinish] = useState<string>('Satin Silk');
  const [selectedUndertone, setSelectedUndertone] = useState<string>('Neutral Rose');

  const categories = ['Lipsticks', 'Foundations', 'Eyeshadow', 'Blush & Highlighters'];
  const finishes = ['Velvet Matte', 'Dewy Luminous', 'Satin Silk', 'Shimmer Sparkle'];
  const undertones = [
    { name: 'Neutral Rose', desc: 'Balanced undertones with soft rose tint', color: '#E8A2A8' },
    { name: 'Warm Honey', desc: 'Golden and peach undertones', color: '#D8A06B' },
    { name: 'Cool Pearl', desc: 'Porcelain and pink undertones', color: '#F2D5DA' },
  ];

  // Match logic
  const matchedProduct = PRODUCTS.find(
    (p) => p.category === selectedCategory
  ) || PRODUCTS[0];

  const handleReset = () => {
    setStep(1);
    setSelectedCategory('Lipsticks');
    setSelectedFinish('Satin Silk');
    setSelectedUndertone('Neutral Rose');
  };

  return (
    <section id="shade-finder" className="py-24 bg-[#FFF9F5] relative border-t border-[#C6A56B]/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#C6A56B] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Beauty Matcher</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#38252B]">
            Find Your Signature Formula
          </h2>
          <p className="text-sm text-[#38252B]/70">
            Answer 3 quick preferences to discover your bespoke makeup creation matched to your finish & undertone.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-10 text-xs font-medium text-[#38252B]">
          <span className={`px-3 py-1 rounded-full ${step === 1 ? 'bg-[#38252B] text-white' : 'bg-[#F5DDE3]'}`}>
            1. Category
          </span>
          <span className="text-[#C6A56B]">→</span>
          <span className={`px-3 py-1 rounded-full ${step === 2 ? 'bg-[#38252B] text-white' : 'bg-[#F5DDE3]'}`}>
            2. Desired Finish
          </span>
          <span className="text-[#C6A56B]">→</span>
          <span className={`px-3 py-1 rounded-full ${step === 3 ? 'bg-[#38252B] text-white' : 'bg-[#F5DDE3]'}`}>
            3. Undertone
          </span>
        </div>

        {/* Finder Card */}
        <div className="bg-[#FFF9F5] border border-[#C6A56B]/30 rounded-3xl p-8 shadow-xl max-w-3xl mx-auto">
          
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="font-serif-luxury text-2xl font-bold text-[#38252B] text-center">
                Which beauty category are you seeking today?
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setStep(2);
                    }}
                    className={`p-5 rounded-2xl border text-center transition-all duration-300 font-medium text-xs tracking-wider uppercase ${
                      selectedCategory === cat
                        ? 'border-[#C6A56B] bg-[#F5DDE3] text-[#38252B] shadow-md'
                        : 'border-[#C6A56B]/20 bg-white text-[#38252B]/80 hover:border-[#C6A56B]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="font-serif-luxury text-2xl font-bold text-[#38252B] text-center">
                What is your preferred finish texture?
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {finishes.map((finish) => (
                  <button
                    key={finish}
                    onClick={() => {
                      setSelectedFinish(finish);
                      setStep(3);
                    }}
                    className={`p-5 rounded-2xl border text-center transition-all duration-300 font-medium text-xs tracking-wider uppercase ${
                      selectedFinish === finish
                        ? 'border-[#C6A56B] bg-[#F5DDE3] text-[#38252B] shadow-md'
                        : 'border-[#C6A56B]/20 bg-white text-[#38252B]/80 hover:border-[#C6A56B]'
                    }`}
                  >
                    {finish}
                  </button>
                ))}
              </div>
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-[#38252B]/60 hover:text-[#38252B] underline"
                >
                  ← Back to Category
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="font-serif-luxury text-2xl font-bold text-[#38252B] text-center">
                Select your skin tone & undertone match:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {undertones.map((ut) => (
                  <button
                    key={ut.name}
                    onClick={() => {
                      setSelectedUndertone(ut.name);
                      setStep(4);
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 ${
                      selectedUndertone === ut.name
                        ? 'border-[#C6A56B] bg-[#F5DDE3] text-[#38252B] shadow-md'
                        : 'border-[#C6A56B]/20 bg-white text-[#38252B]/80 hover:border-[#C6A56B]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-5 h-5 rounded-full border border-black/20 shadow-sm shrink-0"
                        style={{ backgroundColor: ut.color }}
                      />
                      <div>
                        <p className="font-bold text-xs uppercase tracking-wider text-[#38252B]">
                          {ut.name}
                        </p>
                        <p className="text-[11px] text-[#38252B]/70 mt-0.5">{ut.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs font-semibold text-[#38252B]/60 hover:text-[#38252B] underline"
                >
                  ← Back to Finish
                </button>
              </div>
            </div>
          )}

          {step === 4 && matchedProduct && (
            <div className="space-y-6 text-center animate-in fade-in duration-500">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#C6A56B] uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-[#C6A56B]" />
                <span>Bespoke Match Result</span>
              </div>

              <div className="bg-white rounded-2xl border border-[#C6A56B]/30 p-6 flex flex-col md:flex-row items-center gap-6 text-left shadow-lg">
                <img
                  src={matchedProduct.image}
                  alt={matchedProduct.name}
                  className="w-32 aspect-square rounded-xl object-cover shrink-0 border border-[#C6A56B]/20"
                />

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#C6A56B] font-semibold uppercase">
                    <span>{selectedCategory}</span>
                    <span>·</span>
                    <span>{selectedFinish}</span>
                    <span>·</span>
                    <span>{selectedUndertone}</span>
                  </div>
                  <h4 className="font-serif-luxury text-2xl font-bold text-[#38252B]">
                    {matchedProduct.name}
                  </h4>
                  <p className="text-xs text-[#38252B]/70 leading-relaxed">
                    {matchedProduct.description}
                  </p>
                  <p className="font-mono text-lg font-bold text-[#38252B] pt-1">
                    ${matchedProduct.price}.00
                  </p>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
                  <button
                    onClick={() => onAddToCart(matchedProduct, matchedProduct.shades?.[0]?.name)}
                    className="px-6 py-3 bg-[#38252B] text-white hover:bg-[#C6A56B] transition-colors rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>
                  <button
                    onClick={() => onQuickView(matchedProduct)}
                    className="px-6 py-2.5 border border-[#C6A56B] text-[#38252B] hover:bg-[#F5DDE3] transition-colors rounded-full text-xs font-semibold uppercase tracking-wider text-center"
                  >
                    View Details
                  </button>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#38252B]/70 hover:text-[#38252B] transition-colors pt-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Start Matcher Over</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
