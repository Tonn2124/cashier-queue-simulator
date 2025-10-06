import React from 'react';

// Stateless controls; all effects are lifted to App via props [file:1]
export default function ActionBar({ onAdd, onAssignOne, onAssignAll, hasWaiting }) {
  return (
    <div className="actions">
      <button className="btn primary" onClick={onAdd}>
        Add Customer {/* Random type/time + enqueue waiting */} {/* [file:1] */}
      </button>
      <button className="btn" onClick={onAssignOne} disabled={!hasWaiting}>
        Assign Customer {/* Single assignment respecting rules */} {/* [file:1] */}
      </button>
      <button className="btn ghost" onClick={onAssignAll} disabled={!hasWaiting}>
        Assign All {/* Bulk drain waitingQueue via same logic */} {/* [file:1] */}
      </button>
    </div>
  );
}
