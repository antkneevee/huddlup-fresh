import { renderHook } from '@testing-library/react';
import useDefensePositions from './useDefensePositions';

describe('useDefensePositions', () => {
  test('returns empty array when formation is "No"', () => {
    const { result } = renderHook(() => useDefensePositions('No'));
    expect(result.current).toEqual([]);
  });

  test('returns defaults for 3-2 formation', () => {
    const { result } = renderHook(() => useDefensePositions('3-2'));
    expect(result.current).toHaveLength(5);
    expect(result.current[0]).toEqual({ x: 266.67, y: 170 });
  });
});
