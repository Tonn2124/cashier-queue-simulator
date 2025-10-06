// src/components/CashierCard.jsx
import React from 'react';

export default function CashierCard({ title, customersById, serving, queue, remaining }) {
  const servingData = serving ? customersById.get(serving) : null;
  const q = queue.map(id => customersById.get(id)).filter(Boolean);
  const available = !serving;

  return (
    <div className="card cashier">
      <div className="card-header">
        <h3>{title}</h3>
        <span className={`pill ${available ? 'ok' : 'busy'}`}>{available ? 'Available' : 'Busy'}</span>
      </div>
      <div className="now-serving">
        {servingData ? (
          <div className="serving">
            <div className="avatar">{servingData.id % 100}</div>
            <div className="info">
              <div className="id">Customer {servingData.id}</div>
              <div className="time">Now serving • <span className="count">{remaining}s</span></div>
              <div className={`tag ${servingData.type === 'Priority' ? 'tag-priority' : 'tag-normal'}`}>{servingData.type}</div>
            </div>
          </div>
        ) : (
          <div className="empty">Idle — waiting for next customer</div>
        )}
      </div>
      <div className="queue-rail">
        {q.length === 0 ? (
          <div className="rail-empty">No one in queue</div>
        ) : (
          <div className="rail">
            {q.map(c => (
              <div key={c.id} className={`rail-chip ${c.type === 'Priority' ? 'rail-priority' : 'rail-normal'}`}>
                #{c.id} • {c.serviceTime}s
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
