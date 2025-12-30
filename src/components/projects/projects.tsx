import type { FC } from 'react'
import type { Project } from '~/data/projects/schema'
import Table, { type TableProps } from './table'
import { createColumnHelper } from '@tanstack/react-table'
import { motion } from 'motion/react'
import { clsx } from 'clsx/lite'
import OpenLinkIcon from '~icons/material-symbols/open-in-new'
import GitIcon from '~icons/simple-icons/git'

export interface ProjectsProps
  extends Omit<TableProps, 'columns' | 'defaultSorting'> {}

const columnHelper = createColumnHelper<Project>()

const Projects: FC<ProjectsProps> = ({ data, className, ...props }) => {
  const columns = [
    columnHelper.accessor('date', {
      cell: (info) => {
        const date = info.getValue()
        const { dateEnd } = info.cell.row.original

        if (!date) {
          return null
        }

        return (
          <span className='block text-center'>
            {dateEnd
              ? `${date.getFullYear()}-${dateEnd.getFullYear()}`
              : date.getFullYear()}
          </span>
        )
      },
      header: () => <span>Year</span>,
      sortingFn: 'datetime',
      sortUndefined: 'last'
    }),
    columnHelper.accessor('title', {
      cell: (info) => <b>{info.getValue()}</b>,
      header: () => <span>Project</span>
    }),
    columnHelper.accessor('status', {
      cell: (info) => (
        <span className='block text-center text-sm uppercase'>
          {info.getValue()}
        </span>
      ),
      header: () => <span>Status</span>
    }),
    columnHelper.accessor('builtWith', {
      cell: (info) => (
        <div className='flex flex-wrap gap-2'>
          {info.getValue()?.map((val, key) => (
            <span
              className='bg-text-primary/10 border-text-primary/30 rounded-full border px-3 py-1 text-xs uppercase'
              key={key}
            >
              {val}
            </span>
          ))}
        </div>
      ),
      header: () => <span>Built With?</span>,
      enableSorting: false
    }),
    columnHelper.display({
      id: 'urls',
      cell: (info) => {
        const { url, repo } = info.cell.row.original

        if (!url && !repo) {
          return null
        }

        const animation = { y: '-0.25rem', transition: { duration: 0.08 } }

        return (
          <div className='flex justify-center gap-2'>
            {url && (
              <motion.a
                href={url}
                whileHover={animation}
                target='_blank'
                aria-label={`visit ${url}`}
              >
                <OpenLinkIcon />
              </motion.a>
            )}
            {repo && (
              <motion.a
                href={repo}
                whileHover={animation}
                target='_blank'
                aria-label={`visit ${repo}`}
              >
                <GitIcon />
              </motion.a>
            )}
          </div>
        )
      },
      header: () => <span>URLs</span>
    })
  ]

  const columnsForMobile = [
    columnHelper.accessor('date', {
      cell: (info) => {
        const { title, status, date, dateEnd, builtWith, url, repo } =
          info.cell.row.original

        const tapAnimation = {
          scale: 0.8
        }

        return (
          <div className='flex justify-between gap-4'>
            <div className='flex flex-1 flex-col gap-1'>
              {date && (
                <span className='w-max text-sm uppercase'>
                  {dateEnd
                    ? `${date.getFullYear()}-${dateEnd.getFullYear()}`
                    : date.getFullYear()}
                </span>
              )}
              <h2 className='text-xl font-bold'>{title}</h2>
              <span className='text-sm uppercase'>{status}</span>
              {builtWith && (
                <div className='flex flex-wrap items-center gap-2'>
                  {builtWith.map((entry, key) => (
                    <span
                      key={key}
                      className='bg-text-primary/10 border-text-primary/30 mt-3 rounded-full border px-3 py-1 text-xs uppercase'
                    >
                      {entry}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {(url || repo) && (
              <div className='flex items-center gap-2'>
                {url && (
                  <motion.a
                    className='text-xl'
                    href={url}
                    whileTap={tapAnimation}
                    target='_blank'
                    aria-label={`visit ${url}`}
                  >
                    <OpenLinkIcon />
                  </motion.a>
                )}
                {repo && (
                  <motion.a
                    className='text-xl'
                    href={repo}
                    whileTap={tapAnimation}
                    target='_blank'
                    aria-label={`visit ${repo}`}
                  >
                    <GitIcon />
                  </motion.a>
                )}
              </div>
            )}
          </div>
        )
      },
      header: () => <span className='text-xl'>All Projects</span>,
      sortingFn: 'datetime',
      sortUndefined: 'last'
    })
  ]

  const defaultSorting = [{ id: 'date', desc: true }]
  const defaultMobileSorting = [{ id: 'date', desc: true }]

  return (
    <>
      <Table
        className={clsx('max-sm:hidden', className)}
        data={data}
        columns={columns}
        defaultSorting={defaultSorting}
        {...props}
      />
      <Table
        className={clsx('sm:hidden', className)}
        data={data}
        columns={columnsForMobile}
        defaultSorting={defaultMobileSorting}
        {...props}
      />
    </>
  )
}

export default Projects
