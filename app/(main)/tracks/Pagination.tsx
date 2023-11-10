'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronsLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  totalItems: number;
  take: number;
  page: number;
}

export const Pagination = ({ totalItems, take, page }: Props) => {
  const router = useRouter();
  const totalPages = Math.ceil(totalItems / take);
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
          variant={page === i ? 'default' : 'outline'}
          className="w-10 h-10 p-0"
          onClick={() => router.push(`/tracks?page=${i}`)}
        >
          {i}
        </Button>
      );
    }

    return pages;
  };
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-lg flex items-center gap-1">
        {3 < page ? (
          <>
            <Button
              variant={'outline'}
              onClick={() => router.push(`/tracks?page=${1}`)}
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
              onClick={() => router.push(`/tracks?page=${totalPages}`)}
            >
              {totalPages}
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
};
