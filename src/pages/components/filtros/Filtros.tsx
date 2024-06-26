import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './filtros.module.scss';

interface Props {
  busca: string;
}

export const Filtros = (props: Props) => {
  interface SubItem {
    id: number;
    nome: string;
  }

  interface Selecionados {
    id: number;
    nome: string;
    cpf: string;
    items: SubItem[];
    data: string;
  }

  const [selecionados, setSelecionados] = useState<Selecionados[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [lista, setLista] = useState<Selecionados[]>([]);
  const { busca } = props;

  function testaBusca(nome: string) {
    const regex = new RegExp(busca, 'i');
    return regex.test(nome);
  }

  const getItems = async () => {
    try {
      const res = await axios.get<Selecionados[]>(
        'https://sulworkback-production.up.railway.app/itens-selecionados'
      );
      setSelecionados(res.data);
      setLista(res.data); // Iniciar lista completa
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    const novaLista = selecionados.filter(item => testaBusca(item.nome));
    setLista(novaLista);
  }, [busca, selecionados]);

  const handleDateClick = (date: string) => {
    setSelectedDate((prevDate) => (prevDate === date ? null : date));
  };

  const uniqueDates = Array.from(new Set(lista.map((item) => item.data)));

  const filteredItems = lista.filter((item) => item.data === selectedDate);

  return (
    <div className={`${styles.ordem} ${selectedDate ? styles.ordemColumn : ''}`}>
      {selectedDate === null ? (
        uniqueDates.map((date, i) => (
          <div className={styles.filtros} key={i}>
            <button
              className={styles.filtrostitulos}
              onClick={() => handleDateClick(date)}
            >
              {date}
            </button>
          </div>
        ))
      ) : (
        <div>
          <div className={styles.filtros}>
            <button className={styles.filtrostitulos} onClick={() => setSelectedDate(null)}>
              {selectedDate}
            </button>
          </div>
          {filteredItems.map((item) => (
            <div key={item.id} className={styles.filtrosdescricao}>
              <p>Nome: {item.nome}</p>
              <p>CPF: {item.cpf}</p>
              <p>Items:</p>
              <ul>
                {item.items.map((subItem) => (
                  <li key={subItem.id}>{subItem.nome}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
