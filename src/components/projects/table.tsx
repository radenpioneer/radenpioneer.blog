import { type FC, type TableHTMLAttributes, useState } from 'react'
import type { CollectionEntry } from 'astro:content'
import {
  type AccessorKeyColumnDef,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type DisplayColumnDef,
  type SortingState
} from '@tanstack/react-table'
import { clsx } from 'clsx/lite'
import SortDownIcon from '~icons/material-symbols/keyboard-arrow-down'
import SortUpIcon from '~icons/material-symbols/keyboard-arrow-up'

export type Project = CollectionEntry<'projects'>['data']

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  data: Array<Project>
  columns: Array<
    AccessorKeyColumnDef<Project, any> | DisplayColumnDef<Project, any>
  >
  defaultSorting?: SortingState
}

const Table: FC<TableProps> = ({
  data,
  columns,
  defaultSorting = [],
  className,
  ...props
}) => {
  const [sorting, setSorting] = useState<SortingState>(defaultSorting)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting
    },
    enableSortingRemoval: false
  })

  return (
    <table
      className={clsx(
        'table-auto w-full border-collapse border-2 border-text-primary/50',
        className
      )}
      {...props}
    >
      <thead>
        {table.getHeaderGroups().map((hGroup) => (
          <tr className='bg-text-primary/25' key={hGroup.id}>
            {hGroup.headers.map((header) => (
              <th
                className={clsx(
                  'border-2 border-text-primary/50 p-4',
                  header.column.getCanSort() && 'cursor-pointer'
                )}
                onClick={header.column.getToggleSortingHandler()}
                key={header.id}
              >
                {!header.isPlaceholder && (
                  <div className='flex items-center'>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === 'desc' ? (
                      <SortDownIcon />
                    ) : header.column.getIsSorted() === 'asc' ? (
                      <SortUpIcon />
                    ) : null}
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td className='border-2 border-text-primary/50 p-4' key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
