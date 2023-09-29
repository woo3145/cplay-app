'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Mood } from '@/modules/mood/domain/mood';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DataTableColumnHeader } from '@/components/dataTable/DataTableColumnHeader';
import { DeleteMoodDialog } from '@/modules/admin/application/deleteMood/DeleteMoodDialog';
import { EditMoodDialog } from '@/modules/admin/application/editMood/EditMoodDialog';

export const moodColumns: ColumnDef<Mood>[] = [
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
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const mood = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex h-8 w-8 p-0 ml-auto">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <EditMoodDialog mood={mood}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Edit
              </DropdownMenuItem>
            </EditMoodDialog>

            <DeleteMoodDialog mood={mood}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Delete
              </DropdownMenuItem>
            </DeleteMoodDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
