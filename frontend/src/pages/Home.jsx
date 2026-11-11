import React from 'react';
import HeroSection from '../components/HeroSection';
import RecentLinks from '../components/RecentLinks';
import FeatureGrid from '../components/FeatureGrid';
import BenefitsSection from '../components/BenefitsSection';
import StatisticsSection from '../components/StatisticsSection';
import FAQAccordion from '../components/FAQAccordion';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * Home Page Component
 * Complete recreation of the TinyURL homepage matching the reference video.
 */
export default function Home() {
  // Store user's generated demo links in localStorage
  const [recentLinks, setRecentLinks] = useLocalStorage('tinyurl_recent_links', []);

  // Add new link to history (most recent first)
  const handleLinkCreated = (newLink) => {
    setRecentLinks((prevLinks) => [newLink, ...prevLinks]);
  };

  // Remove a single link from history
  const handleRemoveLink = (id) => {
    setRecentLinks((prevLinks) => prevLinks.filter((item) => item.id !== id));
  };

  // Clear all recent links
  const handleClearAll = () => {
    setRecentLinks([]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section with Interactive URL Shortener and Your Recent Links */}
      <HeroSection
        recentLinks={recentLinks}
        onLinkCreated={handleLinkCreated}
        onRemoveLink={handleRemoveLink}
        onClearAll={handleClearAll}
      />

      {/* 2. TinyURL Plans Include (4-column feature section) */}
      <FeatureGrid />

      {/* 4. One-Stop Solution Benefits Section */}
      <BenefitsSection />

      {/* 5. Digital Transformation Statistics Section */}
      <StatisticsSection />

      {/* 6. Frequently Asked Questions Section */}
      <FAQAccordion />
    </div>
  );
}
