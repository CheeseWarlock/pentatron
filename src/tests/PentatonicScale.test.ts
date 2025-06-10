import { expect, test, describe } from 'vitest';
import PentatonicScale from '../PentatonicScale';

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

describe('PentatonicScale.getNotes', () => {
  test('should return the correct notes', () => {
    const scale = new PentatonicScale(440, [0, 2, 4, 5, 7, 9, 11]);
    expect(scale.getNotes(440, 880)).toEqual([
      440,
      440 * Math.pow(2, 2 / 12),
      440 * Math.pow(2, 4 / 12),
      440 * Math.pow(2, 5 / 12),
      440 * Math.pow(2, 7 / 12),
      440 * Math.pow(2, 9 / 12),
      440 * Math.pow(2, 11 / 12),
    ]);
  });

  test('should return the correct notes when root is below start frequency', () => {
    const scale = new PentatonicScale(440, [0, 2, 4, 5, 7, 9, 11]);
    expect(scale.getNotes(430, 880)).toEqual([
      440,
      440 * Math.pow(2, 2 / 12),
      440 * Math.pow(2, 4 / 12),
      440 * Math.pow(2, 5 / 12),
      440 * Math.pow(2, 7 / 12),
      440 * Math.pow(2, 9 / 12),
      440 * Math.pow(2, 11 / 12),
    ]);
  });

  test('should return the correct notes when root is above start frequency', () => {
    const scale = new PentatonicScale(440, [0, 2, 4, 5, 7, 9, 11]);
    expect(scale.getNotes(450, 880)).toEqual([
      440 * Math.pow(2, 2 / 12),
      440 * Math.pow(2, 4 / 12),
      440 * Math.pow(2, 5 / 12),
      440 * Math.pow(2, 7 / 12),
      440 * Math.pow(2, 9 / 12),
      440 * Math.pow(2, 11 / 12),
    ]);
  });

  test('should return the correct notes including partial octaves', () => {
    const scale = new PentatonicScale(440, [0, 2, 4, 5, 7, 9, 11]);
    expect(scale.getNotes(250, 1000)).toEqual([
      220 * Math.pow(2, 4 / 12),
      220 * Math.pow(2, 5 / 12),
      220 * Math.pow(2, 7 / 12),
      220 * Math.pow(2, 9 / 12),
      220 * Math.pow(2, 11 / 12),
      440,
      440 * Math.pow(2, 2 / 12),
      440 * Math.pow(2, 4 / 12),
      440 * Math.pow(2, 5 / 12),
      440 * Math.pow(2, 7 / 12),
      440 * Math.pow(2, 9 / 12),
      440 * Math.pow(2, 11 / 12),
      880,
      880 * Math.pow(2, 2 / 12)
    ]);
  });
});