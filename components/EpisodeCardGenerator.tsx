'use client';

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { EpisodeCardRef, TextEffects } from './EpisodeCard';

const EpisodeCard = dynamic(() => import('./EpisodeCard'), {
  ssr: false,
});

// Data stream characters for background effect
const DATA_STREAM_CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

export default function EpisodeCardGenerator() {
  const cardRef = useRef<EpisodeCardRef>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  
  // State matching CodePen structure
  const [topText, setTopText] = useState('NEON');
  const [midText, setMidText] = useState('GENESIS');
  const [botText, setBotText] = useState('EVANGELION');
  const [epText, setEpText] = useState('EPISODE:26');
  const [titleText, setTitleText] = useState('Take care of yourself.');
  const [titleStyle, setTitleStyle] = useState<'serif' | 'sans'>('serif');
  const [titleAlign, setTitleAlign] = useState<'left' | 'center' | 'right'>('left');
  const [aspectRatio, setAspectRatio] = useState<'standard' | 'wide'>('standard');
  
  const [isExporting, setIsExporting] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'effects'>('content');
  const [canvasScale, setCanvasScale] = useState(0.65);
  
  // Effects state
  const [effects, setEffects] = useState<TextEffects>({
    glowEnabled: false,
    glowColor: '#ffffff',
    glowBlur: 20,
    glowOpacity: 0.8,
  });

  // Calculate canvas scale based on viewport
  useEffect(() => {
    const calculateScale = () => {
      const canvasWidth = aspectRatio === 'wide' ? 1280 : 900;
      const canvasHeight = aspectRatio === 'wide' ? 720 : 675;
      
      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Available space after header (48px) and editor panel (320px) and padding
      const availableWidth = viewportWidth - 48; // padding
      const availableHeight = viewportHeight - 48 - 320 - 100; // header - panel - button space
      
      // Calculate scale to fit
      const scaleX = availableWidth / canvasWidth;
      const scaleY = availableHeight / canvasHeight;
      
      // Use the smaller scale with safety margin
      const scale = Math.min(scaleX, scaleY) * 0.9;
      
      // Clamp between 0.35 and 0.8
      setCanvasScale(Math.max(0.35, Math.min(scale, 0.8)));
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [aspectRatio]);

  // Update time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleExport = async () => {
    if (cardRef.current) {
      setIsExporting(true);
      try {
        const dataUrl = cardRef.current.exportImage();
        if (dataUrl) {
          const link = document.createElement('a');
          link.download = `evangelion-${botText.toLowerCase().replace(/\s+/g, '-')}.png`;
          link.href = dataUrl;
          link.click();
        }
      } catch (error) {
        console.error('Export error:', error);
      } finally {
        setIsExporting(false);
      }
    }
  };

  const updateEffect = <K extends keyof TextEffects>(key: K, value: TextEffects[K]) => {
    setEffects(prev => ({ ...prev, [key]: value }));
  };

  const presets = [
    { topText: 'NEON', midText: 'GENESIS', botText: 'EVANGELION', epText: 'EPISODE:01', titleText: 'Angel Attack', titleStyle: 'serif' as const, titleAlign: 'left' as const },
    { topText: 'NEON', midText: 'GENESIS', botText: 'EVANGELION', epText: 'EPISODE:02', titleText: 'The Beast', titleStyle: 'serif' as const, titleAlign: 'left' as const },
    { topText: 'NEON', midText: 'GENESIS', botText: 'EVANGELION', epText: 'EPISODE:12', titleText: 'She said, "Don\'t make others suffer\nfor your personal hatred."', titleStyle: 'serif' as const, titleAlign: 'left' as const },
    { topText: 'NEON', midText: 'GENESIS', botText: 'EVANGELION', epText: 'EPISODE:26', titleText: 'Take care of yourself.', titleStyle: 'serif' as const, titleAlign: 'left' as const },
    { topText: '', midText: '', botText: 'THE END OF EVANGELION', epText: '', titleText: 'One More Final: I need you.', titleStyle: 'sans' as const, titleAlign: 'center' as const },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setTopText(preset.topText);
    setMidText(preset.midText);
    setBotText(preset.botText);
    setEpText(preset.epText);
    setTitleText(preset.titleText);
    setTitleStyle(preset.titleStyle);
    setTitleAlign(preset.titleAlign);
  };

  // Generate random data stream characters
  const generateDataStream = () => {
    return Array.from({ length: 50 }, () => 
      DATA_STREAM_CHARS[Math.floor(Math.random() * DATA_STREAM_CHARS.length)]
    ).join('');
  };

  return (
    <div className="min-h-screen magi-grid relative crt-flicker overflow-hidden">
      {/* CRT Overlay */}
      <div className="crt-overlay" />
      
      {/* Background Data Streams */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-magi-green-dim text-xs font-mono whitespace-nowrap"
            style={{
              left: `${i * 10}%`,
              top: `${Math.random() * 100}%`,
              animation: `dataStream ${8 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {generateDataStream()}
          </div>
        ))}
      </div>

      {/* Top Bar - Native App Style */}
      <header className="relative z-10 bg-magi-bg-panel border-b border-magi-grid">
        <div className="h-12 flex items-center px-4">
          {/* Window Controls */}
          <div className="flex items-center gap-2 mr-6">
            <div className="w-3 h-3 rounded-full bg-magi-red" />
            <div className="w-3 h-3 rounded-full bg-magi-amber" />
            <div className="w-3 h-3 rounded-full bg-magi-green" />
          </div>
          
          {/* App Title */}
          <div className="flex items-center gap-3 flex-1">
            <div className="w-2 h-2 bg-magi-cyan animate-pulse" />
            <h1 className="text-lg font-bold text-magi-cyan tracking-widest">
              MAGI SYSTEM
            </h1>
            <span className="text-magi-text-dim">—</span>
            <span className="text-magi-text text-sm">Episode Card Generator</span>
          </div>
          
          {/* System Info & Export */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-magi-text-dim">NERV TOKYO-3</span>
            <span className="text-magi-cyan font-mono bg-magi-bg px-3 py-1 border border-magi-grid">
              {currentTime.toLocaleTimeString('en-US', { hour12: false })}
            </span>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="bg-magi-amber hover:bg-magi-amber/90 text-magi-bg font-bold py-1.5 px-4 text-xs transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {isExporting ? '...' : 'EXPORT PNG'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Native App Layout */}
      <main className="relative z-10 h-[calc(100vh-48px)] flex flex-col">
        
        {/* Preview Area - Fixed height with proper scaling */}
        <div className="flex-1 bg-magi-bg min-h-0 relative">
          {/* Scaled Canvas Container */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="relative">
              {/* Canvas Wrapper with Transform */}
              <div 
                className="bg-black border-2 border-magi-grid shadow-2xl shadow-magi-cyan/10"
                style={{
                  transform: `scale(${canvasScale})`,
                  transformOrigin: 'center center',
                }}
              >
                {/* Frame Header */}
                <div className="bg-magi-bg-panel border-b border-magi-grid px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-magi-cyan text-xs">◉</span>
                    <span className="text-magi-text text-xs tracking-wider">PREVIEW</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2 bg-magi-bg px-2 py-1 rounded">
                      <button 
                        onClick={() => setCanvasScale(Math.max(0.3, canvasScale - 0.1))}
                        className="text-magi-text-dim hover:text-magi-cyan transition-colors px-1"
                      >
                        −
                      </button>
                      <span className="text-magi-cyan font-mono w-12 text-center">
                        {Math.round(canvasScale * 100)}%
                      </span>
                      <button 
                        onClick={() => setCanvasScale(Math.min(1.0, canvasScale + 0.1))}
                        className="text-magi-text-dim hover:text-magi-cyan transition-colors px-1"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-magi-text-dim">{aspectRatio === 'wide' ? '1280×720' : '900×675'}</span>
                    <span className="w-2 h-2 bg-magi-green rounded-full animate-pulse" />
                  </div>
                </div>
                
                {/* Canvas */}
                <div className="p-1">
                  <EpisodeCard
                    ref={cardRef}
                    topText={topText}
                    midText={midText}
                    botText={botText}
                    epText={epText}
                    titleText={titleText}
                    titleStyle={titleStyle}
                    titleAlign={titleAlign}
                    aspectRatio={aspectRatio}
                    effects={effects}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editor Panel - Bottom Section */}
        <div className="h-80 bg-magi-bg-panel border-t border-magi-grid flex">
          
          {/* Left Sidebar - Tabs */}
          <div className="w-48 border-r border-magi-grid flex flex-col">
            <div className="p-4 border-b border-magi-grid">
              <span className="text-magi-text-dim text-xs tracking-widest">EDITOR</span>
            </div>
            
            <button
              onClick={() => setActiveTab('content')}
              className={`p-4 text-left transition-all border-l-2 ${
                activeTab === 'content' 
                  ? 'bg-magi-cyan/10 border-magi-cyan text-magi-cyan' 
                  : 'border-transparent text-magi-text hover:bg-magi-cyan/5 hover:text-magi-cyan'
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="font-medium">Content</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('style')}
              className={`p-4 text-left transition-all border-l-2 ${
                activeTab === 'style' 
                  ? 'bg-magi-cyan/10 border-magi-cyan text-magi-cyan' 
                  : 'border-transparent text-magi-text hover:bg-magi-cyan/5 hover:text-magi-cyan'
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <span className="font-medium">Style</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('effects')}
              className={`p-4 text-left transition-all border-l-2 ${
                activeTab === 'effects' 
                  ? 'bg-magi-cyan/10 border-magi-cyan text-magi-cyan' 
                  : 'border-transparent text-magi-text hover:bg-magi-cyan/5 hover:text-magi-cyan'
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="font-medium">Effects</span>
              </div>
            </button>
            
            <div className="flex-1" />
            
            {/* Quick Presets */}
            <div className="p-4 border-t border-magi-grid">
              <span className="text-magi-text-dim text-xs tracking-widest block mb-3">QUICK LOAD</span>
              <div className="space-y-1">
                {presets.slice(0, 4).map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyPreset(preset)}
                    className="w-full text-left px-2 py-1.5 text-xs text-magi-text-dim hover:text-magi-cyan hover:bg-magi-cyan/10 transition-all rounded"
                  >
                    {preset.epText || preset.botText}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            
            {/* Content Tab */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-magi-cyan text-lg font-bold">Content Editor</h2>
                  <div className="h-px flex-1 bg-magi-grid" />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  {/* Header Lines */}
                  <div className="space-y-4">
                    <h3 className="text-magi-amber text-sm tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-magi-amber rounded-full" />
                      HEADER
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-magi-text-dim text-xs block mb-1.5">First Line</label>
                        <input
                          type="text"
                          value={topText}
                          onChange={(e) => setTopText(e.target.value)}
                          className="w-full bg-magi-bg border border-magi-grid text-magi-text px-4 py-2.5 focus:outline-none focus:border-magi-cyan transition-colors font-mono text-sm"
                          placeholder="NEON"
                        />
                      </div>

                      <div>
                        <label className="text-magi-text-dim text-xs block mb-1.5">Second Line</label>
                        <input
                          type="text"
                          value={midText}
                          onChange={(e) => setMidText(e.target.value)}
                          className="w-full bg-magi-bg border border-magi-grid text-magi-text px-4 py-2.5 focus:outline-none focus:border-magi-cyan transition-colors font-mono text-sm"
                          placeholder="GENESIS"
                        />
                      </div>

                      <div>
                        <label className="text-magi-text-dim text-xs block mb-1.5">Third Line</label>
                        <input
                          type="text"
                          value={botText}
                          onChange={(e) => setBotText(e.target.value)}
                          className="w-full bg-magi-bg border border-magi-grid text-magi-text px-4 py-2.5 focus:outline-none focus:border-magi-cyan transition-colors font-mono text-sm"
                          placeholder="EVANGELION"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Title Section */}
                  <div className="space-y-4">
                    <h3 className="text-magi-amber text-sm tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-magi-amber rounded-full" />
                      TITLE
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-magi-text-dim text-xs block mb-1.5">Episode</label>
                        <input
                          type="text"
                          value={epText}
                          onChange={(e) => setEpText(e.target.value)}
                          className="w-full bg-magi-bg border border-magi-grid text-magi-text px-4 py-2.5 focus:outline-none focus:border-magi-cyan transition-colors font-mono text-sm"
                          placeholder="EPISODE:26"
                        />
                      </div>

                      <div>
                        <label className="text-magi-text-dim text-xs block mb-1.5">Title Text</label>
                        <textarea
                          value={titleText}
                          onChange={(e) => setTitleText(e.target.value)}
                          rows={4}
                          className="w-full bg-magi-bg border border-magi-grid text-magi-text px-4 py-2.5 focus:outline-none focus:border-magi-cyan transition-colors font-mono text-sm resize-none"
                          placeholder="Episode title..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Style Tab */}
            {activeTab === 'style' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-magi-cyan text-lg font-bold">Style Configuration</h2>
                  <div className="h-px flex-1 bg-magi-grid" />
                </div>
                
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-magi-bg border border-magi-grid p-4">
                    <label className="text-magi-text-dim text-xs block mb-3">Title Font</label>
                    <div className="space-y-2">
                      <button
                        onClick={() => setTitleStyle('serif')}
                        className={`w-full p-3 text-left border transition-all ${
                          titleStyle === 'serif' 
                            ? 'border-magi-cyan bg-magi-cyan/10 text-magi-cyan' 
                            : 'border-magi-grid text-magi-text hover:border-magi-cyan/50'
                        }`}
                      >
                        <div className="font-serif text-lg">Serif</div>
                        <div className="text-xs text-magi-text-dim mt-1">Times New Roman</div>
                      </button>
                      <button
                        onClick={() => setTitleStyle('sans')}
                        className={`w-full p-3 text-left border transition-all ${
                          titleStyle === 'sans' 
                            ? 'border-magi-cyan bg-magi-cyan/10 text-magi-cyan' 
                            : 'border-magi-grid text-magi-text hover:border-magi-cyan/50'
                        }`}
                      >
                        <div className="font-sans text-lg font-bold">Sans</div>
                        <div className="text-xs text-magi-text-dim mt-1">Helvetica Neue</div>
                      </button>
                    </div>
                  </div>

                  <div className="bg-magi-bg border border-magi-grid p-4">
                    <label className="text-magi-text-dim text-xs block mb-3">Alignment</label>
                    <div className="flex gap-2">
                      {(['left', 'center', 'right'] as const).map((align) => (
                        <button
                          key={align}
                          onClick={() => setTitleAlign(align)}
                          className={`flex-1 p-3 border transition-all ${
                            titleAlign === align 
                              ? 'border-magi-cyan bg-magi-cyan/10 text-magi-cyan' 
                              : 'border-magi-grid text-magi-text hover:border-magi-cyan/50'
                          }`}
                        >
                          <div className={`h-1 bg-current mb-1 ${align === 'left' ? 'w-1/2' : align === 'center' ? 'w-3/4 mx-auto' : 'w-1/2 ml-auto'}`} />
                          <div className={`h-1 bg-current mb-1 ${align === 'left' ? 'w-3/4' : align === 'center' ? 'w-1/2 mx-auto' : 'w-3/4 ml-auto'}`} />
                          <div className={`h-1 bg-current ${align === 'left' ? 'w-1/2' : align === 'center' ? 'w-3/4 mx-auto' : 'w-1/2 ml-auto'}`} />
                          <span className="text-xs mt-2 block capitalize">{align}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-magi-bg border border-magi-grid p-4">
                    <label className="text-magi-text-dim text-xs block mb-3">Aspect Ratio</label>
                    <div className="space-y-2">
                      <button
                        onClick={() => setAspectRatio('standard')}
                        className={`w-full p-3 border transition-all ${
                          aspectRatio === 'standard' 
                            ? 'border-magi-cyan bg-magi-cyan/10 text-magi-cyan' 
                            : 'border-magi-grid text-magi-text hover:border-magi-cyan/50'
                        }`}
                      >
                        <div className="text-sm font-medium">Standard</div>
                        <div className="text-xs text-magi-text-dim mt-1">900 × 675</div>
                      </button>
                      <button
                        onClick={() => setAspectRatio('wide')}
                        className={`w-full p-3 border transition-all ${
                          aspectRatio === 'wide' 
                            ? 'border-magi-cyan bg-magi-cyan/10 text-magi-cyan' 
                            : 'border-magi-grid text-magi-text hover:border-magi-cyan/50'
                        }`}
                      >
                        <div className="text-sm font-medium">Wide</div>
                        <div className="text-xs text-magi-text-dim mt-1">1280 × 720</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Effects Tab */}
            {activeTab === 'effects' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-magi-cyan text-lg font-bold">Visual Effects</h2>
                  <div className="h-px flex-1 bg-magi-grid" />
                </div>
                
                <div className="bg-magi-bg border border-magi-grid p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-6 rounded-full p-1 transition-colors ${effects.glowEnabled ? 'bg-magi-cyan' : 'bg-magi-grid'}`}>
                        <button
                          onClick={() => updateEffect('glowEnabled', !effects.glowEnabled)}
                          className={`w-4 h-4 bg-white rounded-full transition-transform ${effects.glowEnabled ? 'translate-x-4' : 'translate-x-0'}`}
                        />
                      </div>
                      <span className="text-magi-text font-medium">Glow Effect</span>
                    </div>
                    <span className="text-magi-text-dim text-sm">{effects.glowEnabled ? 'ON' : 'OFF'}</span>
                  </div>
                  
                  {effects.glowEnabled && (
                    <div className="pl-14 space-y-6 border-l-2 border-magi-grid ml-5">
                      <div>
                        <label className="text-magi-text-dim text-xs block mb-3">Glow Color</label>
                        <div className="flex gap-3">
                          {['#ffffff', '#00d4aa', '#ffb000', '#00ff41', '#ff0040'].map((color) => (
                            <button
                              key={color}
                              onClick={() => updateEffect('glowColor', color)}
                              className={`w-10 h-10 rounded-lg border-2 transition-all ${
                                effects.glowColor === color ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:border-magi-cyan/50'
                              }`}
                              style={{ backgroundColor: color, boxShadow: effects.glowColor === color ? `0 0 20px ${color}40` : 'none' }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="flex justify-between mb-2">
                            <label className="text-magi-text-dim text-xs">Blur Radius</label>
                            <span className="text-magi-cyan text-xs font-mono">{effects.glowBlur}px</span>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="50"
                            value={effects.glowBlur}
                            onChange={(e) => updateEffect('glowBlur', parseInt(e.target.value))}
                            className="w-full accent-magi-cyan h-1 bg-magi-grid rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <label className="text-magi-text-dim text-xs">Opacity</label>
                            <span className="text-magi-cyan text-xs font-mono">{Math.round(effects.glowOpacity * 100)}%</span>
                          </div>
                          <input
                            type="range"
                            min="0.1"
                            max="1"
                            step="0.1"
                            value={effects.glowOpacity}
                            onChange={(e) => updateEffect('glowOpacity', parseFloat(e.target.value))}
                            className="w-full accent-magi-cyan h-1 bg-magi-grid rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="h-8 bg-magi-bg border-t border-magi-grid flex items-center px-4 justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="text-magi-text-dim">Ready</span>
            <span className="text-magi-cyan">MAGI-01</span>
            <span className="text-magi-green">● ONLINE</span>
          </div>
          <div className="flex items-center gap-6 text-magi-text-dim">
            <span>Fonts: Times New Roman, Helvetica Neue</span>
            <span>Render: Konva.js</span>
            <span>© NERV / Project Eva</span>
          </div>
        </div>
      </main>
    </div>
  );
}
