import type { FC } from 'react'
import Table, { type TableProps, type Project } from './table'
import { createColumnHelper } from '@tanstack/react-table'
import OpenLinkIcon from '~icons/material-symbols/open-in-new'
import GitIcon from '~icons/simple-icons/git'

export interface ProjectsProps extends Pick<TableProps, 'data'> {}

const columnHelper = createColumnHelper<Project>()

const Projects: FC<ProjectsProps> = ({ data }) => {
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
      header: () => <span>Year</span>
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
    columnHelper.accessor('madeFor', {
      cell: (info) => info.getValue(),
      header: () => <span>Made for?</span>
    }),
    columnHelper.accessor('builtWith', {
      cell: (info) => (
        <div className='flex flex-wrap gap-x-2 gap-y-1 py-1'>
          {info.getValue()?.map((val, key) => (
            <span
              className='text-xs py-1 px-3 rounded-full bg-text-primary/10 border border-text-primary/30 uppercase'
              key={key}
            >
              {val}
            </span>
          ))}
        </div>
      ),
      header: () => <span>Built With?</span>
    }),
    columnHelper.display({
      id: 'urls',
      cell: (info) => {
        const { url, repo } = info.cell.row.original

        if (!url && !repo) {
          return null
        }

        return (
          <div className='flex gap-2'>
            {url && (
              <a href={url} target='_blank'>
                <OpenLinkIcon />
              </a>
            )}
            {repo && (
              <a href={repo} target='_blank'>
                <GitIcon />
              </a>
            )}
          </div>
        )
      },
      header: () => <span>URLs</span>
    })
  ]

  const columnsForMobile = [
    columnHelper.display({
      id: 'mobile',
      cell: (info) => {
        const { title, status, date, dateEnd, builtWith, url, repo } =
          info.cell.row.original

        return (
          <div className='flex gap-4 justify-between'>
            <div className='flex flex-col flex-1 gap-1'>
              {date && (
                <span className='text-sm  uppercase w-max'>
                  {dateEnd
                    ? `${date.getFullYear()}-${dateEnd.getFullYear()}`
                    : date.getFullYear()}
                </span>
              )}
              <h2 className='font-bold text-xl'>{title}</h2>
              <span className='text-sm uppercase'>{status}</span>
              {builtWith && (
                <div className='flex flex-wrap items-center gap-2'>
                  {builtWith.map((entry, key) => (
                    <span
                      key={key}
                      className='text-xs py-1 px-3 rounded-full bg-text-primary/10 border border-text-primary/30 uppercase mt-3'
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
                  <a href={url} target='_blank'>
                    <OpenLinkIcon />
                  </a>
                )}
                {repo && (
                  <a href={repo} target='_blank'>
                    <GitIcon />
                  </a>
                )}
              </div>
            )}
          </div>
        )
      },
      header: () => <span className='text-xl'>All Projects</span>
    })
  ]

  return (
    <>
      <Table className='max-sm:hidden' data={data} columns={columns} />
      <Table className='sm:hidden' data={data} columns={columnsForMobile} />
    </>
  )
}

export default Projects
