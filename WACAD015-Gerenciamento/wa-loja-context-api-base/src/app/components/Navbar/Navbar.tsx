'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ROUTES_WITHOUT_NAVBAR = ['/login', '/register']

export default function Navbar() {
  const pathname = usePathname()

  if (ROUTES_WITHOUT_NAVBAR.includes(pathname)) return null

  return (
    <nav className='navbar navbar-expand-md bg-body border-bottom sticky-top'>
      <div className='container-fluid'>
        <a className='navbar-brand fw-bold' href='/'>
          Loja WA
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarCollapse'
          aria-controls='navbarCollapse'
          aria-expanded='false'
          aria-label='Abrir menu'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarCollapse'>
          <ul className='navbar-nav me-auto mb-2 mb-md-0 '>
            <li className='nav-item'>
              <Link className='nav-link' href='/'>
                Início
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' href='/favorites'>
                Lista de Favoritos
              </Link>
            </li>
          </ul>

          <Link className='nav-link ' href='/login'>
            <button type='button' className='btn btn-primary rounded-3'>
              Sair
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
