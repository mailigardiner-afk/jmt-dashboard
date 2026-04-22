'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PROPS, JMW_SITES, type Property } from '@/lib/data';

interface SidebarProps {
  activeView: 'properties' | 'jmw';
  onViewChange: (v: 'properties' | 'jmw') => void;
  selectedPropId: string | null;
  onSelectProp: (id: string | null) => void;
}

export default function Sidebar({ activeView, onViewChange, selectedPropId, onSelectProp }: SidebarProps) {
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

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {activeView === 'properties' && !selectedProp && <PropertyList onSelect={onSelectProp} />}
        {activeView === 'properties' && selectedProp && <PropertyDetail prop={selectedProp} onBack={() => onSelectProp(null)} />}
        {activeView === 'jmw' && <JmwList />}
      </div>
    </aside>
  );
}

// ── Property list ─────────────────────────────────────────────────────────────
function PropertyList({ onSelect }: { onSelect: (id: string) => void }) {
  const total = PROPS.reduce((s, p) => s + p.totalHa, 0);
  const rfTotal = PROPS.reduce((s, p) => s + (p.rfHa ?? 0), 0);

  return (
    <div style={{ padding: '12px 14px' }}>
      <div style={{
        background: '#37563E', color: '#fff', borderRadius: 6, padding: '10px 14px',
        marginBottom: 12, fontFamily: 'Arial, sans-serif',
      }}>
        <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 4 }}>TOTAL ESTATE</div>
        <div style={{ fontSize: 22, fontWeight: 700 }}>{total.toLocaleString()} ha</div>
        <div style={{ fontSize: 11, marginTop: 4, opacity: 0.85 }}>
          🌿 {rfTotal} ha Scottish Rainforest
        </div>
      </div>

      {PROPS.map(p => (
        <button
          key={p.id}
          onClick={() => onSelect(p.id)}
          style={{
            display: 'flex', gap: 10, alignItems: 'center', width: '100%',
            background: '#fff', border: `2px solid ${p.color}`,
            borderRadius: 8, padding: '8px 10px', marginBottom: 8,
            cursor: 'pointer', textAlign: 'left', transition: 'box-shadow 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)')}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
        >
          <img
            src={`/assets/${p.photo}`}
            alt={p.name}
            style={{ width: 52, height: 40, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }}
          />
          <div style={{ fontFamily: 'Arial, sans-serif', minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#382F20' }}>{p.name}</div>
            <div style={{ fontSize: 11, color: '#6E6B63', marginTop: 1 }}>{p.sub}</div>
            <div style={{ fontSize: 11, color: '#6E6B63' }}>
              {p.totalHa.toLocaleString()} ha
              {p.rfHa ? ` · ${p.rfHa} ha rainforest` : ''}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ── Property detail ───────────────────────────────────────────────────────────
function PropertyDetail({ prop, onBack }: { prop: Property; onBack: () => void }) {
  const [tab, setTab] = useState<'overview' | 'restoration' | 'wildlife'>('overview');

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Back */}
      <button
        onClick={onBack}
        style={{ padding: '8px 14px', fontSize: 12, color: '#666633', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
      >
        ← All Properties
      </button>

      {/* Hero image */}
      <div style={{ position: 'relative', height: 140, overflow: 'hidden' }}>
        <img src={`/assets/${prop.photo}`} alt={prop.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
          padding: '20px 14px 8px',
        }}>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>{prop.name}</div>
          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12 }}>{prop.sub}</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', borderBottom: '1px solid #d4cfc5' }}>
        {[
          { label: 'Total', value: `${prop.totalHa.toLocaleString()} ha` },
          { label: 'Rainforest', value: prop.rfHa ? `${prop.rfHa} ha` : '—' },
          { label: 'Status', value: prop.status },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, padding: '8px 10px', textAlign: 'center', borderRight: '1px solid #d4cfc5' }}>
            <div style={{ fontSize: 10, color: '#6E6B63', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#382F20', marginTop: 2 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #d4cfc5' }}>
        {(['overview', 'restoration', 'wildlife'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1, padding: '8px 0', fontSize: 11, fontWeight: 600,
              textTransform: 'capitalize', cursor: 'pointer', border: 'none',
              background: tab === t ? '#F5F3ED' : 'transparent',
              color: tab === t ? '#666633' : '#6E6B63',
              borderBottom: tab === t ? '2px solid #666633' : '2px solid transparent',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ padding: '12px 14px' }}>
        {tab === 'overview' && (
          <>
            <p style={{ fontSize: 12, color: '#382F20', lineHeight: 1.6, marginBottom: 12 }}>{prop.desc}</p>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#37563E', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Threats</div>
            {prop.threats.map((t, i) => (
              <div key={i} style={{ fontSize: 11, color: '#382F20', marginBottom: 4, paddingLeft: 12, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#8E1537' }}>•</span>{t}
              </div>
            ))}
            {prop.wildlifePhotos?.map(([cap, img]) => (
              <div key={cap} style={{ marginTop: 10 }}>
                <img src={`/assets/${img}`} alt={cap} style={{ width: '100%', borderRadius: 6, objectFit: 'cover', maxHeight: 120 }} />
                <div style={{ fontSize: 11, color: '#6E6B63', marginTop: 4 }}>{cap}</div>
              </div>
            ))}
          </>
        )}
        {tab === 'restoration' && (
          <>
            {prop.restoration.map((r, i) => (
              <div key={i} style={{
                background: '#fff', border: '1px solid #d4cfc5', borderRadius: 6,
                padding: '8px 10px', marginBottom: 8,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#382F20', flex: 1 }}>{r.name}</div>
                  <span style={{
                    fontSize: 10, padding: '2px 6px', borderRadius: 10, marginLeft: 6, flexShrink: 0,
                    background: r.type === 'completed' ? '#d4edda' : r.type === 'planned' ? '#d1ecf1' : '#fff3cd',
                    color: r.type === 'completed' ? '#155724' : r.type === 'planned' ? '#0c5460' : '#856404',
                  }}>
                    {r.type}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: '#6E6B63', lineHeight: 1.5 }}>{r.note}</div>
              </div>
            ))}
          </>
        )}
        {tab === 'wildlife' && (
          <>
            <div style={{ marginBottom: 8 }}>
              {prop.wildlife.map((w, i) => (
                <div key={i} style={{ fontSize: 12, color: '#382F20', padding: '4px 0', borderBottom: '1px solid #f0ede6' }}>
                  🌿 {w}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: '#6E6B63', lineHeight: 1.5, marginTop: 8 }}>
              <strong>Funding:</strong> {prop.funding}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── JMW List ──────────────────────────────────────────────────────────────────
function JmwList() {
  return (
    <div style={{ padding: '12px 14px', fontFamily: 'Arial, sans-serif' }}>
      <img src="/assets/jmw-hero.jpg" alt="John Muir Way" style={{ width: '100%', borderRadius: 8, objectFit: 'cover', height: 100, marginBottom: 12 }} />
      <p style={{ fontSize: 12, color: '#382F20', lineHeight: 1.6, marginBottom: 12 }}>
        The 134-mile John Muir Way crosses Scotland from Helensburgh to Dunbar, passing through stunning landscapes and historic sites.
      </p>
      {JMW_SITES.map((s, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
          <img src={`/assets/${s.img}`} alt={s.name} style={{ width: 52, height: 40, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#382F20' }}>{s.icon} {s.name}</div>
            <div style={{ fontSize: 11, color: '#6E6B63', marginTop: 2, lineHeight: 1.4 }}>{s.desc}</div>
          </div>
        </div>
      ))}
      <a
        href="https://www.johnmuirtrust.org/john-muir-way"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block', textAlign: 'center', padding: '8px 0',
          background: '#37563E', color: '#fff', borderRadius: 6,
          fontSize: 12, fontWeight: 600, textDecoration: 'none', marginTop: 8,
        }}
      >
        Explore the full route →
      </a>
    </div>
  );
}
