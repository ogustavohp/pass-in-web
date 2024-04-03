import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface TableHeaderProps extends ComponentProps<'th'> {}

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <th
      className={twMerge(
        'py-3 px-4 text-sm font-semibold text-left',
        className,
      )}
      {...props}
    />
  )
}
