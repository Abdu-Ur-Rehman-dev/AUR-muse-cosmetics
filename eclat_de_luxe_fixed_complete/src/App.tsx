import React, { useState } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedCategories } from './components/FeaturedCategories';
import { BestSellers } from './components/BestSellers';
import { NewArrivals } from './components/NewArrivals';
import { LuxuryCollectionCampaign } from './components/LuxuryCollectionCampaign';
import { ShadeFinder } from './components/ShadeFinder';
import { SpecialOffers } from './components/SpecialOffers';
import { AboutSection } from './components/AboutSection';

import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { NewsletterFooter } from './components/NewsletterFooter';
import { ToastNotification } from './components/ToastNotification';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 1,
      selectedShade: 'Rouge Noir',
    },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([PRODUCTS[1].id]);

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  // Cart actions
  const handleAddToCart = (product: Product, selectedShade?: string, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedShade === (selectedShade || product.shades?.[0]?.name)
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedShade === (selectedShade || product.shades?.[0]?.name)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedShade: selectedShade || product.shades?.[0]?.name,
        },
      ];
    });

    setToastMessage(`Added "${product.name}" to your shopping bag.`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      setToastMessage(`Removed "${product.name}" from your wishlist.`);
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      setToastMessage(`Saved "${product.name}" to your wishlist.`);
    }
  };

  // Promo code
  const handleApplyPromoCode = (code: string) => {
    if (code.toUpperCase() === 'LUXE15') {
      setAppliedDiscount(15);
      setToastMessage('Promo code LUXE15 applied — 15% discount!');
      return true;
    }
    return false;
  };

  // Navigation scroll
  const handleNavigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FFF9F5] text-[#38252B] relative flex flex-col justify-between selection:bg-[#F5DDE3] selection:text-[#38252B]">
      
      {/* Navigation Header */}
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateToSection={handleNavigateToSection}
      />

      <main className="flex-1">
        {/* Full-Screen Hero Section */}
        <Hero
          onExploreClick={() => handleNavigateToSection('categories')}
          onShopClick={() => handleNavigateToSection('best-sellers')}
        />

        {/* Featured Categories Section */}
        <FeaturedCategories
          onSelectCategory={(catName) => {
            setActiveCategory(catName);
            handleNavigateToSection('best-sellers');
          }}
          selectedCategory={activeCategory}
        />

        {/* Best Sellers Product Catalog */}
        <BestSellers
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
        />

        {/* New Arrivals Editorial Showcase */}
        <NewArrivals
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onAddToCart={handleAddToCart}
        />

        {/* Luxury Brand Campaign */}
        <LuxuryCollectionCampaign
          onShopCollection={() => handleNavigateToSection('best-sellers')}
        />

        {/* Interactive Shade Finder */}
        <ShadeFinder
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setQuickViewProduct(prod)}
        />

        {/* Special Offers Banner */}
        <SpecialOffers
          onShopCollection={() => handleNavigateToSection('best-sellers')}
          onApplyPromoCode={handleApplyPromoCode}
        />

        {/* Clean Beauty Guarantees */}
        <AboutSection />
      </main>

      {/* Footer */}
      <NewsletterFooter
        onNavigateToSection={handleNavigateToSection}
        onShowToast={(msg) => setToastMessage(msg)}
      />

      {/* Drawers & Modals */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedDiscount={appliedDiscount}
        onApplyPromoCode={handleApplyPromoCode}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onQuickView={(prod) => setQuickViewProduct(prod)}
        onAddToCart={handleAddToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        appliedDiscount={appliedDiscount}
        onClearCart={handleClearCart}
      />

      {/* Toast Feedback */}
      <ToastNotification
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
}
