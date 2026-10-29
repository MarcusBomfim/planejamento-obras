import { describe, expect, test } from 'vitest';
import { estiloDaRegua } from './regua';

const preenchido = (indice: number | null) =>
  (estiloDaRegua(indice) as Record<string, string>)['--preenchido'];

describe('a régua do índice', () => {
  test('o 1,00 — o planejado — enche quatro quintos dela, onde está o risco', () => {
    expect(preenchido(1)).toBe('80%');
  });

  test('o índice do README, 0,74, fica antes do risco', () => {
    expect(preenchido(0.74)).toBe('59.2%');
  });

  test('acima de 1,25 a régua fica cheia; sem índice, vazia', () => {
    expect(preenchido(1.6)).toBe('100%');
    expect(preenchido(null)).toBe('0%');
    expect(preenchido(-0.2)).toBe('0%');
  });
});
