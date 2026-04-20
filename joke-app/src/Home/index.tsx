import { useEffect, useState } from "react";
import { ObternerJokes, ObtenerJokesCategoria } from "../Conexion";

type Chiste = {
  id: number;
  category: string;
  joke: string;
};

const categoriasES: any = {
  Programming: "Programación",
  Misc: "Misceláneo",
  Dark: "Oscuro",
  Pun: "Juego de palabras",
  Spooky: "Terror",
  Christmas: "Navidad"
};

function Home() {
  const [chistes, setChistes] = useState<Chiste[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    ObternerJokes().then((data) => {
      setChistes(data.jokes);
    });
  }, []);

  const filtrarCategoria = (categoria: string) => {
    ObtenerJokesCategoria(categoria).then((data) => {
      setChistes(data.jokes);
    });
  };

  const guardarFavorito = (chiste: Chiste) => {
    const data = localStorage.getItem("favorites");
    const favoritos = data ? JSON.parse(data) : [];

    const existe = favoritos.find((f: Chiste) => f.id === chiste.id);

    if (!existe) {
      const actualizados = [...favoritos, chiste];
      localStorage.setItem("favorites", JSON.stringify(actualizados));
    }
  };

  const chistesFiltrados = chistes.filter((c) =>
    c.joke.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Chistes</h1>

      <input
        type="text"
        placeholder="Buscar chistes..."
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div>
        <button onClick={() => filtrarCategoria("Programming")}>
          Programación
        </button>
        <button onClick={() => filtrarCategoria("Misc")}>
          Misceláneo
        </button>
        <button onClick={() => filtrarCategoria("Dark")}>
          Oscuro
        </button>
      </div>

      {chistesFiltrados.map((chiste) => (
        <div className="card" key={chiste.id}>
          <h3>
            {categoriasES[chiste.category] || chiste.category}
          </h3>

          <p>{chiste.joke}</p>

          <button onClick={() => guardarFavorito(chiste)}>
            Guardar en favoritos
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;