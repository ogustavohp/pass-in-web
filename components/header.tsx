import Image from 'next/image'
import icon from '@/assets/icon.svg'
import { NavLink } from './nav-link'

export function Header() {
  return (
    <header className="flex items-center gap-5 py-2">
      <Image alt="icon </>" src={icon} />
      <nav className="flex items-center gap-5">
        <NavLink href="/eventos" active>
          Eventos
        </NavLink>
        <NavLink href="/">Participantes</NavLink>
      </nav>
    </header>
  )
}
