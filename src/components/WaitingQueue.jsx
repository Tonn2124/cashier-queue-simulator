import React from 'react';
import CustomerChip from './CustomerChip';

// Presentation only: maps waiting ids to objects and renders chips [file:1]
export default function WaitingQueue({ customers, waitingQueue }) {
  const list = waitingQueue
    .map(id => customers.find(c => c.id === id)) // Resolve object from id [file:1]
    .filter(Boolean); // Defensive: drop missing ids [file:1]
  return (
    <section className="card waiting">
      <h2>Waiting Queue ({list.length})</h2> {/* Live count */} {/* [file:1] */}
      {list.length === 0 ? (
        <div className="empty">No customers waiting</div> // Empty state for clarity [file:1]
      ) : (
        <div className="chips">
          {list.map(c => <CustomerChip key={c.id} customer={c} />)} {/* Reusable chip */} {/* [file:1] */}
        </div>
      )}
    </section>
  );
}
