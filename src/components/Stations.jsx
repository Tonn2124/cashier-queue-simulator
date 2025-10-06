// src/components/Stations.jsx
import React from 'react';
import CashierCard from './CashierCard';

export default function Stations({ customersById, priority, regular }) {
  const prio = priority[0];
  return (
    <section className="stations">
      <CashierCard
        title="Priority Cashier"
        customersById={customersById}
        serving={prio.serving}
        queue={prio.queue}
        remaining={prio.remaining}
      />
      <div className="regular-row">
        {regular.map((s, i) => (
          <CashierCard
            key={i}
            title={`Regular Cashier ${i + 1}`}
            customersById={customersById}
            serving={s.serving}
            queue={s.queue}
            remaining={s.remaining}
          />
        ))}
      </div>
    </section>
  );
}
