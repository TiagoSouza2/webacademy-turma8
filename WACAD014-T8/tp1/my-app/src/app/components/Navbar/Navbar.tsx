import Link from "next/link";

export function Navbar () {
    return (
        <nav className='navbar navbar-expand-md bg-body border-bottom sticky-top'>
          <div className='container-fluid'>
  
              <Link className="navbar-brand fw-bold" href="/">
              Minha Logo
              </Link>
              WA Loja
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
              <ul className='navbar-nav me-auto mb-2 mb-md-0'>
                <li className='nav-item'>
                  <Link className='nav-link' href='/'>
                    Início
                  </Link>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/cart'>
                    Carrinho
                  </a>
                </li>
              </ul>
  
              <button className='btn btn-primary rounded-3'>Sair</button>
            </div>
          </div>
        </nav>
    )
}