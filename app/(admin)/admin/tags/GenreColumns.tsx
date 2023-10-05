'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DataTableColumnHeader } from '@/components/dataTable/DataTableColumnHeader';
import { DeleteGenreDialog } from '@/app/(admin)/admin/tags/DeleteGenreDialog';
import { Genre } from '@/modules/genre/domain/genre';
import { EditGenreDialog } from '@/app/(admin)/admin/tags/EditGenreDialog';

export const genreColumns: ColumnDef<Genre>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="id" />
    ),
    cell: ({ row }) => <div className="">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'tag',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="tag" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate">{row.getValue('tag')}</div>
    ),
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="slug" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[500px]">{row.getValue('slug')}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const genre = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex h-8 w-8 p-0 ml-auto">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <EditGenreDialog genre={genre}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Edit
              </DropdownMenuItem>
            </EditGenreDialog>

            <DeleteGenreDialog genre={genre}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Delete
              </DropdownMenuItem>
            </DeleteGenreDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
