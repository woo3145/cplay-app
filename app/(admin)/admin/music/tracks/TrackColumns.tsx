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
import {
  Track as DomainTrack,
  TrackStatus,
} from '@/modules/track/domain/track';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Mood } from '@/modules/mood/domain/mood';
import { formatDateForTable } from '@/lib/dateFormat';
import Link from 'next/link';
import { Genre } from '@/modules/genre/domain/genre';
import { DeleteTrackDialog } from './DeleteTrackDialog';

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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="coverImage" />
    ),
    cell: ({ row }) => (
      <div className="w-14 h-14 relative">
        <Image src={row.getValue('imageUrl')} alt="coverIamge" fill />
      </div>
    ),
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="title" />
    ),
    cell: ({ row }) => <div className="">{row.getValue('title')}</div>,
  },
  {
    accessorKey: 'length',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="length" />
    ),
    cell: ({ row }) => <div className="">{row.getValue('length')}</div>,
  },
  {
    accessorKey: 'bpm',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="bpm" />
    ),
    cell: ({ row }) => <div className="">{row.getValue('bpm')}</div>,
  },
  {
    accessorKey: 'key',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="key" />
    ),
    cell: ({ row }) => <div className="">{row.getValue('key')}</div>,
  },
  {
    accessorKey: 'genres',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="genres" />
    ),
    cell: ({ row }) => (
      <div className="flex w-full gap-2 flex-wrap">
        {(row.getValue('genres') as Genre[]).map((item) => (
          <Badge key={item.tag}>{item.tag}</Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'moods',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="mood" />
    ),
    cell: ({ row }) => (
      <div className="flex max-w-[100px] gap-2 flex-wrap">
        {(row.getValue('moods') as Mood[]).map((item) => (
          <Badge variant="outline" key={item.tag}>
            {item.tag}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="status" />
    ),
    cell: ({ row }) => (
      <div className="">
        {row.getValue('status') === TrackStatus.PUBLISH ? (
          <Badge>publish</Badge>
        ) : (
          <Badge variant="secondary">draft</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="createdAt" />
    ),
    cell: ({ row }) => (
      <div className="">
        {formatDateForTable(new Date(row.getValue('createdAt')))}
      </div>
    ),
  },
  {
    accessorKey: 'releaseDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="releaseDate" />
    ),
    cell: ({ row }) => (
      <div className="">
        {row.getValue('releaseDate')
          ? formatDateForTable(row.getValue('releaseDate'))
          : '-'}
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
            <Link href={`/admin/music/tracks/${track.id}/edit`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>

            <DeleteTrackDialog track={track}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Delete
              </DropdownMenuItem>
            </DeleteTrackDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
