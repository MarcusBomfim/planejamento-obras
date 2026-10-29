/*
 * Os ícones da aplicação, desenhados aqui, no traço da Lucide: sempre ao
 * lado de uma palavra, que é quem diz o que é. Por isso ficam escondidos do
 * leitor de tela.
 */

const Desenhos = {
  // O guindaste de obra, da marca.
  marca: (
    <>
      <path d="M5 21V4l13 3" />
      <path d="M5 8h14M18 7v4M3 21h6" />
      <path d="M16 11h4v3h-4z" />
    </>
  ),
  painel: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </>
  ),
  cronogramas: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 7h6M10 11h7M8 15h5" />
    </>
  ),
  seta: <path d="m9 18 6-6-6-6" />,
  sair: (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5M21 12H9" />
    </>
  ),
} as const;

export type NomeDoIcone = keyof typeof Desenhos;

export function Icone({
  nome,
  className,
}: {
  readonly nome: NomeDoIcone;
  readonly className?: string | undefined;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {Desenhos[nome]}
    </svg>
  );
}
