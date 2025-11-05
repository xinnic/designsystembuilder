/**
 * Token System Demo Component
 *
 * Demonstrates the new 3-tier OKLCH token system with:
 * - 11-step color scales
 * - Semantic token mappings
 * - Real-time theme switching
 * - Dark mode support
 */

import React, { useState } from 'react';
import { useDesignSystem } from '../state/designSystem';
import { tokens, generateBrandPalette } from '../design-system/tokens';

export function TokenSystemDemo() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { primaryColor, setPrimaryColor } = useDesignSystem();

  // Generate brand palette from current primary color
  const brandPalette = generateBrandPalette(primaryColor);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">3-Tier Token System Demo</h2>
        <p className="text-gray-600">
          OKLCH colors • Semantic mappings • Real-time updates
        </p>
      </div>

      {/* Theme Controls */}
      <div className="flex gap-4">
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="px-4 py-2 rounded-lg border transition-colors"
          style={{
            backgroundColor: 'var(--color-primary-default)',
            color: 'var(--color-primary-foreground)',
            borderColor: 'var(--color-primary-border)'
          }}
        >
          Toggle Theme ({theme})
        </button>

        <input
          type="color"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
          className="h-10 w-20 rounded border cursor-pointer"
          style={{ borderColor: 'var(--color-border-default)' }}
        />
      </div>

      {/* Primitive Color Scales */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Tier 1: Primitive Tokens (11-step OKLCH scales)</h3>
        <div className="space-y-4">
          {/* Brand Scale */}
          <div>
            <h4 className="text-sm font-medium mb-2">Brand Color Scale</h4>
            <div className="flex gap-1">
              {Object.entries(brandPalette.brand).map(([step, color]) => (
                <div key={step} className="flex-1">
                  <div
                    className="h-12 rounded"
                    style={{ backgroundColor: color }}
                    title={`${step}: ${color}`}
                  />
                  <p className="text-xs text-center mt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gray Scale */}
          <div>
            <h4 className="text-sm font-medium mb-2">Gray Scale</h4>
            <div className="flex gap-1">
              {Object.entries(tokens.primitive.colors.gray).map(([step, color]) => (
                <div key={step} className="flex-1">
                  <div
                    className="h-12 rounded border"
                    style={{
                      backgroundColor: color,
                      borderColor: 'var(--color-border-subtle)'
                    }}
                    title={`${step}: ${color}`}
                  />
                  <p className="text-xs text-center mt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Status Colors */}
          <div className="grid grid-cols-4 gap-4">
            {['green', 'yellow', 'red', 'blue'].map((colorName) => (
              <div key={colorName}>
                <h4 className="text-sm font-medium mb-2 capitalize">{colorName}</h4>
                <div className="space-y-1">
                  {['100', '500', '900'].map((step) => {
                    const color = tokens.primitive.colors[colorName][step];
                    return (
                      <div
                        key={step}
                        className="h-8 rounded flex items-center px-2"
                        style={{ backgroundColor: color }}
                      >
                        <span
                          className="text-xs"
                          style={{ color: step === '100' ? '#000' : '#fff' }}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Semantic Tokens */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Tier 2: Semantic Tokens (theme-aware)</h3>
        <div className="grid grid-cols-2 gap-6">
          {/* Surface Layers */}
          <div>
            <h4 className="text-sm font-medium mb-3">Surface Layers</h4>
            <div className="space-y-2">
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: 'var(--color-canvas-default)' }}
              >
                <div className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
                  Canvas (Page Background)
                </div>
                <div
                  className="mt-2 p-3 rounded"
                  style={{ backgroundColor: 'var(--color-surface-default)' }}
                >
                  <div style={{ color: 'var(--color-text-primary)' }}>
                    Surface (Card)
                  </div>
                  <div
                    className="mt-2 p-2 rounded"
                    style={{ backgroundColor: 'var(--color-surface-elevated)' }}
                  >
                    <div style={{ color: 'var(--color-text-secondary)' }}>
                      Elevated Surface
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive States */}
          <div>
            <h4 className="text-sm font-medium mb-3">Interactive Colors</h4>
            <div className="space-y-2">
              {['primary', 'secondary', 'success', 'warning', 'danger'].map((variant) => (
                <div key={variant} className="flex gap-2">
                  <button
                    className="flex-1 px-3 py-2 rounded text-sm font-medium transition-all"
                    style={{
                      backgroundColor: `var(--color-${variant}-default)`,
                      color: `var(--color-${variant}-foreground)`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `var(--color-${variant}-hover)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `var(--color-${variant}-default)`;
                    }}
                  >
                    {variant}
                  </button>
                  <button
                    className="flex-1 px-3 py-2 rounded text-sm font-medium transition-all border"
                    style={{
                      backgroundColor: `var(--color-${variant}-subtle)`,
                      color: `var(--color-${variant}-text)`,
                      borderColor: `var(--color-${variant}-border)`,
                    }}
                  >
                    {variant} subtle
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Typography Scale */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Typography Tokens</h3>
        <div className="space-y-2">
          {['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'].map((size) => (
            <div
              key={size}
              style={{
                fontSize: `var(--font-size-${size})`,
                lineHeight: 'var(--line-height-normal)',
                color: 'var(--color-text-primary)'
              }}
            >
              Text {size} - The quick brown fox jumps over the lazy dog
            </div>
          ))}
        </div>
      </div>

      {/* Spacing Scale */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Spacing Tokens (8pt grid)</h3>
        <div className="flex gap-2 items-end">
          {[0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].map((space) => (
            <div key={space} className="text-center">
              <div
                className="bg-blue-500"
                style={{
                  width: `var(--spacing-${space})`,
                  height: `var(--spacing-${space})`,
                  backgroundColor: 'var(--color-primary-default)'
                }}
              />
              <p className="text-xs mt-1">{space}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Border Radius */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Border Radius Tokens</h3>
        <div className="flex gap-4">
          {['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'].map((radius) => (
            <div key={radius} className="text-center">
              <div
                className="w-16 h-16 border-2"
                style={{
                  borderRadius: `var(--radius-${radius})`,
                  backgroundColor: 'var(--color-primary-subtle)',
                  borderColor: 'var(--color-primary-border)'
                }}
              />
              <p className="text-xs mt-1">{radius}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Shadow Scale */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Shadow Tokens</h3>
        <div className="flex gap-4">
          {['xs', 'sm', 'md', 'lg', 'xl', '2xl'].map((shadow) => (
            <div key={shadow} className="text-center">
              <div
                className="w-20 h-20 rounded-lg flex items-center justify-center"
                style={{
                  boxShadow: `var(--shadow-${shadow})`,
                  backgroundColor: 'var(--color-surface-default)'
                }}
              >
                <span className="text-xs">{shadow}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}