
import styles from './cardapio.module.scss';
import { Headers } from './components/header/Headers';
import { Buscador } from './components/buscador/Buscador';
import { useState } from 'react';
import { Filtros } from './components/filtros/Filtros';

function Cardapio() {
  const [busca, setBusca] = useState("");

  return (
    <>
    <main>
      <nav className={styles.menu}>
        <Headers/>
        <section className={styles.cardapio}>
          <h3 className={styles.cardapio__titulo}>Lista do Café da Manhã</h3>
          <Buscador busca={busca} setBusca={setBusca}/>
          <div>
            <Filtros busca={busca} />
          </div>
        </section>
      </nav>

    </main>
    </>
  )
}

export default Cardapio
