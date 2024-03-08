export default function MovieList({ films }) {
  return (
    <ul>
      {films.map((film) => (
        <li key={film.id}></li>
      ))}
    </ul>
  );
}
