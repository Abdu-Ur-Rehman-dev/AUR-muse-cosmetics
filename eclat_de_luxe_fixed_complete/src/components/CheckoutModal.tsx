import React, { useState } from 'react';
import { CartItem } from '../types';
import confetti from 'canvas-confetti';
import { X, CheckCircle, ShieldCheck, Sparkles, CreditCard, Truck } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedDiscount: number;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  appliedDiscount,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('card');
  const [orderId, setOrderId] = useState('');

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const finalTotal = subtotal - discountAmount + estimatedTax;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !address || !city) return;

    const generatedId = `ECLAT-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep('success');

    // Confetti celebration explosion!
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C6A56B', '#F5DDE3', '#C98598', '#38252B'],
    });

    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark Backdrop */}
      <div
        className="fixed inset-0 bg-[#38252B]/70 backdrop-blur-md transition-opacity"
        onClick={step === 'success' ? onClose : undefined}
      />

      {/* Modal Dialog Box */}
      <div className="relative bg-[#FFF9F5] border border-[#C6A56B]/40 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-[#38252B] hover:text-white transition-colors flex items-center justify-center text-[#38252B]"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div className="p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            
            <div className="border-b border-[#F5DDE3] pb-4 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C6A56B] uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Haute Checkout</span>
              </div>
              <h2 className="font-serif-luxury text-2xl font-bold text-[#38252B]">
                Delivery & Payment Details
              </h2>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              
              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#38252B] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white border border-[#C6A56B]/30 rounded-xl px-4 py-2.5 text-xs text-[#38252B] focus:outline-none focus:border-[#C6A56B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#38252B] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="eleanor@maison.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#C6A56B]/30 rounded-xl px-4 py-2.5 text-xs text-[#38252B] focus:outline-none focus:border-[#C6A56B]"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#38252B] mb-1">
                  Shipping Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="740 Park Avenue, Apt 12B"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white border border-[#C6A56B]/30 rounded-xl px-4 py-2.5 text-xs text-[#38252B] focus:outline-none focus:border-[#C6A56B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#38252B] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="New York"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white border border-[#C6A56B]/30 rounded-xl px-4 py-2.5 text-xs text-[#38252B] focus:outline-none focus:border-[#C6A56B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#38252B] mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    placeholder="10021"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-white border border-[#C6A56B]/30 rounded-xl px-4 py-2.5 text-xs text-[#38252B] focus:outline-none focus:border-[#C6A56B] font-mono"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#38252B] mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#38252B] bg-[#38252B] text-white shadow-sm'
                        : 'border-[#C6A56B]/30 bg-white text-[#38252B]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#C6A56B]" />
                    <div>
                      <p className="text-xs font-bold">Credit Card (Demo)</p>
                      <p className="text-[10px] opacity-70">Instant secure authorization</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#38252B] bg-[#38252B] text-white shadow-sm'
                        : 'border-[#C6A56B]/30 bg-white text-[#38252B]'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-[#C6A56B]" />
                    <div>
                      <p className="text-xs font-bold">Cash on Delivery</p>
                      <p className="text-[10px] opacity-70">Pay upon courier arrival</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Order Total Line */}
              <div className="p-4 bg-[#F5DDE3]/40 rounded-2xl border border-[#C6A56B]/20 flex items-center justify-between font-mono text-sm">
                <span className="font-bold text-[#38252B]">Total Due Today:</span>
                <span className="font-bold text-lg text-[#38252B] tabular-nums">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#38252B] text-[#FFF9F5] hover:bg-[#C6A56B] transition-colors rounded-full text-xs font-bold uppercase tracking-widest shadow-xl"
              >
                Confirm Order (${finalTotal.toFixed(2)})
              </button>
            </form>

          </div>
        ) : (
          /* Confirmation State */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#F5DDE3] text-[#C6A56B] mx-auto flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[#C6A56B]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#C6A56B] uppercase tracking-widest">
                Order Confirmed
              </span>
              <h2 className="font-serif-luxury text-3xl font-bold text-[#38252B]">
                Thank You, {fullName}!
              </h2>
              <p className="text-xs text-[#38252B]/80 max-w-md mx-auto">
                Your order <span className="font-mono font-bold text-[#38252B]">{orderId}</span> has been received and is currently being prepared in our Paris atelier.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#C6A56B]/30 text-left text-xs text-[#38252B] space-y-2 font-mono max-w-md mx-auto shadow-sm">
              <div className="flex justify-between border-b border-[#F5DDE3] pb-2">
                <span>Confirmation ID:</span>
                <span className="font-bold">{orderId}</span>
              </div>
              <div className="flex justify-between border-b border-[#F5DDE3] pb-2">
                <span>Shipping To:</span>
                <span className="truncate max-w-[200px]">{address}, {city}</span>
              </div>
              <div className="flex justify-between border-b border-[#F5DDE3] pb-2">
                <span>Payment Method:</span>
                <span className="uppercase">{paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit Card Authorized'}</span>
              </div>
              <div className="flex justify-between font-bold pt-1">
                <span>Amount Charged:</span>
                <span className="text-sm">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-8 py-3.5 bg-[#38252B] text-white hover:bg-[#C6A56B] rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                Return to Storefront
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
