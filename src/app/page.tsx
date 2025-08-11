'use client'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
import './globals.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

const meta = 500
const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

export default function Home() {
  const [valores, setValores] = useState([400, 650, 200, 700, 1000, 500, 111, 430, 350, 100, 800, 950])
  const [tema, setTema] = useState<'light' | 'dark'>('light')  // Estado do tema

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

  // Função que alterna tema
  const alternarTema = () => {
    setTema(tema === 'light' ? 'dark' : 'light')
  }

  return (
    <main className={`p-4 ${tema === 'dark' ? 'tema-escuro' : 'tema-claro'}`}>
      <button
        onClick={alternarTema}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Alternar Tema
      </button>

      <h1 className="text-2xl font-bold mb-4">Resumo Financeiro</h1>

      <section className="mb-8">
        <Line data={data} />
      </section>

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
