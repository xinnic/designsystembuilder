/**
 * Color Scale Demo - Visual demonstration of 11-step scale semantic mapping
 *
 * Shows how semantic colors map to the 11-step OKLCH scale
 */

import React, { useState } from 'react';
import { useTokenSystem } from '../hooks/useTokenSystem';

export function ColorScaleDemo() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { tokens, brandPalette } = useTokenSystem(theme);

  // Scale steps for demonstration
  const scaleSteps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

  // Semantic mapping examples
  const semanticMappings = {
    light: {
      'text.primary': 'gray-900',
      'text.secondary': 'gray-600',
      'text.tertiary': 'gray-500',
      'text.disabled': 'gray-400',
      'surface.default': 'white',
      'surface.subtle': 'gray-50',
      'surface.hover': 'gray-100',
      'border.default': 'gray-200',
      'border.subtle': 'gray-100',
      'border.strong': 'gray-300',
      'primary.default': 'brand-500',
      'primary.hover': 'brand-600',
      'primary.active': 'brand-700',
      'primary.subtle': 'brand-50',
      'success.default': 'green-600',
      'success.subtle': 'green-50',
      'danger.default': 'red-600',
      'danger.subtle': 'red-50',
    },
    dark: {
      'text.primary': 'gray-50',
      'text.secondary': 'gray-400',
      'text.tertiary': 'gray-500',
      'text.disabled': 'gray-600',
      'surface.default': 'gray-900',
      'surface.subtle': 'gray-850',
      'surface.hover': 'gray-800',
      'border.default': 'gray-800',
      'border.subtle': 'gray-850',
      'border.strong': 'gray-700',
      'primary.default': 'brand-400',
      'primary.hover': 'brand-300',
      'primary.active': 'brand-500',
      'primary.subtle': 'brand-950',
      'success.default': 'green-400',
      'success.subtle': 'green-950',
      'danger.default': 'red-400',
      'danger.subtle': 'red-950',
    }
  };

  const currentMappings = semanticMappings[theme];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto" style={{ backgroundColor: theme === 'dark' ? '#111' : '#fff' }}>
      {/* Header with theme toggle */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
            11-Step Scale Semantic Mapping
          </h1>
          <p className="text-lg" style={{ color: theme === 'dark' ? '#999' : '#666' }}>
            Understanding how semantic colors use the 11-step OKLCH scale
          </p>
        </div>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="px-4 py-2 rounded-lg font-medium transition-colors"
          style={{
            backgroundColor: theme === 'dark' ? '#333' : '#f3f4f6',
            color: theme === 'dark' ? '#fff' : '#000'
          }}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Mode
        </button>
      </div>

      {/* Color Scale Visualization */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
          Gray Scale (Base for Text & Surfaces)
        </h2>

        <div className="grid grid-cols-11 gap-2">
          {scaleSteps.map((step) => {
            const isUsed = Object.values(currentMappings).some(v => v.includes(`gray-${step}`));
            return (
              <div key={step} className="text-center">
                <div
                  className={`h-16 rounded-lg border-2 ${isUsed ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}`}
                  style={{
                    backgroundColor: `var(--color-gray-${step})`,
                    borderColor: theme === 'dark' ? '#444' : '#ddd'
                  }}
                />
                <div className="mt-1 text-xs font-medium" style={{ color: theme === 'dark' ? '#999' : '#666' }}>
                  {step}
                </div>
                {isUsed && (
                  <div className="text-xs text-blue-500 font-semibold">Used</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Show what each step is used for */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {Object.entries(currentMappings)
            .filter(([_, value]) => value.includes('gray'))
            .map(([semantic, scale]) => (
              <div key={semantic} className="flex items-center gap-3 p-3 rounded-lg"
                   style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f9fafb' }}>
                <div
                  className="w-12 h-12 rounded border"
                  style={{
                    backgroundColor: scale === 'white' ? '#fff' : `var(--color-${scale})`,
                    borderColor: theme === 'dark' ? '#444' : '#ddd'
                  }}
                />
                <div>
                  <div className="font-medium text-sm" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                    {semantic}
                  </div>
                  <div className="text-xs" style={{ color: theme === 'dark' ? '#999' : '#666' }}>
                    {scale}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Brand Scale Visualization */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
          Brand Scale (Primary Actions)
        </h2>

        <div className="grid grid-cols-11 gap-2">
          {scaleSteps.map((step) => {
            const isUsed = Object.values(currentMappings).some(v => v === `brand-${step}`);
            return (
              <div key={step} className="text-center">
                <div
                  className={`h-16 rounded-lg border-2 ${isUsed ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}`}
                  style={{
                    backgroundColor: brandPalette?.brand?.[step] || '#ccc',
                    borderColor: theme === 'dark' ? '#444' : '#ddd'
                  }}
                />
                <div className="mt-1 text-xs font-medium" style={{ color: theme === 'dark' ? '#999' : '#666' }}>
                  {step}
                </div>
                {isUsed && (
                  <div className="text-xs text-blue-500 font-semibold">Used</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Semantic Mapping Rules */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
          Mapping Rules & Patterns
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Text Pattern */}
          <div className="p-4 rounded-lg border" style={{
            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f9fafb',
            borderColor: theme === 'dark' ? '#333' : '#e5e7eb'
          }}>
            <h3 className="font-semibold mb-3" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
              Text Colors
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: theme === 'dark' ? '#999' : '#666' }}>Primary:</span>
                <span className="font-mono" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                  {theme === 'light' ? '900' : '50'}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: theme === 'dark' ? '#999' : '#666' }}>Secondary:</span>
                <span className="font-mono" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                  {theme === 'light' ? '600' : '400'}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: theme === 'dark' ? '#999' : '#666' }}>Muted:</span>
                <span className="font-mono" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                  500
                </span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t text-xs" style={{
              borderColor: theme === 'dark' ? '#333' : '#e5e7eb',
              color: theme === 'dark' ? '#999' : '#666'
            }}>
              Rule: High contrast for readability
            </div>
          </div>

          {/* Surface Pattern */}
          <div className="p-4 rounded-lg border" style={{
            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f9fafb',
            borderColor: theme === 'dark' ? '#333' : '#e5e7eb'
          }}>
            <h3 className="font-semibold mb-3" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
              Surfaces
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: theme === 'dark' ? '#999' : '#666' }}>Canvas:</span>
                <span className="font-mono" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                  {theme === 'light' ? '50' : '950'}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: theme === 'dark' ? '#999' : '#666' }}>Card:</span>
                <span className="font-mono" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                  {theme === 'light' ? 'white' : '900'}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: theme === 'dark' ? '#999' : '#666' }}>Hover:</span>
                <span className="font-mono" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                  {theme === 'light' ? '100' : '800'}
                </span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t text-xs" style={{
              borderColor: theme === 'dark' ? '#333' : '#e5e7eb',
              color: theme === 'dark' ? '#999' : '#666'
            }}>
              Rule: Elevation through lightness
            </div>
          </div>

          {/* Interactive Pattern */}
          <div className="p-4 rounded-lg border" style={{
            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f9fafb',
            borderColor: theme === 'dark' ? '#333' : '#e5e7eb'
          }}>
            <h3 className="font-semibold mb-3" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
              Interactive
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: theme === 'dark' ? '#999' : '#666' }}>Default:</span>
                <span className="font-mono" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                  {theme === 'light' ? '500' : '400'}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: theme === 'dark' ? '#999' : '#666' }}>Hover:</span>
                <span className="font-mono" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                  {theme === 'light' ? '600' : '300'}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: theme === 'dark' ? '#999' : '#666' }}>Active:</span>
                <span className="font-mono" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                  {theme === 'light' ? '700' : '500'}
                </span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t text-xs" style={{
              borderColor: theme === 'dark' ? '#333' : '#e5e7eb',
              color: theme === 'dark' ? '#999' : '#666'
            }}>
              Rule: Progressive state changes
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="p-6 rounded-lg border" style={{
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f0f9ff',
        borderColor: theme === 'dark' ? '#333' : '#3b82f6'
      }}>
        <h3 className="font-semibold mb-3" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
          📋 Key Principles
        </h3>
        <ul className="space-y-2 text-sm" style={{ color: theme === 'dark' ? '#ccc' : '#333' }}>
          <li>• <strong>Contrast:</strong> Maintain 600+ steps between text and background (e.g., 900 on white)</li>
          <li>• <strong>Symmetry:</strong> Light mode 200 → Dark mode 800 (inverse mapping)</li>
          <li>• <strong>Progression:</strong> Hover +100 steps, Active +200 steps in light mode</li>
          <li>• <strong>Hierarchy:</strong> Primary text uses extremes (900/50), secondary uses middle (600/400)</li>
          <li>• <strong>Accessibility:</strong> WCAG AA requires 4.5:1 contrast ratio minimum</li>
        </ul>
      </div>
    </div>
  );
}