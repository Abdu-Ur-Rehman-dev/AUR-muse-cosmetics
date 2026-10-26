import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Search, X, ShoppingBag, Eye, Star } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onQuickView,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.shades?.some((s) => s.name.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#38252B]/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Content Container */}
      <div className="relative bg-[#FFF9F5] border border-[#C6A56B]/40 rounded-3xl max-w-2xl w-full shadow-2xl p-6 z-10 animate-in slide-in-from-top-10 duration-300">
        
        {/* Search Header Input */}
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-[#C6A56B] absolute left-4 pointer-events-none" />
          <input
            type="text"
            autoFocus
            placeholder="Search lipsticks, 24K foundations, rose elixirs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white border border-[#C6A56B]/30 rounded-full pl-12 pr-12 py-3.5 text-sm text-[#38252B] focus:outline-none focus:border-[#C6A56B] shadow-inner font-sans"
          />
          <button
            onClick={onClose}
            className="absolute right-3 p-1.5 text-[#38252B]/60 hover:text-[#38252B]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Suggestions Tag Cloud */}
        {!query && (
          <div className="mt-6 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#C6A56B]">
              Popular Searches:
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-medium">
              {['Rouge Noir', '24K Foundation', 'Rose Oil', 'Eye Palette', 'Velvet Blush'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-full bg-[#F5DDE3]/60 text-[#38252B] hover:bg-[#38252B] hover:text-white transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Search Results List */}
        {query && (
          <div className="mt-6 max-h-96 overflow-y-auto space-y-3">
            {searchResults.length === 0 ? (
              <p className="text-center py-8 text-xs text-[#38252B]/60">
                No luxury creations found matching "{query}". Try "Lipstick" or "Foundation".
              </p>
            ) : (
              searchResults.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-white rounded-2xl border border-[#C6A56B]/20 hover:border-[#C6A56B] transition-all"
                >
                  <div
                    onClick={() => {
                      onQuickView(product);
                      onClose();
                    }}
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 aspect-square object-cover rounded-xl border border-[#C6A56B]/20"
                    />
                    <div>
                      <span className="text-[10px] font-semibold text-[#C6A56B] uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h4 className="font-serif-luxury text-sm font-bold text-[#38252B] line-clamp-1">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#38252B]">
                        <span className="font-bold">${product.price}.00</span>
                        <span className="text-[10px] text-[#38252B]/60">
                          ★ {product.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onAddToCart(product);
                        onClose();
                      }}
                      className="p-2 bg-[#38252B] text-white hover:bg-[#C6A56B] rounded-full transition-colors"
                      aria-label="Add to cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
