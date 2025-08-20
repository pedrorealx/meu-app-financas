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
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend)

const meta = 500
const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

export default function Home() {
  const router = useRouter()

  const [fixos, setFixos] = useState([400, 350, 200, 500, 700, 300, 100, 200, 250, 100, 400, 500])
  const [avulsos, setAvulsos] = useState([100, 300, 150, 200, 300, 200, 50, 230, 100, 50, 400, 450])
  const [tema, setTema] = useState<'light' | 'dark'>('light')
  const [abrirConfig, setAbrirConfig] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false) // <-- Novo estado do menu
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

  const getStatus = (valor: number) => {
    if (valor > meta) return { texto: 'Fora da meta', classe: 'foraDeMeta' }
    if (valor < meta) return { texto: 'Dentro da meta', classe: 'dentroDaMeta' }
    return { texto: 'Na meta', classe: 'naMeta' }
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

  const atualizarValor = (tipo: 'fixos' | 'avulsos', index: number, novoValor: number) => {
    if (tipo === 'fixos') {
      const novos = [...fixos]
      novos[index] = novoValor
      setFixos(novos)
    } else {
      const novos = [...avulsos]
      novos[index] = novoValor
      setAvulsos(novos)
    }
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
      {/* Botões */}
      <div className="flex gap-2 mb-4">
        
        <button onClick={alternarTema} className="botao-neon">☾/☼</button>
        <button onClick={() => setMenuAberto(!menuAberto)} className="botao-config">☰</button> {/* Botão menu */}
      </div>

      {/* Menu lateral renderizado condicionalmente */}
      {menuAberto && (
        <div className="menu-lateral">
          <div className="perfil">
           <img src="/images/img_luffy.webp" alt="Perfil" />


            <h3>Pedro Henrique</h3>
            <p>teste@teste.com</p>
          </div>
          <div className="links">
            <a href="#"><i className="fas fa-home"></i>Home</a>
            <a href="#"><i className="fas fa-folder"></i>File</a>
            <a href="#"><i className="fas fa-envelope"></i>Messages</a>
            <a href="#"><i className="fas fa-bell"></i>Notification</a>
            <a href="#"><i className="fas fa-map-marker-alt"></i>Location</a>
            <a href="/login"><i className="fas fa-login"></i>Tela de Login</a>
          </div>
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
          <p><strong>R$ {total}</strong> (Fixos: {totalFixos} | Avulsos: {totalAvulsos})</p>
        </section>

        {/* Gráfico de Barras */}
        <section className="mb-8 graph-container" style={{ height: '350px', maxWidth: '1000px', margin: '0 auto' }}>
          <Bar data={dataBar} options={{ maintainAspectRatio: false }} />
        </section>

        {/* Gráfico + Calendário lado a lado */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <section className="mb-8 graph-container" style={{ height: '250px', maxWidth: '610px', flex: 1 }}>
            <Line data={data} options={{ maintainAspectRatio: false }} />
          </section>
          <div>
            <Calendar value={dataSelecionada} />
          </div>
        </div>

        {/* Editar valores */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Editar Valores Mensais</h2>
          <div className="grid grid-cols-2 gap-4">
            {meses.map((mes, index) => (
              <div key={mes} className="p-2 border rounded">
                <h3 className="font-bold mb-2">{mes}</h3>
                <div className="flex items-center gap-2 mb-1">
                  <label className="w-20">Fixos:</label>
                  <input
                    type="number"
                    value={fixos[index]}
                    onChange={(e) => atualizarValor('fixos', index, Number(e.target.value))}
                    className="border p-1 rounded w-24"
                    style={inputStyle}
                  />
                  <span className={getStatus(fixos[index]).classe}>{getStatus(fixos[index]).texto}</span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="w-20">Avulsos:</label>
                  <input
                    type="number"
                    value={avulsos[index]}
                    onChange={(e) => atualizarValor('avulsos', index, Number(e.target.value))}
                    className="border p-1 rounded w-24"
                    style={inputStyle}
                  />
                  <span className={getStatus(avulsos[index]).classe}>{getStatus(avulsos[index]).texto}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
