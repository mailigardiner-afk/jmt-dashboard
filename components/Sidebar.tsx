'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PROPS, JMW_SITES, type Property } from '@/lib/data';
import type { FilterState } from '@/app/page';

interface SidebarProps {
  activeView: 'properties' | 'jmw';
  onViewChange: (v: 'properties' | 'jmw') => void;
  selectedPropId: string | null;
  onSelectProp: (id: string | null) => void;
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
}

export default function Sidebar({ activeView, onViewChange, selectedPropId, onSelectProp, filters, onFiltersChange }: SidebarProps) {
  const selectedProp = PROPS.find(p => p.id === selectedPropId) ?? null;

  return (
    <aside style={{
      width: 320,
      height: '100%',
      background: '#F5F3ED',
      borderRight: '1px solid #d4cfc5',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* View toggle */}
      <div style={{ display: 'flex', borderBottom: '1px solid #d4cfc5' }}>
        {(['properties', 'jmw'] as const).map(v => (
          <button
            key={v}
            onClick={() => { onViewChange(v); onSelectProp(null); }}
            style={{
              flex: 1,
              padding: '10px 0',
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'Arial, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              cursor: 'pointer',
              border: 'none',
              background: activeView === v ? '#666633' : 'transparent',
              color: activeView === v ? '#fff' : '#666633',
              transition: 'all 0.15s',
            }}
          >
            {v === 'properties' ? '🌿 Properties' : '🥾 John Muir Way'}
          </button>
        ))}
      </div>

      {activeView === 'properties' && !selectedProp && (
        <PropertyListWithFilters
          onSelect={onSelectProp}
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
      )}
      {activeView === 'properties' && selectedProp && (
        <PropertyDetail prop={selectedProp} onBack={() => onSelectProp(null)} />
      )}
      {activeView === 'jmw' && <JmwList />}
    </aside>
  );
}
