import React from 'react';
import { CATEGORIES } from '../data/products';
import { CategoryItem } from '../types';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface FeaturedCategoriesProps {
  onSelectCategory: (categoryName: string) => void;
  selectedCategory: string;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  return (
    <section id="categories" className="py-20 bg-[#FFF9F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#C6A56B] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Taxonomy</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#38252B] tracking-tight">
            Featured Categories
          </h2>
          <p className="text-sm text-[#38252B]/70 font-normal">
            Explore haute-cosmétique collections formulated with pure botanical extracts, mineral pigments, and silk micro-textures.
          </p>
        </div>

        {/* Categories Grid (3 Columns Desktop, 2 Tablet, 1 Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((category: CategoryItem) => {
            const isSelected = selectedCategory === category.name;
            return (
              <div
                key={category.id}
                onClick={() => onSelectCategory(category.name)}
                className={`group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-md transition-all duration-500 hover:shadow-2xl border ${
                  isSelected ? 'border-[#C6A56B] ring-2 ring-[#C6A56B]/30' : 'border-[#C6A56B]/20 hover:border-[#C6A56B]'
                }`}
              >
                {/* Category Product Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Gradient Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#38252B]/85 via-[#38252B]/30 to-transparent transition-opacity duration-300 group-hover:from-[#38252B]/90" />

                {/* Category Text & Actions */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-[#FFF9F5]">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-mono tracking-widest text-[#F5DDE3] uppercase bg-[#38252B]/60 backdrop-blur-md px-3 py-1 rounded-full border border-[#C6A56B]/30">
                      {category.productCount} Creations
                    </span>
                    <div className="w-9 h-9 rounded-full bg-[#FFF9F5]/20 backdrop-blur-md flex items-center justify-center text-[#FFF9F5] group-hover:bg-[#C6A56B] group-hover:text-[#38252B] transition-all duration-300 transform group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif-luxury text-2xl font-bold tracking-wide text-[#FFF9F5] group-hover:text-[#F5DDE3] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-[#F5DDE3]/80 font-light mt-1 line-clamp-1">
                      {category.subtitle}
                    </p>
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
