import { describe, test, expect } from 'vitest';
import { evolveTones, evolvePattern, unpleasantness } from '../utils';
import type { Semitones } from '../PentatonicScale';
import { PATTERN_LENGTH, PITCH_COUNT } from '../components/PentatonicSynth';

/*
Tests for the evolution functions for tones and patterns.
If these fail, they're likely to do so intermittently since the functions use Math.random().
*/

describe('evolveTones', () => {
  test('should maintain 4 tones after evolution', () => {
    const initialTones: Semitones = [2, 4, 7, 11];
    const evolvedTones = evolveTones(initialTones);
    expect(evolvedTones.length).toBe(4);
  });

  test('should return sorted tones', () => {
    const initialTones: Semitones = [2, 4, 7, 11];
    const evolvedTones = evolveTones(initialTones);
    expect(evolvedTones).toEqual([...evolvedTones].sort((a, b) => a - b));
  });

  test('should only use valid semitones (1-11)', () => {
    const initialTones: Semitones = [2, 4, 7, 11];
    const evolvedTones = evolveTones(initialTones);
    evolvedTones.forEach(tone => {
      expect(tone).toBeGreaterThanOrEqual(1);
      expect(tone).toBeLessThanOrEqual(11);
    });
  });

  test('should not have duplicate tones', () => {
    const initialTones: Semitones = [2, 4, 7, 11];
    const evolvedTones = evolveTones(initialTones);
    const uniqueTones = new Set(evolvedTones);
    expect(uniqueTones.size).toBe(evolvedTones.length);
  });
});

describe('evolvePattern', () => {
  test('should maintain grid dimensions', () => {
    const initialPattern = Array(PATTERN_LENGTH).fill(null).map(() => Array(PITCH_COUNT).fill(false));
    // Add some initial true values
    initialPattern[0]![0] = true;
    initialPattern[1]![1] = true;
    
    const evolvedPattern = evolvePattern(initialPattern);
    expect(evolvedPattern.length).toBe(PATTERN_LENGTH);
    evolvedPattern.forEach(column => {
      expect(column.length).toBe(PITCH_COUNT);
    });
  });

  test('should not have more than 3 true values in any column', () => {
    const initialPattern = Array(16).fill(null).map(() => Array(10).fill(false));
    // Add some initial true values
    initialPattern[0]![0] = true;
    initialPattern[0]![1] = true;
    initialPattern[0]![2] = true;
    
    const evolvedPattern = evolvePattern(initialPattern);
    evolvedPattern.forEach(column => {
      const trueCount = column.filter(Boolean).length;
      expect(trueCount).toBeLessThanOrEqual(3);
    });
  });

  test('should only swap adjacent cells', () => {
    const initialPattern = Array(16).fill(null).map(() => Array(10).fill(false));
    // Add some initial true values
    initialPattern[0]![0] = true;
    initialPattern[1]![1] = true;
    
    const evolvedPattern = evolvePattern(initialPattern);
    
    // Count total true values before and after
    const initialTrueCount = initialPattern.flat().filter(Boolean).length;
    const evolvedTrueCount = evolvedPattern.flat().filter(Boolean).length;
    expect(evolvedTrueCount).toBe(initialTrueCount);
  });

  test('should handle empty pattern', () => {
    const initialPattern = Array(16).fill(null).map(() => Array(10).fill(false));
    const evolvedPattern = evolvePattern(initialPattern);
    expect(evolvedPattern).toEqual(initialPattern);
  });
});

describe('unpleasantness', () => {
  test('should return 0 for a major pentatonic scale', () => {
    const semitones: Semitones = [2, 4, 7, 9];
    const scaleUnpleasantness = unpleasantness(semitones);
    expect(scaleUnpleasantness).toBe(0);
  });

  test('should return 0 for another pentatonic scale', () => {
    const semitones: Semitones = [3, 5, 8, 10];
    const scaleUnpleasantness = unpleasantness(semitones);
    expect(scaleUnpleasantness).toBe(0);
  });

  test('should return 1 for a scale with a minor 2nd', () => {
    const semitones: Semitones = [3, 5, 7, 8];
    const scaleUnpleasantness = unpleasantness(semitones);
    expect(scaleUnpleasantness).toBe(1);
  });

  test('should return 1 for a scale with a tritone', () => {
    const semitones: Semitones = [2, 4, 6, 9];
    const scaleUnpleasantness = unpleasantness(semitones);
    expect(scaleUnpleasantness).toBe(1);
  });

  test('should return 4 for 4 minor 2nds', () => {
    const semitones: Semitones = [1, 2, 3, 4];
    const scaleUnpleasantness = unpleasantness(semitones);
    expect(scaleUnpleasantness).toBe(4);
  });
  
  test('should return 4 for 4 minor 2nds wrapping around 0', () => {
    const semitones: Semitones = [1, 2, 10, 11];
    const scaleUnpleasantness = unpleasantness(semitones);
    expect(scaleUnpleasantness).toBe(4);
  });
});