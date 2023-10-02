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
import { DeleteMoodDialog } from '@/modules/admin/application/deleteMood/DeleteMoodDialog';
import { EditMoodDialog } from '@/modules/admin/application/editMood/EditMoodDialog';
import { Track as DomainTrack } from '@/modules/track/domain/track';
import Image from 'next/image';

export const trackColumns: ColumnDef<DomainTrack>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="id" />
    ),
    cell: ({ row }) => <div className="">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'imageUrl',
    header: ({ column }) => null,
    cell: ({ row }) => null,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="track" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Image
          src={row.getValue('imageUrl')}
          alt="track cover"
          width={100}
          height={100}
        />
        <div>{row.getValue('title')}</div>
      </div>
    ),
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const track = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex h-8 w-8 p-0 ml-auto">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <EditMoodDialog mood={track.moods[0]}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Edit
              </DropdownMenuItem>
            </EditMoodDialog>

            <DeleteMoodDialog mood={track.moods[0]}>
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
