import React from 'react';
import Metrics from './Metrics'; // Separate metrics display for clarity and reuse [file:1]

// Pure header: brand + metrics, no state [file:1]
export default function Header({ total, waiting, inService }) {
  return (
    <header className="header">
      <div className="brand">
        <span className="dot" /> {/* Decorative gradient dot */} {/* [file:1] */}
        Cashier Queue Simulator
      </div>
      <Metrics total={total} waiting={waiting} inService={inService} /> {/* Three KPIs */} {/* [file:1] */}
    </header>
  );
}
