import React from 'react';
import { useDesignSystem } from '../../state/designSystem';
import './ColorSwatch.css';

interface ColorInfo {
  name: string;
  token: keyof typeof colorMap;
  usage: string;
}

const colorMap = {
  brand: 'rgb(var(--color-brand))',
  brandWeak: 'rgb(var(--color-brand-weak))',
  textPrimary: 'rgb(var(--color-text-primary))',
  textSecondary: 'rgb(var(--color-text-secondary))',
  textDisabled: 'rgb(var(--color-text-disabled))',
  bgPrimary: 'rgb(var(--color-bg-primary))',
  bgSecondary: 'rgb(var(--color-bg-secondary))',
  border: 'rgb(var(--color-border))',
  focus: 'rgb(var(--color-focus))',
  success: 'rgb(var(--color-success))',
  warning: 'rgb(var(--color-warning))',
  info: 'rgb(var(--color-info))',
  danger: 'rgb(var(--color-danger))'
};

const colors: ColorInfo[] = [
  { name: 'Brand', token: 'brand', usage: 'Primary actions' },
  { name: 'Accent', token: 'brandWeak', usage: 'Supporting surfaces' },
  { name: 'Text Primary', token: 'textPrimary', usage: 'Main content' },
  { name: 'Text Secondary', token: 'textSecondary', usage: 'Supporting text' },
  { name: 'Text Disabled', token: 'textDisabled', usage: 'Inactive states' },
  { name: 'BG Primary', token: 'bgPrimary', usage: 'Page background' },
  { name: 'BG Secondary', token: 'bgSecondary', usage: 'Card surfaces' },
  { name: 'Border', token: 'border', usage: 'Dividers' },
  { name: 'Focus', token: 'focus', usage: 'Focus rings' },
  { name: 'Success', token: 'success', usage: 'Success states' },
  { name: 'Warning', token: 'warning', usage: 'Warning states' },
  { name: 'Info', token: 'info', usage: 'Information' },
  { name: 'Danger', token: 'danger', usage: 'Error states' }
];

export default function ColorSwatch() {
  return (
    <div className="color-grid">
      {colors.map((color) => (
        <div key={color.token} className="color-item">
          <div
            className="color-swatch"
            style={{ backgroundColor: colorMap[color.token] }}
          />
          <div className="color-info">
            <div className="color-name">{color.name}</div>
            <div className="color-usage">{color.usage}</div>
          </div>
        </div>
      ))}
    </div>
  );
}