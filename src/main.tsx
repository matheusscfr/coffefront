import React from 'react'
import ReactDOM from 'react-dom/client'
import Cardapio from './pages/Cardapio.tsx'
import './main.modules.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Cardapio />
  </React.StrictMode>,
)
