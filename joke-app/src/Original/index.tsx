import { useEffect, useState } from "react";
import { ObternerJokes } from "../Conexion";

function Original() {
  const [chistes, setChistes] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [animacion, setAnimacion] = useState("");

  useEffect(() => {
    ObternerJokes().then((data) => {
      setChistes(data.jokes);
    });
  }, []);

  const guardarRating = (id: number, tipo: string) => {
    const data = localStorage.getItem("ratings");
    const ratings = data ? JSON.parse(data) : {};

    const nuevos = { ...ratings, [id]: tipo };
    localStorage.setItem("ratings", JSON.stringify(nuevos));
  };

  const swipe = (direccion: string) => {
    const actual = chistes[index];
    if (!actual) return;

    guardarRating(actual.id, direccion);

    setAnimacion(direccion === "like" ? "right" : "left");

    setTimeout(() => {
      setIndex((prev) => prev + 1); // mejor práctica
      setAnimacion("");
    }, 300);
  };

  const chisteActual = chistes[index];

  if (!chisteActual) {
    return (
      <div className="container">
        <h1>No hay más chistes</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Desliza los chistes</h1>

      <div className={`card tinder ${animacion}`}>
        <p>{chisteActual.joke}</p>
      </div>

      <div>
        <button onClick={() => swipe("dislike")}>
          No me gusta
        </button>

        <button onClick={() => swipe("like")}>
          Me gusta
        </button>
      </div>
    </div>
  );
}

export default Original;