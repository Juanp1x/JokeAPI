function Info() {
  return (
    <div className="container">
      <h1>JokeAPI</h1>

      <div className="card">
        <p>Esta aplicación consume una API pública de chistes.</p>

        <p>
          Endpoint:
          https://v2.jokeapi.dev/joke/Any
        </p>

        <p>
          Permite obtener chistes por categoría como Programming, Dark y Misc.
        </p>
      </div>
    </div>
  );
}

export default Info;