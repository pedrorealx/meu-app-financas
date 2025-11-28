'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [dark, setDark] = useState(false)

  const [emailSalvo, setEmailSalvo] = useState('teste@teste.com')
  const [senhaSalva, setSenhaSalva] = useState('150105')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const emailLocal = localStorage.getItem('emailLogin')
      const senhaLocal = localStorage.getItem('senhaLogin')
      const temaLocal = localStorage.getItem('temaLogin')

      if (emailLocal) setEmailSalvo(emailLocal)
      if (senhaLocal) setSenhaSalva(senhaLocal)
      if (temaLocal) setDark(temaLocal === 'dark')
    }
  }, [])

  function alternarTema() {
    const novoTema = !dark
    setDark(novoTema)
    localStorage.setItem('temaLogin', novoTema ? 'dark' : 'light')
  }

  const data = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril'],
    datasets: [
      {
        label: 'Gastos Mensais (R$)',
        data: [500, 700, 400, 900],
        borderColor: '#4BC0C0',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  }

  function handleLogin() {
    if (email === emailSalvo && senha === senhaSalva) {
      router.push('/')
    } else {
      alert('E-mail ou senha incorretos!')
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: dark
        ? 'linear-gradient(135deg, #2c3e50, #000000)'
        : 'linear-gradient(135deg, #e0f7fa, #ffffff)'
    }}>

      <div style={{
        display: 'flex',
        background: dark ? '#1e1e1e' : '#fff',
        color: dark ? '#f5f5f5' : '#000',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        maxWidth: '900px',
        width: '100%',
        position: 'relative'
      }}>

        {/* Botão Tema */}
        <button
          onClick={alternarTema}
          style={{
            position: 'absolute',
            top: 15,
            right: 15,
            borderRadius: '50%',
            border: 'none',
            padding: '10px',
            cursor: 'pointer',
            background: dark ? '#333' : '#eee'
          }}
        >
          ☾ / ☼
        </button>

        {/* Formulário */}
        <div style={{ flex: 1, padding: '40px' }}>
          <h2>Acesse sua conta</h2>

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={estiloInput(dark)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            style={estiloInput(dark)}
          />

          <button
            onClick={handleLogin}
            style={estiloBotao}
          >
            Entrar
          </button>
        </div>

        {/* Gráfico */}
        <div style={{
          flex: 1,
          background: dark ? '#121212' : '#f4f4f4',
          padding: '30px',
        }}>
          <h3 style={{ textAlign: 'center' }}>Gastos Recentes</h3>
          <Line data={data} />
        </div>

      </div>
    </div>
  )
}

function estiloInput(dark: boolean) {
  return {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    background: dark ? '#2b2b2b' : '#fff',
    color: dark ? '#fff' : '#000'
  }
}

const estiloBotao = {
  width: '100%',
  padding: '10px',
  background: '#4BC0C0',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
}
