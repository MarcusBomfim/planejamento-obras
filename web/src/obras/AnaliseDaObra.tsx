import type { ReactNode } from 'react';
import type { Esquemas } from '../api/cliente';
import { formatarIndice, formatarMeses, formatarMoeda } from '../comum/formatacao';
import { estiloDaRegua } from '../comum/regua';
import { situacaoDoIndice } from '../comum/situacao';
import { CurvaS } from './CurvaS';
import estilos from './AnaliseDaObra.module.css';

type Analise = Esquemas['ValorAgregadoResposta'];

/** O nível de uma linha da planilha pelo número: "4" é etapa; "4.1", item dela. */
function nivel(numero: string): number {
  return numero.split('.').length;
}

/**
 * Os indicadores da obra, a curva S e a tabela por etapa. Os índices vêm na
 * cor da régua da situação — e sempre com o número escrito ao lado.
 */
export function AnaliseDaObra({ analise }: { readonly analise: Analise }) {
  const { obra, prazo } = analise;
  const variacaoNegativa = obra.variacaoNoTermino !== null && obra.variacaoNoTermino < 0;

  return (
    <div className={estilos.analise}>
      <dl className={estilos.indicadores}>
        <Indicador
          nome="IDP — desempenho de prazo"
          classe={estilos[situacaoDoIndice(obra.indiceDeDesempenhoDePrazo)]}
          indice={obra.indiceDeDesempenhoDePrazo}
        >
          {formatarIndice(obra.indiceDeDesempenhoDePrazo)}
        </Indicador>
        <Indicador
          nome="IDC — desempenho de custo"
          classe={estilos[situacaoDoIndice(obra.indiceDeDesempenhoDeCusto)]}
          indice={obra.indiceDeDesempenhoDeCusto}
        >
          {formatarIndice(obra.indiceDeDesempenhoDeCusto)}
        </Indicador>
        <Indicador nome="Prazo agregado">
          {formatarMeses(prazo.prazoAgregadoEmMeses)}
          <small> de {prazo.prazoDecorridoEmMeses} decorridos</small>
        </Indicador>
        <Indicador nome="Duração estimada">
          {formatarMeses(prazo.duracaoEstimadaEmMeses)}
          <small> de {prazo.duracaoPlanejadaEmMeses} planejados</small>
        </Indicador>
        <Indicador nome="Valor planejado (VP)">{formatarMoeda(obra.valorPlanejado)}</Indicador>
        <Indicador nome="Valor agregado (VA)">{formatarMoeda(obra.valorAgregado)}</Indicador>
        <Indicador nome="Custo real (CR)">{formatarMoeda(obra.custoReal)}</Indicador>
        <Indicador nome="Estimativa no término (ENT)">
          {formatarMoeda(obra.estimativaNoTermino)}
          <small> orçado: {formatarMoeda(obra.orcamentoNoTermino)}</small>
        </Indicador>
        <Indicador nome="Variação no término (VNT)" classe={variacaoNegativa ? estilos.Critica : undefined}>
          {formatarMoeda(obra.variacaoNoTermino)}
        </Indicador>
      </dl>

      <CurvaS curva={analise.curva} mesDaMedicao={analise.mes} />

      <section aria-labelledby="titulo-por-etapa" className={estilos.etapas}>
        <h2 id="titulo-por-etapa">Por etapa e item</h2>
        <div className={estilos.rolagem}>
          <table aria-labelledby="titulo-por-etapa">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Descrição</th>
                <th scope="col" className="numero">
                  VP
                </th>
                <th scope="col" className="numero">
                  VA
                </th>
                <th scope="col" className="numero">
                  CR
                </th>
                <th scope="col" className="numero">
                  IDP
                </th>
                <th scope="col" className="numero">
                  IDC
                </th>
              </tr>
            </thead>
            <tbody>
              {analise.linhas.map((linha) => {
                const { indicadores } = linha;

                return (
                  <tr key={linha.numero} className={nivel(linha.numero) === 1 ? estilos.etapa : estilos.item}>
                    <th scope="row">{linha.numero}</th>
                    <td>{linha.descricao}</td>
                    <td className="numero">{formatarMoeda(indicadores.valorPlanejado)}</td>
                    <td className="numero">{formatarMoeda(indicadores.valorAgregado)}</td>
                    <td className="numero">{formatarMoeda(indicadores.custoReal)}</td>
                    <td
                      className={`numero ${estilos[situacaoDoIndice(indicadores.indiceDeDesempenhoDePrazo)] ?? ''}`}
                    >
                      {formatarIndice(indicadores.indiceDeDesempenhoDePrazo)}
                    </td>
                    <td
                      className={`numero ${estilos[situacaoDoIndice(indicadores.indiceDeDesempenhoDeCusto)] ?? ''}`}
                    >
                      {formatarIndice(indicadores.indiceDeDesempenhoDeCusto)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

/** Um indicador; o índice de desempenho, quando há, ganha a régua embaixo do número. */
function Indicador({
  nome,
  classe,
  indice,
  children,
}: {
  readonly nome: string;
  readonly classe?: string | undefined;
  readonly indice?: number | null | undefined;
  readonly children: ReactNode;
}) {
  const comRegua = indice !== undefined;

  return (
    <div
      className={comRegua ? `regua ${estilos.indicador ?? ''} ${estilos.indice ?? ''}` : estilos.indicador}
      style={comRegua ? estiloDaRegua(indice) : undefined}
    >
      <dt>{nome}</dt>
      <dd className={classe}>{children}</dd>
    </div>
  );
}
