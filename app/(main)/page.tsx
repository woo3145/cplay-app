import { getAllGenres } from '@/modules/genres/application/getAllGenres';

export default async function HomePage() {
  const genres = await getAllGenres();

  return (
    <div className="flex flex-col items-center justify-between">
      <div>
        {genres.map((genre) => {
          return <p key={genre.tag}>{genre.tag}</p>;
        })}
      </div>
    </div>
  );
}
