'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import './valores.css'

const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

export default function Valores() {
  const router = useRouter()
  const [mes, setMes] = useState('')
  const [tipo, setTipo] = useState('')
  const [valor, setValor] = useState(0)
  const [tema, setTema] = useState<'light' | 'dark'>('light')

  // Armazena todos os valores salvos
  const [valoresFixos, setValoresFixos] = useState<number[]>(Array(12).fill(0))
  const [valoresAvulsos, setValoresAvulsos] = useState<number[]>(Array(12).fill(0))

  useEffect(() => {
    const temaSalvo = localStorage.getItem('tema') as 'light' | 'dark' | null
    if (temaSalvo) setTema(temaSalvo)

    // Carregar valores salvos
    const fixos = JSON.parse(localStorage.getItem('fixos') || '[]')
    const avulsos = JSON.parse(localStorage.getItem('avulsos') || '[]')
    setValoresFixos(fixos.length ? fixos : Array(12).fill(0))
    setValoresAvulsos(avulsos.length ? avulsos : Array(12).fill(0))
  }, [])

  // Sempre que o mês ou tipo mudar, preenche automaticamente o valor já salvo
  useEffect(() => {
    if (mes && tipo) {
      const indexMes = meses.indexOf(mes)
      if (tipo === 'fixo') {
        setValor(valoresFixos[indexMes] || 0)
      } else if (tipo === 'avulso') {
        setValor(valoresAvulsos[indexMes] || 0)
      }
    }
  }, [mes, tipo, valoresFixos, valoresAvulsos])

  const handleSalvarValores = (e) => {
    e.preventDefault()

    if (!mes || !tipo || valor <= 0) {
      alert('Por favor, preencha todos os campos corretamente.')
      return
    }

    const tipoStorage = tipo === 'fixo' ? 'fixos' : 'avulsos'
    const valoresAtuais = tipo === 'fixo' ? [...valoresFixos] : [...valoresAvulsos]

    const indexMes = meses.indexOf(mes)
    if (indexMes !== -1) {
      valoresAtuais[indexMes] = Number(valor)
      localStorage.setItem(tipoStorage, JSON.stringify(valoresAtuais))

      if (tipo === 'fixo') setValoresFixos(valoresAtuais)
      else setValoresAvulsos(valoresAtuais)

      alert(`Valor de R$${valor} salvo para ${mes} (${tipo}).`)
    }
  }

  const alternarTema = () => {
    const novoTema = tema === 'light' ? 'dark' : 'light'
    setTema(novoTema)
    localStorage.setItem('tema', novoTema)
  }

  const apagarTodos = () => {
    localStorage.removeItem('fixos')
    localStorage.removeItem('avulsos')
    setValoresFixos(Array(12).fill(0))
    setValoresAvulsos(Array(12).fill(0))
    alert('Todos os dados foram apagados.')
    router.push('/')
  }

  return (
    <main className={tema === 'dark' ? 'tema-escuro' : 'tema-claro'}>
      <header className="botao-container">
        <button onClick={() => router.push('/')} className="botao-dashboard">🏠 Dashboard</button>
        <button onClick={alternarTema} className="botao-neon">☾/☼ Tema</button>
        <button onClick={apagarTodos} className="botao-apagar1">🗑️ Apagar Todos</button>
      </header>

      <section className="form-box">
        <h1>Adicionar Valores por Mês</h1>
        <form onSubmit={handleSalvarValores}>
          <div className="input-row">
            <label>
              Mês
              <select value={mes} onChange={(e) => setMes(e.target.value)} required>
                <option value="">Selecione o Mês</option>
                {meses.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="input-row">
            <label>
              Tipo de Gasto
              <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                <option value="">Selecione o Tipo</option>
                <option value="fixo">Fixo</option>
                <option value="avulso">Avulso</option>
              </select>
            </label>
          </div>

          <div className="input-row">
            <label>
              Valor (R$)
              <input
                type="number"
                value={valor}
                onChange={(e) => setValor(Number(e.target.value))}
                placeholder="Ex: 500"
                required
              />
            </label>
          </div>

          <button type="submit" className="botao-neon salvar-btn">
            💾 Salvar Valores
          </button>
        </form>
      </section>

      {/* Tabela de valores já salvos */}
      <section className="tabela-valores">
        <h2>Valores Salvos</h2>
        <table>
          <thead>
            <tr>
              <th>Mês</th>
              <th>Fixo (R$)</th>
              <th>Avulso (R$)</th>
            </tr>
          </thead>
          <tbody>
            {meses.map((m, i) => (
              <tr key={m}>
                <td>{m}</td>
                <td>{valoresFixos[i] || '-'}</td>
                <td>{valoresAvulsos[i] || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}
