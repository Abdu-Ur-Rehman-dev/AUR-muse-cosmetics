import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { Product, SortOption } from '../types';
import { Heart, Eye, ShoppingBag, Star, Sparkles, Filter, SlidersHorizontal } from 'lucide-react';

interface BestSellersProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, shade?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  activeCategory,
  onSelectCategory,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const categories = ['All', 'Lipsticks', 'Foundations', 'Eyeshadow', 'Blush & Highlighters', 'Makeup Brushes', 'Skincare'];

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [activeCategory, sortBy]);

  return (
    <section id="best-sellers" className="py-20 bg-[#FFF9F5] relative border-t border-[#C6A56B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#C6A56B] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Haute Selection</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#38252B]">
              Best-Selling Creations
            </h2>
            <p className="text-sm text-[#38252B]/70 mt-1 max-w-xl">
              Award-winning formulas cherished by beauty connoisseurs worldwide.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-[#C6A56B]" />
            <span className="text-xs font-medium text-[#38252B] uppercase tracking-wider">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-[#FFF9F5] border border-[#C6A56B]/40 text-[#38252B] text-xs font-medium rounded-lg px-3 py-2 focus:outline-none focus:border-[#C6A56B] cursor-pointer"
            >
              <option value="featured">Featured Favorites</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Segmented Filter Buttons (Clean & Functional) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wider whitespace-nowrap shrink-0 transition-all duration-300 ${
                  isActive
                    ? 'bg-[#38252B] text-[#FFF9F5] shadow-md'
                    : 'bg-[#F5DDE3]/50 text-[#38252B] hover:bg-[#F5DDE3] border border-[#C6A56B]/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product: Product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="group relative bg-[#FFF9F5] rounded-2xl overflow-hidden border border-[#C6A56B]/20 hover:border-[#C6A56B] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                {/* Image Showcase */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F5DDE3]/30">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Secondary Image hover reveal if available */}
                  {product.secondaryImage && (
                    <img
                      src={product.secondaryImage}
                      alt={`${product.name} detail`}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  )}

                  {/* Product Badges (Unboxed/Minimalist) */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.bestSeller && (
                      <span className="text-[10px] font-semibold tracking-wider text-[#38252B] bg-[#F5DDE3] backdrop-blur-md px-2.5 py-1 rounded-md border border-[#C6A56B]/30 uppercase">
                        Bestseller
                      </span>
                    )}
                    {product.isNewArrival && (
                      <span className="text-[10px] font-semibold tracking-wider text-[#FFF9F5] bg-[#38252B] backdrop-blur-md px-2.5 py-1 rounded-md uppercase">
                        New Formula
                      </span>
                    )}
                  </div>

                  {/* Quick Action Floating Controls */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => onToggleWishlist(product)}
                      aria-label="Wishlist"
                      className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                        isWishlisted
                          ? 'bg-[#C98598] text-white'
                          : 'bg-[#FFF9F5]/90 text-[#38252B] hover:bg-[#C6A56B] hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={() => onQuickView(product)}
                      aria-label="Quick View"
                      className="w-9 h-9 rounded-full bg-[#FFF9F5]/90 text-[#38252B] hover:bg-[#C6A56B] hover:text-white flex items-center justify-center shadow-md transition-all duration-300"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Metadata & Info */}
                <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
                  <div>
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between text-xs text-[#38252B]/60 mb-1">
                      <span className="uppercase tracking-wider font-medium text-[11px] text-[#C6A56B]">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 font-mono text-[#38252B]">
                        <Star className="w-3.5 h-3.5 text-[#C6A56B] fill-current" />
                        <span className="tabular-nums font-semibold text-xs">{product.rating}</span>
                        <span className="text-[10px] text-[#38252B]/50">({product.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif-luxury text-lg font-bold text-[#38252B] line-clamp-1 group-hover:text-[#C6A56B] transition-colors">
                      {product.name}
                    </h3>

                    {/* Subtitle / Volume */}
                    <p className="text-xs text-[#38252B]/70 line-clamp-1 mt-0.5">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Shade Swatches Preview */}
                  {product.shades && product.shades.length > 0 && (
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-[#38252B]/60 tracking-wider uppercase font-medium">Shades:</span>
                      <div className="flex items-center gap-1">
                        {product.shades.slice(0, 4).map((shade, i) => (
                          <span
                            key={i}
                            title={shade.name}
                            className="w-3 h-3 rounded-full border border-black/20 shadow-inner"
                            style={{ backgroundColor: shade.colorCode }}
                          />
                        ))}
                        {product.shades.length > 4 && (
                          <span className="text-[9px] text-[#38252B]/60 font-mono">+{product.shades.length - 4}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Price & Primary Buy CTA */}
                  <div className="pt-3 border-t border-[#C6A56B]/15 flex items-center justify-between">
                    <div className="flex items-baseline gap-2 font-mono">
                      <span className="text-base font-bold text-[#38252B] tabular-nums">
                        ${product.price}.00
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#38252B]/50 line-through tabular-nums">
                          ${product.originalPrice}.00
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onAddToCart(product, product.shades?.[0]?.name)}
                      className="px-4 py-2 bg-[#38252B] text-[#FFF9F5] hover:bg-[#C6A56B] transition-colors rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-2 shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
