'use client'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { IconButton } from '@/components/icon-button'
import { Table } from '@/components/table/table'
import { TableHeader } from '@/components/table/table-header'
import { TableCell } from '@/components/table/table-cell'
import { TableRow } from '@/components/table/table-row'
import { ChangeEvent, useState } from 'react'
import { SearchInput } from './search-input'
import { attendeesStatic } from '@/data/attendees'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(attendeesStatic.length / 10)

  function handleInputSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  function goToFirstPage() {
    setPage(1)
  }
  function goToNextPage() {
    setPage((previousPage) => previousPage + 1)
  }
  function goToPreviousPage() {
    setPage((previousPage) => previousPage - 1)
  }
  function goToLastPage() {
    setPage(totalPages)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>

        <SearchInput onChange={handleInputSearch} value={search} />
      </div>
      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader className="w-12">
              <input
                type="checkbox"
                className="size-4 bg-black/20 rounded border border-white/10 "
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participantes</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader className="w-16"></TableHeader>
          </tr>
        </thead>
        <tbody>
          {attendeesStatic
            .slice((page - 1) * 10, page * 10)
            .map((attendee, i) => {
              return (
                <TableRow key={attendee.id + '-' + i}>
                  <TableCell>
                    <input
                      type="checkbox"
                      className="size-4 bg-black/20 rounded border border-white/10 "
                    />
                  </TableCell>
                  <TableCell>{attendee.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-zinc-50">
                        {attendee.name}
                      </span>
                      <span>{attendee.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                  <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
                  <TableCell>
                    <IconButton transparent>
                      <MoreHorizontal className="size-4" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando 10 de {attendeesStatic.length} itens
            </TableCell>
            <TableCell colSpan={3}>
              <div className="flex items-center gap-8 justify-end">
                <span>
                  Pagina {page} de {totalPages}
                </span>
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}
