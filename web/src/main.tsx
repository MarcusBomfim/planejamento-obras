import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { Aplicacao } from './aplicacao/Aplicacao';
import { criarConsultas } from './aplicacao/consultas';
import { criarRotas } from './aplicacao/rotas';
import '@fontsource-variable/ibm-plex-sans';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/600.css';
import './aplicacao/estilos.css';

const raiz = document.getElementById('raiz');

if (!raiz) {
  throw new Error('Falta o elemento #raiz no index.html.');
}

createRoot(raiz).render(
  <StrictMode>
    <Aplicacao roteador={createBrowserRouter(criarRotas())} consultas={criarConsultas()} />
  </StrictMode>,
);
