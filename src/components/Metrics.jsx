import React from 'react';

// Displays three KPI tiles; keeps layout concerns out of Header [file:1]
export default function Metrics({ total, waiting, inService }) {
  return (
    <div className="metrics">
      <div className="metric">
        <div className="metric-value">{total}</div>      {/* Total created customers */} {/* [file:1] */}
        <div className="metric-label">Total</div>
      </div>
      <div className="metric">
        <div className="metric-value">{waiting}</div>    {/* Not yet assigned */} {/* [file:1] */}
        <div className="metric-label">Waiting</div>
      </div>
      <div className="metric">
        <div className="metric-value">{inService}</div>  {/* Number of busy stations */} {/* [file:1] */}
        <div className="metric-label">In Service</div>
      </div>
    </div>
  );
}
