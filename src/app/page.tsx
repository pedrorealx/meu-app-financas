'use client'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
import './globals.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

const data = {
  labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro','Outubro','Novembro','Dezembro',],
  datasets: [
    {
      label: 'Gastos Mensais (R$)',
      data: [800, 650, 700, 900, 1000, 900 , 111 , 430 , 800 , 1000 , 800, 950 ],
      borderColor: 'rgba(75,192,192,1)',
      tension: 0.2,
    },
  ],
}

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Resumo Financeiro</h1>

      <section className="mb-8">
        <Line data={data} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Despesas Recentes</h2>
        <ul className="bg-gray-100 p-4 rounded shadow">
          <li>🍔 Almoço - R$ 30,00</li>
          <li>🚌 Transporte - R$ 8,00</li>
          <li>📱 Plano Celular - R$ 50,00</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Meta de Economia</h2>
        <p>💰 Meta: R$ 500/mês</p>
        <p>📈 Abril: R$ 420 (📉 -16%)</p>
      </section>
    </main>
  )
}
