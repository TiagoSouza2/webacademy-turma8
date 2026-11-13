"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    console.log("Dados do Login:", {
      email,
      senha,
    });

    router.push("/");
  };

  return (
    <main className="container-fluid p-0">
      <div className="row g-0 min-vh-100">

        <div className="col-md-6 bg-body-tertiary d-flex align-items-center justify-content-center">
          <div className="text-center p-5">
            <h2 className="fw-bold">
              Bem vindo à WA Loja!
            </h2>

            <p className="text-muted">
              Que bom ter você de volta.
            </p>
          </div>
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div
            className="card border-0 shadow-sm rounded-4 p-4 m-3 w-100"
            style={{ maxWidth: "400px" }}
          >
            <h4 className="fw-bold mb-4">Entrar</h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setEmail(event.target.value)
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="senha" className="form-label">
                  Senha
                </label>

                <input
                  type="password"
                  id="senha"
                  className="form-control"
                  value={senha}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setSenha(event.target.value)
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Entrar
              </button>

              <div className="text-center mt-3">
                <Link href="/register">
                  Não tenho cadastro
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
