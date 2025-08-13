'use client'
import { useState, useEffect } from 'react'
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

const meta = 500
const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

export default function Home() {
  const [valores, setValores] = useState([
    400, 650, 200, 700, 1000, 500, 111, 430, 350, 100, 800, 950
  ])
  const [tema, setTema] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const temaSalvo = localStorage.getItem('tema') as 'light' | 'dark' | null
    if (temaSalvo) setTema(temaSalvo)
  }, [])

  const alternarTema = () => {
    const novoTema = tema === 'light' ? 'dark' : 'light'
    setTema(novoTema)
    localStorage.setItem('tema', novoTema)
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

  // Estilo inline para inputs conforme tema
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
      <button onClick={alternarTema} className="botao-neon mb-4">
        Alternar Tema
      </button>

      <h1 className="text-2xl font-bold mb-4">Resumo Financeiro</h1>

      {/* Container do gráfico com a classe graph-container para largura e altura */}
      <section className="mb-8 graph-container" style={{ minHeight: '400px' }}>
        {/* Passando width e height para o gráfico */}
        <Line data={data} width={800} height={400} options={{ maintainAspectRatio: false }} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2" >Editar Valores Mensais</h2>
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

      <section>
        <h2 className="text-xl font-semibold mb-2">Meta de Economia</h2>
        <p>💰 Meta: R$ {meta}/mês</p>
        <p>Total: <strong>R$ {total}</strong></p>
      </section>
    </main>
  )
}
