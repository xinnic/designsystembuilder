import React from 'react';
import { useDesignSystem } from '../../state/designSystem';
import { Home, Compass, Activity, User, Settings } from 'lucide-react';
import './NavPreview.css';

export default function NavPreview() {
  const { opts } = useDesignSystem();

  const tabs = [
    { icon: Home, label: 'Home', active: true },
    { icon: Compass, label: 'Explore', active: false },
    { icon: Activity, label: 'Activities', active: false },
    { icon: User, label: 'Profile', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  if (opts.menuLayout === 'bottomBar') {
    return (
      <div className="nav bottom">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          return (
            <div key={index} className={`tab ${tab.active ? 'active' : ''}`}>
              <Icon size={20} className="tab-icon" />
              <span className="tab-label">{tab.label}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="nav hamburger">
      <div className="topbar">
        <button className="icon">☰</button>
        <div>Good morning, Emma</div>
      </div>
      <div className="drawer">Menu • Home • Explore • Activities • Profile • Settings</div>
    </div>
  );
}