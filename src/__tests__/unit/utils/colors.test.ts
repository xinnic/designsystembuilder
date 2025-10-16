import { describe, it, expect } from 'vitest';

// Helper function to convert hex to RGB triplet (same as in designSystem.ts)
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '26 188 156'; // fallback to turquoise
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ].join(' ');
};

describe('Color Utility Functions', () => {
  describe('hexToRgb', () => {
    it('should convert hex to RGB triplet with hash', () => {
      expect(hexToRgb('#ff0000')).toBe('255 0 0');
      expect(hexToRgb('#00ff00')).toBe('0 255 0');
      expect(hexToRgb('#0000ff')).toBe('0 0 255');
    });

    it('should convert hex to RGB triplet without hash', () => {
      expect(hexToRgb('ff0000')).toBe('255 0 0');
      expect(hexToRgb('00ff00')).toBe('0 255 0');
      expect(hexToRgb('0000ff')).toBe('0 0 255');
    });

    it('should handle uppercase hex values', () => {
      expect(hexToRgb('#FF0000')).toBe('255 0 0');
      expect(hexToRgb('#00FF00')).toBe('0 255 0');
      expect(hexToRgb('#0000FF')).toBe('0 0 255');
    });

    it('should handle mixed case hex values', () => {
      expect(hexToRgb('#Ff0000')).toBe('255 0 0');
      expect(hexToRgb('#00fF00')).toBe('0 255 0');
      expect(hexToRgb('#0000fF')).toBe('0 0 255');
    });

    it('should convert common colors correctly', () => {
      expect(hexToRgb('#ffffff')).toBe('255 255 255'); // white
      expect(hexToRgb('#000000')).toBe('0 0 0'); // black
      expect(hexToRgb('#808080')).toBe('128 128 128'); // gray
    });

    it('should convert turquoise correctly', () => {
      expect(hexToRgb('#1abc9c')).toBe('26 188 156');
    });

    it('should convert emerald correctly', () => {
      expect(hexToRgb('#2ecc71')).toBe('46 204 113');
    });

    it('should convert peter river blue correctly', () => {
      expect(hexToRgb('#3498db')).toBe('52 152 219');
    });

    it('should handle invalid hex values with fallback', () => {
      expect(hexToRgb('invalid')).toBe('26 188 156');
      expect(hexToRgb('#gggggg')).toBe('26 188 156');
      expect(hexToRgb('#12345')).toBe('26 188 156');
      expect(hexToRgb('')).toBe('26 188 156');
    });

    it('should handle edge cases', () => {
      expect(hexToRgb('#000001')).toBe('0 0 1');
      expect(hexToRgb('#010000')).toBe('1 0 0');
      expect(hexToRgb('#fefefe')).toBe('254 254 254');
    });
  });

  describe('Color Mapping', () => {
    const colorMap: Record<string, string> = {
      turquoise: '#1abc9c',
      emerald: '#2ecc71',
      'peter-river': '#3498db',
      amethyst: '#9b59b6',
      'wet-asphalt': '#34495e',
      'sun-flower': '#f1c40f',
      carrot: '#e67e22',
      alizarin: '#e74c3c',
      concrete: '#95a5a6',
      orange: '#f39c12',
      pumpkin: '#d35400',
      pomegranate: '#c0392b',
      nephritis: '#27ae60',
      'belize-hole': '#2980b9',
      wisteria: '#8e44ad',
      'midnight-blue': '#2c3e50',
      asbestos: '#7f8c8d'
    };

    it('should have valid hex values for all theme colors', () => {
      Object.entries(colorMap).forEach(([name, hex]) => {
        expect(hex).toMatch(/^#[0-9a-f]{6}$/i);
        const rgb = hexToRgb(hex);
        // All colors should convert to valid RGB triplets
        expect(rgb.split(' ')).toHaveLength(3);
        const parts = rgb.split(' ').map(Number);
        parts.forEach(part => {
          expect(part).toBeGreaterThanOrEqual(0);
          expect(part).toBeLessThanOrEqual(255);
        });
      });
    });

    it('should convert all theme colors to valid RGB triplets', () => {
      Object.entries(colorMap).forEach(([name, hex]) => {
        const rgb = hexToRgb(hex);
        const parts = rgb.split(' ').map(Number);

        expect(parts).toHaveLength(3);
        parts.forEach(part => {
          expect(part).toBeGreaterThanOrEqual(0);
          expect(part).toBeLessThanOrEqual(255);
          expect(Number.isInteger(part)).toBe(true);
        });
      });
    });
  });

  describe('Typography Scale Calculations', () => {
    const typographyScales = {
      small: {
        h1: { size: '24px', line: '30px', weight: 700 },
        body: { size: '14px', line: '20px', weight: 400 }
      },
      regular: {
        h1: { size: '28px', line: '38px', weight: 700 },
        body: { size: '16px', line: '24px', weight: 400 }
      },
      large: {
        h1: { size: '36px', line: '44px', weight: 700 },
        body: { size: '18px', line: '26px', weight: 400 }
      }
    };

    it('should have valid size values', () => {
      Object.entries(typographyScales).forEach(([scale, values]) => {
        Object.entries(values).forEach(([level, props]) => {
          expect(props.size).toMatch(/^\d+px$/);
          expect(props.line).toMatch(/^\d+px$/);
        });
      });
    });

    it('should have line heights greater than or equal to font sizes', () => {
      Object.entries(typographyScales).forEach(([scale, values]) => {
        Object.entries(values).forEach(([level, props]) => {
          const size = parseInt(props.size);
          const line = parseInt(props.line);
          expect(line).toBeGreaterThanOrEqual(size);
        });
      });
    });

    it('should maintain proper scale ratios', () => {
      // Small scale should be smaller than regular
      expect(parseInt(typographyScales.small.h1.size)).toBeLessThan(
        parseInt(typographyScales.regular.h1.size)
      );

      // Regular should be smaller than large
      expect(parseInt(typographyScales.regular.h1.size)).toBeLessThan(
        parseInt(typographyScales.large.h1.size)
      );
    });
  });

  describe('Spacing Scale Mappings', () => {
    const spacingScales = {
      compact: [4, 8, 12, 16, 20, 24, 32, 40],
      normal: [8, 16, 24, 32, 40, 48, 64, 80],
      comfortable: [12, 24, 36, 48, 60, 72, 96, 120]
    };

    it('should have 8 spacing values for each mode', () => {
      Object.values(spacingScales).forEach(scale => {
        expect(scale).toHaveLength(8);
      });
    });

    it('should have increasing values in each scale', () => {
      Object.values(spacingScales).forEach(scale => {
        for (let i = 1; i < scale.length; i++) {
          expect(scale[i]).toBeGreaterThan(scale[i - 1]);
        }
      });
    });

    it('should have compact values smaller than normal', () => {
      for (let i = 0; i < 8; i++) {
        expect(spacingScales.compact[i]).toBeLessThan(spacingScales.normal[i]);
      }
    });

    it('should have normal values smaller than comfortable', () => {
      for (let i = 0; i < 8; i++) {
        expect(spacingScales.normal[i]).toBeLessThan(spacingScales.comfortable[i]);
      }
    });

    it('should be based on 4px grid', () => {
      Object.values(spacingScales).forEach(scale => {
        scale.forEach(value => {
          expect(value % 4).toBe(0);
        });
      });
    });
  });
});
