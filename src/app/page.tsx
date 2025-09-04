'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js'
import './globals.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend)

const meta = 500
const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

export default function Home() {
  const router = useRouter()
  const [fixos, setFixos] = useState<number[]>([])
  const [avulsos, setAvulsos] = useState<number[]>([])
  const [tema, setTema] = useState<'light' | 'dark'>('light')
  const [menuAberto, setMenuAberto] = useState(false)
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(new Date())

  useEffect(() => {
    const temaSalvo = localStorage.getItem('tema') as 'light' | 'dark' | null
    if (temaSalvo) setTema(temaSalvo)

    const carregarDados = () => {
      // Carregar valores do localStorage
      const fixosSalvos = localStorage.getItem('fixos')
      const avulsosSalvos = localStorage.getItem('avulsos')

      if (fixosSalvos) {
        setFixos(JSON.parse(fixosSalvos))
      } else {
        setFixos([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
      }

      if (avulsosSalvos) {
        setAvulsos(JSON.parse(avulsosSalvos))
      } else {
        setAvulsos([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
      }
    }
    
    carregarDados();
    // Adiciona um listener para recarregar os dados se a página voltar a ter foco
    window.addEventListener('focus', carregarDados)

    return () => {
      window.removeEventListener('focus', carregarDados)
    }
  }, [])

  const alternarTema = () => {
    const novoTema = tema === 'light' ? 'dark' : 'light'
    setTema(novoTema)
    localStorage.setItem('tema', novoTema)
  }

  const totalFixos = fixos.reduce((acc, val) => acc + val, 0)
  const totalAvulsos = avulsos.reduce((acc, val) => acc + val, 0)
  const total = totalFixos + totalAvulsos

  const corFixos = 'rgba(54, 162, 235, 0.7)'
  const corAvulsos = 'rgba(255, 99, 132, 0.7)'

  const data = {
    labels: meses,
    datasets: [
      {
        label: 'Gastos Fixos (R$)',
        data: fixos,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: corFixos,
        tension: 0.2,
        pointRadius: 6,
        pointHoverRadius: 8
      },
      {
        label: 'Gastos Avulsos (R$)',
        data: avulsos,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: corAvulsos,
        tension: 0.2,
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ],
  }

  const dataBar = {
    labels: meses,
    datasets: [
      {
        label: 'Gastos Fixos (R$)',
        data: fixos,
        backgroundColor: corFixos,
      },
      {
        label: 'Gastos Avulsos (R$)',
        data: avulsos,
        backgroundColor: corAvulsos,
      }
    ],
  }

  return (
    <main
      className={tema === 'dark' ? 'tema-escuro' : 'tema-claro'}
      style={{ transition: 'background-color 0.4s ease, color 0.4s ease', minHeight: '100vh', padding: '1rem' }}
    >
      {/* Botões */}
      <div className="flex gap-2 mb-4">
        <button onClick={alternarTema} className="botao-neon">☾/☼</button>
        <button onClick={() => setMenuAberto(!menuAberto)} className="botao-config">☰</button>
      </div>

      {/* Menu lateral */}
      {menuAberto && (
        <div className="menu-lateral">
          <div className="perfil">
            <img src="/images/img_luffy.webp" alt="Perfil" />
            <h3>Pedro Henrique</h3>
            <p>teste@teste.com</p>
          </div>
          <div className="links">
            <a href="#"><i className="fas fa-home"></i>Home</a>
            <a href="/valores"><i className="fas fa-plus"></i>Adicionar Valores</a>
            <a href="#"><i className="fas fa-envelope"></i>Messages</a>
            <a href="#"><i className="fas fa-bell"></i>Notification</a>
            <a href="#"><i className="fas fa-map-marker-alt"></i>Location</a>
            <a href="/login"><i className="fas fa-login"></i>Tela de Login</a>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">DashBoard Financeiro </h1>

      <div className="cards-container">
        <section className="card-info">
          <h2>Meta de Economia</h2>
          <p>💰 R$ {meta}/mês</p>
        </section>

        <section className="card-info">
          <h2>Total</h2>
          <p><strong>R$ {total}</strong> (Fixos: {totalFixos} | Avulsos: {totalAvulsos})</p>
        </section>

        {/* Gráfico de Barras */}
        <section className="mb-8 graph-container" style={{ height: '350px', maxWidth: '1000px', margin: '0 auto' }}>
          <Bar data={dataBar} options={{ maintainAspectRatio: false }} />
        </section>

        {/* Gráfico + Calendário */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <section className="mb-8 graph-container" style={{ height: '250px', maxWidth: '610px', flex: 1 }}>
            <Line data={data} options={{ maintainAspectRatio: false }} />
          </section>
          <div>
            <Calendar value={dataSelecionada} />
          </div>
        </div>
      </div>
    </main>
  )
}