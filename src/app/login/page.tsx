'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

// Registrando módulos do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

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
    // Simulação de login — depois você vai integrar com backend
    if (email === 'teste@teste.com' && senha === '123456') {
      router.push('/page') // redireciona para o dashboard
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
      background: 'linear-gradient(135deg, #e0f7fa, #ffffff)'
    }}>
      <div style={{
        display: 'flex',
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        maxWidth: '900px',
        width: '100%'
      }}>
        {/* Formulário */}
        <div style={{ flex: 1, padding: '40px' }}>
          <h2 style={{ marginBottom: '20px' }}>Acesse sua conta</h2>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '8px'
            }}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '8px'
            }}
          />
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '10px',
              background: '#4BC0C0',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Entrar
          </button>
        </div>

        {/* Gráfico */}
        <div style={{
          flex: 1,
          background: '#f9f9f9',
          padding: '30px'
        }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Gastos Recentes</h3>
          <Line data={data} />
        </div>
      </div>
    </div>
  )
}
