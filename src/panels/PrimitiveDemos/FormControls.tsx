import React from 'react';
import './FormControls.css';

export default function FormControls() {
  return (
    <div className="form-controls">
      <fieldset className="radio-group">
        <legend>Gender</legend>
        <label>
          <input type="radio" name="gender" defaultChecked />
          Female
        </label>
        <label>
          <input type="radio" name="gender" />
          Male
        </label>
      </fieldset>

      <div className="switch-list">
        <label className="switch-item">
          <span>Background play</span>
          <input type="checkbox" role="switch" defaultChecked />
        </label>
        <label className="switch-item">
          <span>Download via Wi-Fi only</span>
          <input type="checkbox" role="switch" />
        </label>
      </div>

      <div className="form-example">
        <h4>Example Form</h4>
        <div className="form-fields">
          <label>
            Full name
            <input type="text" placeholder="Enter your full name" />
          </label>
          <label>
            Email
            <input type="email" placeholder="Enter your email" />
          </label>
          <label>
            Password
            <input type="password" placeholder="Create a password" />
          </label>
        </div>
      </div>
    </div>
  );
}