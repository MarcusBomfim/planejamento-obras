import type { CSSProperties } from 'react';

/** A régua vai até 1,25: o 1,00 — o planejado — fica a quatro quintos dela, onde está o risco. */
const FimDaRegua = 1.25;

/**
 * Quanto da régua de um índice de desempenho o valor enche: a barra embaixo
 * do número, que a classe "regua" de estilos.css desenha na cor do índice.
 * Sem índice, a régua fica vazia; acima de 1,25, cheia.
 */
export function estiloDaRegua(indice: number | null): CSSProperties {
  const fracao = indice === null ? 0 : Math.min(Math.max(indice / FimDaRegua, 0), 1);

  return { '--preenchido': `${String(Math.round(fracao * 1000) / 10)}%` } as CSSProperties;
}
