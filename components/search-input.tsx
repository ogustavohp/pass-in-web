import { Search } from 'lucide-react'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface SearchInputProps extends ComponentProps<'input'> {}

export function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className="px-3 py-1.5 w-72 border border-white/10 rounded-lg text-sm flex items-center gap-3">
      <Search className="size-4 text-emerald-300" />
      <input
        type="text"
        placeholder="Buscar participantes..."
        className={twMerge(
          'bg-transparent outline-none flex-1 p-0 border-0 text-sm focus:ring-0',
          className,
        )}
        {...props}
      />
    </div>
  )
}
