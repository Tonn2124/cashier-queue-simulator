import React from 'react';

// Consistent look for customers; used in waiting and rail queues [file:1]
export default function CustomerChip({ customer, suffix }) {
  const cls = customer.type === 'Priority' ? 'chip chip-priority' : 'chip chip-normal'; // Color-coded [file:1]
  return (
    <div className={cls}>
      ID: {customer.id} • {customer.serviceTime}s{suffix ? ` • ${suffix}` : ''} {/* Optional extra info */} {/* [file:1] */}
    </div>
  );
}
