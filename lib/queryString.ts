export const parseStringToArrayNumber = (
  param?: string | string[]
): number[] => {
  if (!param) return [];
  if (Array.isArray(param)) {
    return param.map(Number).filter((item) => !isNaN(item));
  }
  try {
    const parsed = JSON.parse(param);
    return Array.isArray(parsed)
      ? parsed.map(Number).filter((item) => !isNaN(item))
      : [];
  } catch (e) {
    return [];
  }
};

export const createTracksQueryString = ({
  title,
  genreIds,
  moodIds,
  page = 1,
}: {
  title?: string;
  genreIds?: number[];
  moodIds?: number[];
  page?: number;
}) => {
  const query = [];
  if (genreIds && genreIds.length) query.push(`genres=[${genreIds.join(',')}]`);
  if (moodIds && moodIds.length) query.push(`moods=[${moodIds.join(',')}]`);
  if (title) query.push(`title=${encodeURIComponent(title)}`);
  query.push(`page=${page}`);

  return query.join('&');
};
