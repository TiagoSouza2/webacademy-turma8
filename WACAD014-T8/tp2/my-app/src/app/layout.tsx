import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

import { Navbar } from "./components/Navbar/Navbar";
import { BootstrapClient } from "./components/BootstrapClient/BootstrapClient";
import { ReactQueryClientProvider } from "./components/ReactQueryClient";

export const metadata: Metadata = {
  title: "WA Loja",
  description: "Loja virtual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ReactQueryClientProvider>
          <Navbar />
          {children}
          <BootstrapClient />
          <ToastContainer
          position="top-right"
          autoClose={3000}
          aria-label="Notificações da aplicação"
        />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
