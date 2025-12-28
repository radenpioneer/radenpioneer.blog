import type { FC, TableHTMLAttributes } from 'react'
import type { CollectionEntry } from 'astro:content'
import {
  type AccessorKeyColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  type DisplayColumnDef
} from '@tanstack/react-table'
import { clsx } from 'clsx/lite'

export type Project = CollectionEntry<'projects'>['data']

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  data: Array<Project>
  columns: Array<
    AccessorKeyColumnDef<Project, any> | DisplayColumnDef<Project, any>
  >
}

const Table: FC<TableProps> = ({ data, columns, className, ...props }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <table
      className={clsx(
        'table-auto w-full border-collapse border border-text-primary/50',
        className
      )}
      {...props}
    >
      <thead>
        {table.getHeaderGroups().map((hGroup) => (
          <tr className='bg-text-primary/25' key={hGroup.id}>
            {hGroup.headers.map((header) => (
              <th className='border border-text-primary/50 p-4' key={header.id}>
                {!header.isPlaceholder &&
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext()
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
              <td className='border border-text-primary/50 p-4' key={cell.id}>
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
