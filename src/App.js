// src/App.js
import React, { useMemo, useState, useCallback } from 'react';
import Header from './components/Header';
import ActionBar from './components/ActionBar';
import WaitingQueue from './components/WaitingQueue';
import Stations from './components/Stations';
import useStations from './hooks/useStations';
import './App.css';

export default function App() {
  const [customers, setCustomers] = useState([]);
  const [waitingQueue, setWaitingQueue] = useState([]);
  const [nextId, setNextId] = useState(0);

  // One station array for priority (size 1), one for regular (size 2)
  const { stations: priority, start: startPrio, enqueue: enqueuePrio, customersById } =
    useStations(1, customers);
  const { stations: regular, start: startReg, enqueue: enqueueReg } =
    useStations(2, customers);

  const addCustomer = useCallback(() => {
    const c = {
      id: nextId,
      serviceTime: Math.floor(Math.random() * 96) + 5,
      type: Math.random() < 0.3 ? 'Priority' : 'Normal'
    };
    setCustomers(prev => [...prev, c]);
    setWaitingQueue(prev => [...prev, c.id]);
    setNextId(id => id + 1);
  }, [nextId]);

  // Helper: choose shortest queue among regular stations
  const shortestRegularIndex = useMemo(() => {
    return regular.reduce((min, s, i) => (s.queue.length < regular[min].queue.length ? i : min), 0);
  }, [regular]);

  // Centralized routing per PDF spec
  const routeCustomer = useCallback((id) => {
    const c = customersById.get(id);
    if (!c) return;

    const prioIdle = !priority[0].serving && priority[0].queue.length === 0;

    if (c.type === 'Priority') {
      if (prioIdle) startPrio(0, id, c.serviceTime);
      else enqueuePrio(0, id);
      return;
    }

    // Normal: allow priority only if fully idle; otherwise regular
    if (prioIdle) {
      startPrio(0, id, c.serviceTime);
      return;
    }

    const freeIdx = regular.findIndex(s => !s.serving);
    if (freeIdx !== -1) startReg(freeIdx, id, c.serviceTime);
    else enqueueReg(shortestRegularIndex, id);
  }, [customersById, priority, regular, startPrio, enqueuePrio, startReg, enqueueReg, shortestRegularIndex]);

  const assignOne = useCallback(() => {
    if (waitingQueue.length === 0) return;
    const [head, ...rest] = waitingQueue;
    setWaitingQueue(rest);
    routeCustomer(head);
  }, [waitingQueue, routeCustomer]);

  const assignAll = useCallback(() => {
    // Assign using current snapshot order
    setWaitingQueue(prev => {
      prev.forEach(routeCustomer);
      return [];
    });
  }, [routeCustomer]);

  const total = customers.length;
  const waiting = waitingQueue.length;
  const inService = (priority[0].serving ? 1 : 0) + regular.filter(s => s.serving).length;

  return (
    <div className="page">
      <Header total={total} waiting={waiting} inService={inService} />
      <ActionBar onAdd={addCustomer} onAssignOne={assignOne} onAssignAll={assignAll} hasWaiting={waiting > 0} />
      <main className="grid">
        <WaitingQueue customers={customers} waitingQueue={waitingQueue} />
        <Stations
          customersById={customersById}
          priority={priority}
          regular={regular}
        />
      </main>
    </div>
  );
}
