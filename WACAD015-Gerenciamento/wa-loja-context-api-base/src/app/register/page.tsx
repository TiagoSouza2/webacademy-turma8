'use client'

import Link from 'next/link'

import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

type RegisterFormInputs = {
  nome: string
  email: string
  emailConfirmar: string
  senha: string
}

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormInputs>()

  const router = useRouter()

  const onSubmit: SubmitHandler<RegisterFormInputs> = () => {
    router.push('/')
  }
  return (
    <main>
      <div className='container-fluid d-flex min-vh-100'>
        <div className='row min-vw-100 g-0'>
          <div className='col-12 col-md-4 bg-body-tertiary d-flex flex-column justify-content-center align-items-center p-5'>
            <h2 className='fw-bold mb-2 text-center'>Bem vindo à WA Loja!</h2>
            <p className='text-body-secondary text-center mb-0'>
              Crie sua conta para salvar seus favoritos.
            </p>
          </div>

          <div className='col-12 col-md-8 d-flex justify-content-center align-items-center p-4'>
            <div className='card border-0 shadow-sm rounded-4 w-100' style={{ maxWidth: 460 }}>
              <div className='card-body p-4 p-md-5'>
                <h4 className='card-title fw-bold mb-4'>Criar conta</h4>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-3'>
                <label htmlFor='nome' className='form-label'>
                  Nome
                </label>
                <input
                  type='text'
                  className='form-control form-control-lg'
                  id='nome'
                  aria-describedby='nome'
                  {...register('nome', { required: true })}
                />
                {errors.nome && (
                  <span className='text-danger'>Esse campo é obrigatório</span>
                )}
              </div>

              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>
                  Email
                </label>
                <input
                  type='email'
                  className='form-control form-control-lg'
                  id='email'
                  aria-describedby='email'
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <span className='text-danger'>Esse campo é obrigatório</span>
                )}
              </div>

              <div className='mb-3'>
                <label htmlFor='confirmarEmail' className='form-label'>
                  Confirmar email
                </label>
                <input
                  type='email'
                  className='form-control form-control-lg'
                  id='confirmarEmail'
                  aria-describedby='confirmarEmail'
                  {...register('emailConfirmar', { required: true })}
                />
                {errors.email && (
                  <span className='text-danger'>Esse campo é obrigatório</span>
                )}
              </div>
              <div className='mb-3'>
                <label htmlFor='senha' className='form-label'>
                  Senha
                </label>
                <input
                  type='password'
                  className='form-control form-control-lg'
                  id='senha'
                  {...register('senha', { required: true, minLength: 6 })}
                />

                {errors.senha?.type === 'required' && (
                  <span className='text-danger'>Esse campo é obrigatório</span>
                )}

                {errors.senha?.type === 'minLength' && (
                  <span className='text-danger'>
                    Minímo de 6 (seis) caracteres{' '}
                  </span>
                )}
              </div>

              <div className='d-grid col-12'>
                <button type='submit' className='btn btn-primary btn-lg rounded-3'>
                  Confirmar cadastro
                </button>
              </div>

              <div className='text-center mt-3'>
                <Link href='/login' className='btn btn-link'>
                  já possuo cadastro
                </Link>
              </div>
            </form>
          </div>
        </div>
          </div>
        </div>
      </div>
    </main>
  )
}
