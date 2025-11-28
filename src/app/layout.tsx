import './globals.css'

export const metadata = {
  title: 'Minhas Finanças',
  description: 'Controle Financeiro Pessoal'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
