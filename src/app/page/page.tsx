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
  Tooltip,
  Legend
} from 'chart.js'
import './globals.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

const meta = 500
const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

export default function Home() {
  const router = useRouter()

  // Estados
  const [valores, setValores] = useState([400, 650, 200, 700, 1000, 500, 111, 430, 350, 100, 800, 950])
  const [tema, setTema] = useState<'light' | 'dark'>('light')
  const [abrirConfig, setAbrirConfig] = useState(false)
  
  // **Estado do calendário**
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(new Date())

  useEffect(() => {
    const temaSalvo = localStorage.getItem('tema') as 'light' | 'dark' | null
    if (temaSalvo) setTema(temaSalvo)
  }, [])

  const alternarTema = () => {
    const novoTema = tema === 'light' ? 'dark' : 'light'
    setTema(novoTema)
    localStorage.setItem('tema', novoTema)
  }

  const irParaLogin = () => {
    router.push('/login')
  }

  const getStatus = (valor: number) => {
    if (valor > meta) return { texto: 'Fora da meta', classe: 'foraDeMeta' }
    if (valor < meta) return { texto: 'Dentro da meta', classe: 'dentroDaMeta' }
    return { texto: 'Na meta', classe: 'naMeta' }
  }

  const cores = valores.map(v => {
    if (v > meta) return 'rgba(255, 0, 0, 1)'
    if (v < meta) return 'rgba(75, 192, 75, 1)'
    return 'rgba(255, 206, 86, 1)'
  })

  const total = valores.reduce((acc, val) => acc + val, 0)

  const data = {
    labels: meses,
    datasets: [
      {
        label: 'Gastos Mensais (R$)',
        data: valores,
        borderColor: cores,
        backgroundColor: cores,
        tension: 0.2,
        pointRadius: 6,
        pointHoverRadius: 8
      },
    ],
  }

  const atualizarValor = (index: number, novoValor: number) => {
    const novosValores = [...valores]
    novosValores[index] = novoValor
    setValores(novosValores)
  }

  const inputStyle = {
    backgroundColor: tema === 'dark' ? '#333' : '#fff',
    color: tema === 'dark' ? '#f0f0f0' : '#000',
    borderColor: tema === 'dark' ? '#555' : '#cbd5e0'
  }

  return (
    <main
      className={tema === 'dark' ? 'tema-escuro' : 'tema-claro'}
      style={{ transition: 'background-color 0.4s ease, color 0.4s ease', minHeight: '100vh', padding: '1rem' }}
    >
      {/* Botões de ação */}
      <div className="flex gap-2 mb-4">
        <button 
          className="botao-config" 
          onClick={() => setAbrirConfig(!abrirConfig)}
        >
          ⚙
        </button>

        <button onClick={alternarTema} className="botao-neon">
          ☾/☼
        </button>
      </div>

      {/* Menu dropdown de configurações */}
      {abrirConfig && (
        <div 
          className="menu-config"
          style={{
            position: 'fixed',
            top: '50px',
            left: '10px',
            backgroundColor: tema === 'dark' ? '#222' : '#fff',
            color: tema === 'dark' ? '#f0f0f0' : '#000',
            border: '2px solid var(--neon-color)',
            borderRadius: '8px',
            padding: '10px',
            zIndex: 1000,
            minWidth: '180px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}
        >
          <button className="botao-neon1" onClick={() => router.push('/login')}>
            Voltar para Login
          </button>
          <button className="botao-neon1" onClick={() => router.push('/admin')}>
            Página do Admin
          </button>
          <button className="botao-neon1" onClick={() => router.push('/suporte')}>
            Suporte
          </button>
          <button className="botao-neon1" onClick={() => alert('Mais opções aqui')}>
            Mais Configs
          </button>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">Resumo Financeiro</h1>

      <div className="cards-container">
        <section className="card-info">
          <h2>Meta de Economia</h2>
          <p>💰 R$ {meta}/mês</p>
        </section>

        <section className="card-info">
          <h2>Total</h2>
          <p><strong>R$ {total}</strong></p>
        </section>

        {/* Gráfico */}
        <section 
          className="mb-8 graph-container" 
          style={{ height: '350px', maxWidth: '1000px', margin: '0 auto' }}
        >
          <Line data={data} options={{ maintainAspectRatio: false }} />
        </section>

        {/* Gráfico + Calendário lado a lado */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <section 
            className="mb-8 graph-container" 
            style={{ height: '250px', maxWidth: '610px', flex: 1 }}
          >
            <Line data={data} options={{ maintainAspectRatio: false }} />
          </section>

          <div>
            <Calendar
              value={dataSelecionada}
              
            />
          </div>
        </div>

        {/* Valores mensais editáveis */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Editar Valores Mensais</h2>
          <div className="grid grid-cols-2 gap-2">
            {meses.map((mes, index) => {
              const status = getStatus(valores[index])
              return (
                <div key={mes} className="flex items-center gap-2">
                  <label className="w-24">{mes}:</label>
                  <input
                    type="number"
                    value={valores[index]}
                    onChange={(e) => atualizarValor(index, Number(e.target.value))}
                    className="border p-1 rounded w-24"
                    style={inputStyle}
                  />
                  <span className={status.classe}>{status.texto}</span>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}
