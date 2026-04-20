import { useEffect, useState } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("favorites");
    if (data) setFavorites(JSON.parse(data));
  }, []);

  return (
    <div className="container">
      <h1>Favoritos</h1>

      {favorites.map((j) => (
        <div className="card" key={j.id}>
          <p>{j.joke}</p>
        </div>
      ))}
    </div>
  );
}

export default Favorites;