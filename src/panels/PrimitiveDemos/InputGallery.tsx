import React from 'react';
import { useDesignSystem } from '../../state/designSystem';
import './InputGallery.css';

export default function InputGallery() {
  const { opts } = useDesignSystem();

  return (
    <div className={`inputs ${opts.inputStyle}`}>
      <label>
        Full Name
        <input placeholder="Enter your full name" />
      </label>
      <label>
        Email
        <input type="email" placeholder="Enter your email" />
      </label>
      <div className="row">
        <label className="select">
          Country
          <select>
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
          </select>
        </label>
        <label className="switch">
          Background play
          <input type="checkbox" role="switch" />
        </label>
      </div>
      <fieldset className="radio">
        <legend>What's your role?</legend>
        <label>
          <input type="radio" name="role" defaultChecked /> Designer
        </label>
        <label>
          <input type="radio" name="role" /> Developer
        </label>
        <label>
          <input type="radio" name="role" /> Product Manager
        </label>
      </fieldset>
    </div>
  );
}