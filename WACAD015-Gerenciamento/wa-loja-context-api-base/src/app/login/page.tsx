'use client'

import LoginForm from '../components/LoginForm/LoginForm'

export default function LoginPage() {
  return (
    <main>
      <div className='container-fluid d-flex min-vh-100'>
        <div className='row min-vw-100 g-0'>
          <div className='col-12 col-md-4 bg-body-tertiary d-flex flex-column justify-content-center align-items-center p-5'>
            <h2 className='fw-bold mb-2 text-center'>Bem vindo à WA Loja!</h2>
            <p className='text-body-secondary text-center mb-0'>
              Entre para ver seus produtos favoritos.
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </main>
  )
}
