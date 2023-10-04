import { getAllGenresServerAction } from '@/modules/genre/domain/usecases/getAllGenresServerAction';

export default async function HomePage() {
  const genres = await getAllGenresServerAction();

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
