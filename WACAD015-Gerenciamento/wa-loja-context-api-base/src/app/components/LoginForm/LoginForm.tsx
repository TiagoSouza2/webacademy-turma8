'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

type LoginFormInputs = {
  email: string
  password: string
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>()

  const router = useRouter()

  const onSubmit: SubmitHandler<LoginFormInputs> = () => {
    router.push('/')
  }

  return (
    <div className='col-12 col-md-8 d-flex justify-content-center align-items-center p-4'>
      <div className='card border-0 shadow-sm rounded-4 w-100' style={{ maxWidth: 420 }}>
        <div className='card-body p-4 p-md-5'>
          <h4 className='card-title fw-bold mb-4'>Entrar</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <label htmlFor='password' className='form-label'>
            Senha
          </label>
          <input
            type='password'
            className='form-control form-control-lg'
            id='password'
            {...register('password', { required: true, minLength: 6 })}
          />
          {errors.password?.type === 'required' && (
            <span className='text-danger'>Esse campo é obrigatório</span>
          )}

          {errors.password?.type === 'minLength' && (
            <span className='text-danger'>Minímo de 6 (seis) caracteres </span>
          )}
        </div>

        <div className='d-grid col-12'>
          <button type='submit' className='btn btn-primary btn-lg rounded-3'>
            Entrar
          </button>
        </div>

        <div className='text-center mt-3'>
          <Link href='/register' className='btn btn-link'>
            não tenho cadastro
          </Link>
          </div>
        </form>
          </div>
        </div>
    </div>
  )
}
