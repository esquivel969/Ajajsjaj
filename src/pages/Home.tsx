import React from 'react';
import Hero from '../components/Hero';
import FeaturesSection from '../components/FeaturesSection';
import BestSellers from '../components/BestSellers';
import FeaturedOffer from '../components/FeaturedOffer';
import LocationMap from '../components/LocationMap';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedOffer />
      <FeaturesSection />
      <BestSellers />
      <LocationMap />
    </div>
  );
};

export default Home;