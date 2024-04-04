'use client'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from 'lucide-react'
import { IconButton } from '@/components/icon-button'
import { Table } from '@/components/table/table'
import { TableHeader } from '@/components/table/table-header'
import { TableCell } from '@/components/table/table-cell'
import { TableRow } from '@/components/table/table-row'
import { ChangeEvent, useState } from 'react'
import { SearchInput } from './search-input'
import { attendeesStatic } from '@/data/attendees'

export function AttendeeList() {
  const [search, setSearch] = useState('')

  function handleInputSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
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
          {attendeesStatic.map((attendee, i) => {
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
                <TableCell>
                  {attendee.createdAt}
                  dias atrás
                </TableCell>
                <TableCell>{attendee.checkedInAt}3 dias atrás</TableCell>
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
            <TableCell colSpan={3}>Mostrando 10 de 228 itens</TableCell>
            <TableCell colSpan={3}>
              <div className="flex items-center gap-8 justify-end">
                <span>Pagina 1 de 42</span>
                <div className="flex gap-1.5">
                  <IconButton>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton>
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton>
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
