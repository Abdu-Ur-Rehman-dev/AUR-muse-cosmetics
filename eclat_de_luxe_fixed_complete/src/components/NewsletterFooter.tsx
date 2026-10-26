import React, { useState } from 'react';
import { Sparkles, ArrowRight, Instagram, Youtube, Facebook, ShieldCheck } from 'lucide-react';

interface NewsletterFooterProps {
  onNavigateToSection: (sectionId: string) => void;
  onShowToast: (message: string) => void;
}

export const NewsletterFooter: React.FC<NewsletterFooterProps> = ({
  onNavigateToSection,
  onShowToast,
}) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    onShowToast('Welcome to the Privé Society! 15% discount code sent to your inbox.');
    setEmail('');
  };

  return (
    <footer className="bg-[#38252B] text-[#FFF9F5] border-t border-[#C6A56B]/30 relative overflow-hidden">
      
      {/* Newsletter Section */}
      <div className="py-16 border-b border-[#C6A56B]/20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFF9F5]/5 p-8 sm:p-12 rounded-3xl border border-[#C6A56B]/30 max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#C6A56B] uppercase">
            <Sparkles className="w-4 h-4 text-[#C6A56B]" />
            <span>Le Club Privé</span>
          </div>

          <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#FFF9F5]">
            Join Our Exclusive Beauty Circle
          </h3>

          <p className="text-xs sm:text-sm text-[#FFF9F5]/80 max-w-lg mx-auto leading-relaxed">
            Subscribe to receive private invitations to limited-edition drops, complimentary samples, and 15% off your first haute-cosmétique purchase.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-[#FFF9F5] text-[#38252B] px-5 py-3.5 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-[#C6A56B] font-sans"
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-[#C6A56B] text-[#38252B] hover:bg-[#FFF9F5] transition-colors rounded-full text-xs font-bold uppercase tracking-widest shrink-0 flex items-center justify-center gap-2 shadow-md"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      </div>

      {/* Main Navigation Footer */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Identity & Mission (4 Columns) */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif-luxury text-2xl font-bold tracking-[0.2em] text-[#FFF9F5]">
              ÉCLAT DE LUXE
            </span>
            <p className="text-xs text-[#FFF9F5]/70 leading-relaxed max-w-sm">
              An international haute-cosmétique maison dedicated to pure botanical formulations, cold-extracted flower essences, and 24K mineral elegance.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[#C6A56B]">
              <a href="#instagram" aria-label="Instagram" className="hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#youtube" aria-label="YouTube" className="hover:text-white transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#facebook" aria-label="Facebook" className="hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (3 Columns) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif-luxury text-sm font-bold text-[#C6A56B] uppercase tracking-widest">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#FFF9F5]/80">
              <li>
                <button onClick={() => onNavigateToSection('best-sellers')} className="hover:text-[#C6A56B]">
                  Velvet Lipsticks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('best-sellers')} className="hover:text-[#C6A56B]">
                  24K Luminous Foundations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('best-sellers')} className="hover:text-[#C6A56B]">
                  Celestial Eyeshadows
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('best-sellers')} className="hover:text-[#C6A56B]">
                  Glass Glow Blushes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('best-sellers')} className="hover:text-[#C6A56B]">
                  24K Petal Elixir Oils
                </button>
              </li>
            </ul>
          </div>

          {/* Client Care (3 Columns) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif-luxury text-sm font-bold text-[#C6A56B] uppercase tracking-widest">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs text-[#FFF9F5]/80">
              <li><a href="#shipping" className="hover:text-[#C6A56B]">Complimentary Express Shipping</a></li>
              <li><a href="#returns" className="hover:text-[#C6A56B]">30-Day Pure Quality Guarantee</a></li>
              <li><a href="#shade" onClick={() => onNavigateToSection('shade-finder')} className="hover:text-[#C6A56B]">Shade & Undertone Matcher</a></li>
              <li><a href="#consultation" className="hover:text-[#C6A56B]">Virtual Concierge Consultation</a></li>
            </ul>
          </div>

          {/* Maison Standards (2 Columns) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif-luxury text-sm font-bold text-[#C6A56B] uppercase tracking-widest">
              Ethical Luxury
            </h4>
            <div className="space-y-2 text-[11px] text-[#FFF9F5]/70">
              <p>✓ 100% Leaping Bunny Cruelty-Free</p>
              <p>✓ Vegan Formulation</p>
              <p>✓ Zero Talc or Parabens</p>
              <p>✓ Recyclable Crystal Glass</p>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="py-6 border-t border-[#C6A56B]/20 text-center text-[11px] text-[#FFF9F5]/60 font-mono">
        <p>© {new Date().getFullYear()} ÉCLAT DE LUXE MAISON DE BEAUTÉ · ALL RIGHTS RESERVED.</p>
      </div>

    </footer>
  );
};
