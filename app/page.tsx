'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

const JmtMap = dynamic(() => import('@/components/JmtMap'), { ssr: false });

export type FilterState = {
  location: string;
  status: string;
  threats: string[];
  layers: string[];
};

const DEFAULT_FILTERS: FilterState = {
  location: 'all',
  status: 'all',
  threats: [],
  layers: [],
};

export default function Home() {
  const [activeView, setActiveView] = useState<'properties' | 'jmw'>('properties');
  const [selectedPropId, setSelectedPropId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 60, zIndex: 2000,
        background: '#666633', borderBottom: '2px solid #37563E',
        display: 'flex', alignItems: 'center', padding: '0 16px',
        boxShadow: '0 2px 8px rgba(54,51,15,.35)',
      }}>
        <img src="/assets/jmt-logo.jpg" alt="John Muir Trust" style={{ height: 44, width: 'auto', borderRadius: 4 }} />
        <div style={{ marginLeft: 12, fontFamily: "Times, 'Times New Roman', serif", color: '#fff', fontWeight: 700, fontSize: 16 }}>
          JMT Properties Dashboard
        </div>
        <div style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'Arial, sans-serif' }}>
          Scottish Rainforest &amp; Wild Land
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', width: '100%', paddingTop: 60, height: '100%' }}>
        <div style={{ flexShrink: 0, height: '100%' }}>
          <Sidebar
            activeView={activeView}
            onViewChange={setActiveView}
            selectedPropId={selectedPropId}
            onSelectProp={setSelectedPropId}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>
        <div style={{ flex: 1, height: '100%', position: 'relative' }}>
          <JmtMap
            activeView={activeView}
            selectedPropId={selectedPropId}
            onSelectProp={setSelectedPropId}
            filters={filters}
          />
        </div>
      </div>
    </div>
  );
}
