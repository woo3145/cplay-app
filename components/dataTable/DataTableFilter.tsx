'use client';

import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  field: string;
}

export function DataTableFilter<TData>({
  table,
  field,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filter ${field}...`}
          value={(table.getColumn(field)?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn(field)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
    </div>
  );
}
