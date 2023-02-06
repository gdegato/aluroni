import styles from "./Itens.module.scss";
import Cardapio from "./itens.json";
import Item from "./Item";
import { useEffect, useState } from "react";

interface Props {
  busca: string;
  filtro: number | null;
  ordenador: string;
}

export default function Itens(props: Props) {
  const [lista, setLista] = useState(Cardapio);
  const { busca, filtro, ordenador } = props;

  function testaBusca(title: string) {
    const regex = new RegExp(busca, "i");
    return regex.test(title);
  }

  function testaFiltro(id: number) {
    if (filtro != null) return filtro === id;
    return true;
  }

  const ordenar = (novaLista: typeof Cardapio) => {
    switch (ordenador) {
      case "porcao":
        return ordenarPropriedadeCrescente(novaLista, "size");
      case "qtd_pessoas":
        return ordenarPropriedadeCrescente(novaLista, "serving");
      case "preco":
        return ordenarPropriedadeCrescente(novaLista, "price");
      default:
        return novaLista;
    }
  };
  const ordenarPropriedadeCrescente = (
    lista: typeof Cardapio,
    propriedade: "size" | "serving" | "price"
  ) => {
    return lista.sort((a, b) => (a[propriedade] > b[propriedade] ? 1 : -1));
  };

  useEffect(() => {
    const novaLista = Cardapio.filter(
      (item) => testaBusca(item.title) && testaFiltro(item.category.id)
    );
    setLista(ordenar(novaLista));
  }, [busca, filtro, ordenador]);
  return (
    <div className={styles.itens}>
      {lista.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
}
