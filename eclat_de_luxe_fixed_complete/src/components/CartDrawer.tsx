import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  appliedDiscount: number;
  onApplyPromoCode: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedDiscount,
  onApplyPromoCode,
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(appliedDiscount > 0);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const discountAmount = (subtotal * appliedDiscount) / 100;
  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const finalTotal = subtotal - discountAmount + estimatedTax;

  const freeDeliveryThreshold = 120;
  const progressPercent = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyPromoCode(promoInput.trim());
    if (success) {
      setPromoSuccess(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "LUXE15"');
      setPromoSuccess(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Backdrop */}
      <div
        className="fixed inset-0 bg-[#38252B]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF9F5] border-l border-[#C6A56B]/30 shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-[#F5DDE3] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#38252B]" />
              <h2 className="font-serif-luxury text-xl font-bold text-[#38252B]">
                Your Shopping Bag
              </h2>
              <span className="text-xs font-mono text-[#C6A56B] bg-[#F5DDE3] px-2.5 py-0.5 rounded-full font-bold">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#38252B] hover:text-[#C98598] transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#F5DDE3]/50 px-6 py-3 border-b border-[#C6A56B]/20 text-xs text-[#38252B]">
            {remainingForFreeDelivery > 0 ? (
              <p>
                Add <span className="font-bold font-mono">${remainingForFreeDelivery.toFixed(0)}</span> more for <span className="font-bold text-[#C6A56B]">Free Express Delivery</span>
              </p>
            ) : (
              <p className="font-bold text-[#C6A56B] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> You unlocked Complimentary Express Delivery!
              </p>
            )}
            <div className="w-full bg-white h-1.5 rounded-full mt-2 overflow-hidden border border-[#C6A56B]/20">
              <div
                className="bg-[#C6A56B] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4 text-[#38252B]/60">
                <ShoppingBag className="w-12 h-12 mx-auto text-[#C6A56B]/40 stroke-[1.2]" />
                <p className="font-serif-luxury text-lg font-bold text-[#38252B]">
                  Your bag is currently empty
                </p>
                <p className="text-xs max-w-xs mx-auto">
                  Explore our luxury lipsticks, 24K foundations, and mineral palettes to begin your beauty journey.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-2.5 bg-[#38252B] text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#C6A56B] transition-colors"
                >
                  Explore Creations
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 bg-white rounded-2xl border border-[#C6A56B]/20 shadow-sm"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 aspect-square object-cover rounded-xl shrink-0 border border-[#C6A56B]/20"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-serif-luxury text-sm font-bold text-[#38252B] line-clamp-1">
                          {item.product.name}
                        </h4>
                        {item.selectedShade && (
                          <p className="text-[11px] text-[#C6A56B] font-medium">
                            Shade: {item.selectedShade}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#38252B]/40 hover:text-[#C98598] p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#C6A56B]/30 rounded-full px-2 py-0.5 bg-[#FFF9F5] font-mono text-xs">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="px-1.5 text-[#38252B] hover:text-[#C6A56B] font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 text-[#38252B] font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="px-1.5 text-[#38252B] hover:text-[#C6A56B] font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono text-sm font-bold text-[#38252B] tabular-nums">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[#F5DDE3] bg-white space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCode} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Promo Code (LUXE15)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full bg-[#FFF9F5] border border-[#C6A56B]/30 rounded-full px-4 py-2 text-xs text-[#38252B] focus:outline-none focus:border-[#C6A56B] font-mono"
                  />
                  <Tag className="w-3.5 h-3.5 text-[#C6A56B] absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#38252B] text-white hover:bg-[#C6A56B] rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
                >
                  Apply
                </button>
              </form>

              {promoSuccess && (
                <p className="text-[11px] text-emerald-700 font-medium">
                  ✓ 15% LUXE15 discount applied to order!
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-rose-600 font-medium">{promoError}</p>
              )}

              {/* Price Breakdown Table */}
              <div className="space-y-1.5 text-xs text-[#38252B]/80 font-mono">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#C98598] font-bold">
                    <span>Discount (15%)</span>
                    <span className="tabular-nums">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="tabular-nums">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#38252B] pt-2 border-t border-[#F5DDE3]">
                  <span>Total</span>
                  <span className="tabular-nums">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-4 bg-[#38252B] text-[#FFF9F5] hover:bg-[#C6A56B] transition-all duration-300 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#38252B]/60 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C6A56B]" />
                Secure Haute-Cosmétique Checkout · Free Returns
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
