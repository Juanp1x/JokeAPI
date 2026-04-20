export const ObternerJokes = async () => {
  const res = await fetch(
    "https://v2.jokeapi.dev/joke/Any?type=single&amount=10"
  );
  return res.json();
};

export const ObtenerJokesCategoria = async (category: string) => {
  const res = await fetch(
    `https://v2.jokeapi.dev/joke/${category}?type=single&amount=10`
  );
  return res.json();
};