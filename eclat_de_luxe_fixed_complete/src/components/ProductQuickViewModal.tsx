import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, Heart, ShoppingBag, Check, Shield, Sparkles } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedShade?: string, quantity?: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const [selectedShade, setSelectedShade] = useState<string>(
    product.shades?.[0]?.name || ''
  );
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    onAddToCart(product, selectedShade, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#38252B]/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div className="relative bg-[#FFF9F5] border border-[#C6A56B]/40 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-300 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-[#38252B] hover:text-white transition-colors flex items-center justify-center shadow-md text-[#38252B]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Image Showcase (5 Columns) */}
          <div className="md:col-span-5 bg-[#F5DDE3]/30 p-6 flex items-center justify-center relative">
            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg border border-[#C6A56B]/20">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.bestSeller && (
              <span className="absolute top-8 left-8 bg-[#38252B] text-[#FFF9F5] text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
                Bestseller
              </span>
            )}
          </div>

          {/* Right Column: Product Specs & Options (7 Columns) */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#C6A56B] uppercase tracking-widest">
                  {product.category} · {product.volume}
                </span>
                <div className="flex items-center gap-1 font-mono text-[#38252B]">
                  <Star className="w-4 h-4 text-[#C6A56B] fill-current" />
                  <span className="font-bold text-sm tabular-nums">{product.rating}</span>
                  <span className="text-xs text-[#38252B]/60">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#38252B]">
                {product.name}
              </h2>

              <p className="font-mono text-xl font-bold text-[#38252B] tabular-nums">
                ${product.price}.00
              </p>

              <p className="text-xs text-[#38252B]/80 leading-relaxed">
                {product.description}
              </p>

              {/* Shade Selection */}
              {product.shades && product.shades.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#38252B] uppercase tracking-wider">
                      Selected Shade:
                    </span>
                    <span className="font-medium text-[#C6A56B]">{selectedShade}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {product.shades.map((shade) => {
                      const isSelected = selectedShade === shade.name;
                      return (
                        <button
                          key={shade.name}
                          onClick={() => setSelectedShade(shade.name)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                            isSelected
                              ? 'border-[#38252B] bg-[#38252B] text-white shadow-sm'
                              : 'border-[#C6A56B]/30 bg-white text-[#38252B] hover:border-[#C6A56B]'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-inner"
                            style={{ backgroundColor: shade.colorCode }}
                          />
                          <span>{shade.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs font-semibold text-[#38252B] uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#C6A56B]/40 rounded-full bg-white px-3 py-1 font-mono text-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 text-[#38252B] hover:text-[#C6A56B] font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 font-semibold text-[#38252B]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 text-[#38252B] hover:text-[#C6A56B] font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Benefits Checklist */}
              <div className="pt-3 border-t border-[#C6A56B]/20 space-y-1.5 text-xs text-[#38252B]/80">
                {product.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C6A56B]" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-[#C6A56B]/20 flex items-center gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-[#38252B] text-[#FFF9F5] hover:bg-[#C6A56B] transition-colors rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                aria-label="Wishlist"
                className={`p-3.5 rounded-full border transition-colors ${
                  isWishlisted
                    ? 'bg-[#C98598] text-white border-[#C98598]'
                    : 'border-[#C6A56B] text-[#38252B] hover:bg-[#F5DDE3]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
