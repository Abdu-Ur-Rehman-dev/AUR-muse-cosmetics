import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#38252B]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF9F5] border-l border-[#C6A56B]/30 shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-[#F5DDE3] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#C98598] fill-current" />
              <h2 className="font-serif-luxury text-xl font-bold text-[#38252B]">
                Your Wishlist
              </h2>
              <span className="text-xs font-mono text-[#C6A56B] bg-[#F5DDE3] px-2.5 py-0.5 rounded-full font-bold">
                {wishlistProducts.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#38252B] hover:text-[#C98598] transition-colors"
              aria-label="Close wishlist drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4 text-[#38252B]/60">
                <Heart className="w-12 h-12 mx-auto text-[#C98598]/30 stroke-[1.2]" />
                <p className="font-serif-luxury text-lg font-bold text-[#38252B]">
                  Your wishlist is empty
                </p>
                <p className="text-xs max-w-xs mx-auto">
                  Save your favorite haute-cosmétique creations here to review or acquire later.
                </p>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-4 bg-white rounded-2xl border border-[#C6A56B]/20 shadow-sm"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 aspect-square object-cover rounded-xl shrink-0 border border-[#C6A56B]/20"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-semibold text-[#C6A56B] uppercase tracking-wider">
                          {product.category}
                        </span>
                        <h4 className="font-serif-luxury text-sm font-bold text-[#38252B] line-clamp-1">
                          {product.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => onRemoveFromWishlist(product)}
                        className="text-[#38252B]/40 hover:text-[#C98598] p-1 transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-mono text-sm font-bold text-[#38252B] tabular-nums">
                        ${product.price}.00
                      </span>

                      <button
                        onClick={() => {
                          onAddToCart(product);
                          onRemoveFromWishlist(product);
                        }}
                        className="px-3.5 py-1.5 bg-[#38252B] text-white hover:bg-[#C6A56B] rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-[#F5DDE3] bg-white">
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#F5DDE3] text-[#38252B] hover:bg-[#38252B] hover:text-white transition-colors rounded-full text-xs font-bold uppercase tracking-wider text-center"
            >
              Continue Browsing
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
