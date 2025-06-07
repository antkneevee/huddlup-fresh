import { useMemo } from 'react';

const defenseDefaults = {
  '1-3-1': [
    { x: 400, y: 80 },
    { x: 200, y: 170 },
    { x: 400, y: 170 },
    { x: 600, y: 170 },
    { x: 400, y: 260 },
  ],
  '3-2': [
    { x: 266.67, y: 170 },
    { x: 533.33, y: 170 },
    { x: 200, y: 260 },
    { x: 400, y: 260 },
    { x: 600, y: 260 },
  ],
  '4-1': [
    { x: 400, y: 170 },
    { x: 160, y: 260 },
    { x: 320, y: 260 },
    { x: 480, y: 260 },
    { x: 640, y: 260 },
  ],
  '2-3': [
    { x: 200, y: 170 },
    { x: 400, y: 170 },
    { x: 600, y: 170 },
    { x: 266.67, y: 260 },
    { x: 533.33, y: 260 },
  ],
};

export default function useDefensePositions(formation) {
  return useMemo(() => {
    if (!formation || formation === 'No') return [];
    const defaults = defenseDefaults[formation];
    return defaults ? defaults.map((p) => ({ ...p })) : [];
  }, [formation]);
}
