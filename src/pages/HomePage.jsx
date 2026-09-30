import React from 'react';
import HeroSlider from '../components/HeroSlider';
import FeaturesBanner from '../components/FeaturesBanner';
import CategoryBar from '../components/CategoryBar';
import ProductSection from '../components/ProductSection';
import EditorialBanner from '../components/EditorialBanner';
import ReviewsSection from '../components/ReviewsSection';
import CommunitySection from '../components/CommunitySection';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Carousel */}
      <HeroSlider />

      {/* 4 Feature Pillars (like Style Wid Glam) */}
      <FeaturesBanner />

      {/* Shop by Categories */}
      <CategoryBar />

      {/* New Arrivals & Hot Drops */}
      <ProductSection 
        title="NEW ARRIVALS" 
        subtitle="Discover the freshest drops, oversized streetwear & co-ords" 
      />

      {/* Editorial Lookbook Banner */}
      <EditorialBanner />

      {/* Best Sellers Showcase */}
      <ProductSection 
        title="TOP RATED & BEST SELLERS" 
        subtitle="Customer favorites engineered for timeless streetwear comfort" 
      />

      {/* Happy Customers Testimonials */}
      <ReviewsSection />

      {/* Community & Facebook Connection */}
      <CommunitySection />
    </div>
  );
}
