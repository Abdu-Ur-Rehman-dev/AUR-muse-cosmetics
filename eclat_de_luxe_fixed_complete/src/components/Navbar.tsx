import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onNavigateToSection: (sectionId: string) => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onNavigateToSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', sectionId: 'hero' },
    { label: 'Shop', sectionId: 'best-sellers' },
    { label: 'Collections', sectionId: 'categories' },
    { label: 'Shade Finder', sectionId: 'shade-finder' },
    { label: 'Special Offers', sectionId: 'special-offers' },
    { label: 'About', sectionId: 'about' },
  ];

  const handleNavClick = (sectionId: string) => {
    onNavigateToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-luxury py-3 shadow-sm border-b border-[#C6A56B]/20'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Single text element brand wordmark */}
            <button
              onClick={() => handleNavClick('hero')}
              className="text-left font-serif-luxury text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#38252B] hover:text-[#C6A56B] transition-colors whitespace-nowrap shrink-0 group"
            >
              ÉCLAT DE LUXE
              <span className="block text-[9px] tracking-[0.3em] font-sans font-normal text-[#C98598] uppercase">
                Maison de Beauté
              </span>
            </button>

            {/* Zone 2: 6 concise single-line nav links */}
            <nav className="hidden lg:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-[#38252B]/80">
              {navLinks.map((link) => (
                <button
                  key={link.sectionId}
                  onClick={() => handleNavClick(link.sectionId)}
                  className="hover:text-[#C6A56B] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C6A56B] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Zone 3: Interactive Action Icons */}
            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={onOpenSearch}
                aria-label="Search products"
                className="p-2 text-[#38252B] hover:text-[#C6A56B] transition-colors rounded-full hover:bg-[#F5DDE3]/40"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenWishlist}
                aria-label="Wishlist"
                className="p-2 text-[#38252B] hover:text-[#C6A56B] transition-colors rounded-full hover:bg-[#F5DDE3]/40 relative"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C98598] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={onOpenCart}
                aria-label="Shopping Cart"
                className="p-2 text-white bg-[#38252B] hover:bg-[#C6A56B] transition-colors rounded-full relative flex items-center gap-2 px-3 sm:px-4 py-2 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-[#FFF9F5]" />
                <span className="text-xs font-semibold tracking-wider font-mono">
                  {cartCount}
                </span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#38252B] hover:text-[#C6A56B] transition-colors"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#38252B]/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#FFF9F5] shadow-2xl p-6 flex flex-col justify-between border-l border-[#C6A56B]/30 animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#F5DDE3]">
                <span className="font-serif-luxury text-lg font-bold tracking-widest text-[#38252B]">
                  ÉCLAT DE LUXE
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#38252B] hover:text-[#C98598]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-5">
                {navLinks.map((link) => (
                  <button
                    key={link.sectionId}
                    onClick={() => handleNavClick(link.sectionId)}
                    className="text-left text-base font-medium text-[#38252B] hover:text-[#C6A56B] transition-colors py-2 border-b border-[#F5DDE3]/50 flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#C6A56B] opacity-40" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#F5DDE3] text-center text-xs text-[#38252B]/60">
              <p>Haute-Cosmétique Paris · Cruelty-Free</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
