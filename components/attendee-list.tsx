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
import { ChangeEvent, useEffect, useState } from 'react'
import { SearchInput } from './search-input'
import { useSearchParams } from 'next/navigation'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface Attendees {
  id: string
  name: string
  email: string
  createdAt: string
  checkedInAt: string | null
}

export function AttendeeList() {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(() => {
    if (searchParams.has('query')) {
      return searchParams.get('query') ?? ''
    }
    return ''
  })
  const [page, setPage] = useState(() => {
    if (searchParams.has('page')) {
      return Number(searchParams.get('page'))
    }
    return 1
  })
  const [attendees, setAttendees] = useState<Attendees[]>([])
  const [totalAttendees, setTotalAttendees] = useState(0)

  useEffect(() => {
    const url = new URL(
      'http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees',
    )
    url.searchParams.set('pageIndex', String(page - 1))
    if (search.length > 0) {
      url.searchParams.set('query', search)
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAttendees(data.attendees)
        setTotalAttendees(data.totalAttendees)
      })
  }, [page, search])

  const totalPages = Math.ceil(totalAttendees / 10)

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString())
    url.searchParams.set('query', search)
    window.history.pushState({}, '', url)
    setSearch(search)
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString())
    url.searchParams.set('page', String(page))
    window.history.pushState({}, '', url)
    setPage(page)
  }

  function handleInputSearch(e: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(e.target.value)
    setPage(1)
  }

  function goToFirstPage() {
    setCurrentPage(1)
  }
  function goToNextPage() {
    setCurrentPage(page + 1)
  }
  function goToPreviousPage() {
    setCurrentPage(page - 1)
  }
  function goToLastPage() {
    setCurrentPage(totalPages)
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
          {attendees &&
            attendees.map((attendee, i) => {
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
                  <TableCell>
                    {attendee.checkedInAt === null ? (
                      <span className="text-zinc-400">Não fez check-in</span>
                    ) : (
                      dayjs().to(attendee.checkedInAt)
                    )}
                  </TableCell>
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
              Mostrando {attendees.length} de {totalAttendees} itens
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
