import { describe, expect, test } from 'vitest';
import { iniciais } from './nomes';

describe('as iniciais de quem entrou', () => {
  test('do nome e do login, sem as palavras de ligação', () => {
    expect(iniciais('Equipe da obra')).toBe('EO');
    expect(iniciais('Ana Engenheira')).toBe('AE');
    expect(iniciais('ana.engenheira')).toBe('AE');
    expect(iniciais('Bruno')).toBe('B');
    expect(iniciais('—')).toBe('?');
  });
});
