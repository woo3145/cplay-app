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
import { Track as DomainTrack } from '@/modules/track/domain/track';
import Image from 'next/image';
import { formatDateForTable } from '@/lib/dateFormat';
import Link from 'next/link';
import {
  BundleStatus,
  BundleType,
  Bundle as DomainBundle,
} from '@/modules/bundle/domain/bundle';
import { DeleteBundleDialog } from './DeleteBundleDialog';
import { Badge } from '@/components/ui/badge';

export const bundleColumns: ColumnDef<DomainBundle>[] = [
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
    cell: ({ row }) => {
      const imageUrl = row.getValue('imageUrl') as string;
      return imageUrl ? (
        <div className="w-14 h-14 relative">
          <Image
            src={imageUrl}
            alt="coverIamge"
            fill
            sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
            className="rounded-md bg-foreground/10 object-cover"
          />
        </div>
      ) : (
        <div className="w-14 h-14 bg-foreground/10 rounded-md">null</div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
    cell: ({ row }) => (
      <div className="min-w-[15rem]">{row.getValue('name')}</div>
    ),
  },

  {
    accessorKey: 'tracks',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="tracks" />
    ),
    cell: ({ row }) => (
      <div className="min-w-[15rem]">
        {(row.getValue('tracks') as DomainTrack[]).length}
      </div>
    ),
  },
  {
    accessorKey: 'types',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="types" />
    ),
    cell: ({ row }) => (
      <div className="flex max-w-[100px] gap-2 flex-wrap">
        {(row.getValue('types') as BundleType[]).map((item) => (
          <Badge variant="outline" key={item.name}>
            {item.name}
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
        {row.getValue('status') === BundleStatus.PUBLISH ? (
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
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const bundle = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex h-8 w-8 p-0 ml-auto">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <Link href={`/admin/sounds/bundles/${bundle.id}/edit`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>

            <DeleteBundleDialog bundle={bundle}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Delete
              </DropdownMenuItem>
            </DeleteBundleDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
