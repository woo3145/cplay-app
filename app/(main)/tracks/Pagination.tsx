'use client';

import { Button } from '@/components/ui/button';
import { ChevronsLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TracksSearchParams } from './page';

interface Props {
  totalItems: number;
  take: number;
  page: number;
  searchParams?: TracksSearchParams;
}

export const Pagination = ({ totalItems, take, page, searchParams }: Props) => {
  const router = useRouter();
  const totalPages = Math.ceil(totalItems / take);

  const createQueryString = (page: number) => {
    const query = [];
    if (searchParams?.genres && searchParams.genres.length)
      query.push(`genres=${searchParams.genres}`);
    if (searchParams?.moods && searchParams.moods.length)
      query.push(`moods=${searchParams.moods}`);
    if (searchParams?.title)
      query.push(`title=${encodeURIComponent(searchParams.title)}`);
    if (page) query.push(`page=${page}`);

    return query.join('&');
  };
  const renderPageNumbers = () => {
    const pages = [];

    let startPage = 0;
    let endPage = 0;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (page <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (page + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = page - 2;
        endPage = page + 2;
      }
    }

    for (let i = startPage; i <= endPage; ++i) {
      pages.push(
        <Button
          key={i}
          variant={page === i ? 'default' : 'outline'}
          className="w-10 h-10 p-0"
          onClick={() => router.push(`/tracks?${createQueryString(i)}`)}
        >
          {i}
        </Button>
      );
    }

    return pages;
  };
  return (
    <div className="w-full flex items-center justify-center gap-1">
      {3 < page ? (
        <>
          <Button
            variant={'outline'}
            onClick={() => router.push(`/tracks?${createQueryString(1)}`)}
            className="w-10 h-10 p-0"
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>
        </>
      ) : null}
      {renderPageNumbers()}
      {page + 3 <= totalPages ? (
        <>
          <div className="px-2">...</div>
          <Button
            className="w-10 h-10 p-0"
            variant={page === totalPages ? 'default' : 'outline'}
            onClick={() =>
              router.push(`/tracks?${createQueryString(totalPages)}`)
            }
          >
            {totalPages}
          </Button>
        </>
      ) : null}
    </div>
  );
};
