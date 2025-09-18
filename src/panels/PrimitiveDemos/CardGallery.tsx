import React from 'react';
import { useDesignSystem } from '../../state/designSystem';
import './CardGallery.css';

export default function CardGallery() {
  const { opts } = useDesignSystem();

  return (
    <div className={`cards ${opts.cardWidth}`}>
      <article className="card neutral">
        <h4>Neutral Card</h4>
        <p>Resting information in a soft container.</p>
      </article>

      <article className="card featured">
        <div className="media" />
        <div className="content">
          <h4>New York Music Festival 2023</h4>
          <p>Thank you New York City — an unforgettable show.</p>
          <button className="btn primary">Read more</button>
        </div>
      </article>
    </div>
  );
}