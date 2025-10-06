// src/hooks/useStations.js
import { useEffect, useMemo, useReducer } from 'react';

// Generic station reducer for any number of stations
function reducer(state, action) {
  switch (action.type) {
    case 'START': {
      const { index, id, time } = action;
      const next = [...state];
      next[index] = { serving: id, queue: next[index].queue, remaining: time };
      return next;
    }
    case 'ENQUEUE': {
      const { index, id } = action;
      const next = [...state];
      next[index] = { ...next[index], queue: [...next[index].queue, id] };
      return next;
    }
    case 'TICK': {
      // Decrement remaining if serving
      return state.map(s =>
        s.serving ? { ...s, remaining: Math.max(0, s.remaining - 1) } : s
      );
    }
    case 'PROMOTE': {
      // If remaining==0, promote queue head
      const { customersById } = action;
      return state.map(s => {
        if (!s.serving || s.remaining > 0) return s;
        const nextId = s.queue[0];
        const rest = s.queue.slice(1);
        const data = nextId ? customersById.get(nextId) : null;
        return {
          serving: nextId || null,
          queue: rest,
          remaining: data ? data.serviceTime : 0
        };
      });
    }
    default:
      return state;
  }
}

export default function useStations(count, customers) {
  const initial = useMemo(
    () => Array.from({ length: count }, () => ({ serving: null, queue: [], remaining: 0 })),
    [count]
  );

  const [stations, dispatch] = useReducer(reducer, initial);

  // Fast lookup map: id -> customer
  const customersById = useMemo(() => new Map(customers.map(c => [c.id, c])), [customers]);

  // Single interval for ticks + promotions
  useEffect(() => {
    const iv = setInterval(() => {
      dispatch({ type: 'TICK' });
      dispatch({ type: 'PROMOTE', customersById });
    }, 1000);
    return () => clearInterval(iv);
  }, [customersById]);

  const start = (index, id, time) => dispatch({ type: 'START', index, id, time });
  const enqueue = (index, id) => dispatch({ type: 'ENQUEUE', index, id });

  return { stations, start, enqueue, customersById };
}
