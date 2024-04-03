import { ComponentProps } from 'react'

interface NavLinkProps extends ComponentProps<'a'> {
  active?: boolean
}

export function NavLink({ active = false, ...props }: NavLinkProps) {
  return (
    <a
      className={`font-medium text-sm ${active && 'text-zinc-300'}`}
      {...props}
    />
  )
}
