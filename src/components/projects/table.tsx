import { type FC, useState, useEffect } from 'react'
import { type CollectionEntry } from 'astro:content'
import {
  type AccessorKeyColumnDef,
  type DisplayColumnDef,
  type SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender
} from '@tanstack/react-table'
import {
  type HTMLMotionProps,
  motion,
  stagger,
  AnimatePresence
} from 'motion/react'
import { clsx } from 'clsx/lite'
import SortDownIcon from '~icons/material-symbols/keyboard-arrow-down'
import SortUpIcon from '~icons/material-symbols/keyboard-arrow-up'

export type Project = CollectionEntry<'projects'>['data']

export interface TableProps extends HTMLMotionProps<'table'> {
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
  const [visible, setVisible] = useState<boolean>(true)

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

  useEffect(() => {
    const handleTableVisibility = () => {
      setVisible(false)
    }

    document.addEventListener('astro:before-preparation', handleTableVisibility)
    return () => {
      document.removeEventListener(
        'astro:before-preparation',
        handleTableVisibility
      )
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.table
          className={clsx(
            'table-auto w-full border-collapse border-2 border-text-primary/50',
            className
          )}
          initial='initial'
          animate='current'
          exit='exit'
          variants={{
            initial: {
              opacity: 0,
              y: 25
            },
            current: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.08
              }
            },
            exit: {
              opacity: 0,
              y: 25,
              transition: {
                duration: 0.08
              }
            }
          }}
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
          <motion.tbody
            variants={{
              initial: {},
              current: {
                transition: {
                  delay: 0.08,
                  delayChildren: stagger(0.08)
                }
              }
            }}
          >
            {table.getRowModel().rows.map((row) => (
              <motion.tr
                variants={{
                  initial: {
                    opacity: 0,
                    y: 10
                  },
                  current: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 300,
                      damping: 24
                    }
                  }
                }}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    className='border-2 border-text-primary/50 p-4'
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </motion.tr>
            ))}
          </motion.tbody>
        </motion.table>
      )}
    </AnimatePresence>
  )
}

export default Table
