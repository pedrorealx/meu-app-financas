'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import './valores.css'

const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

export default function Valores() {
  const [mes, setMes] = useState('')
  const [tipo, setTipo] = useState('')
  const [valor, setValor] = useState(0)
  const [motivo, setMotivo] = useState('')
  const [tema, setTema] = useState<'light' | 'dark'>('light')

  const [valoresFixos, setValoresFixos] = useState<number[]>(Array(12).fill(0))
  const [valoresAvulsos, setValoresAvulsos] = useState<number[]>(Array(12).fill(0))
  const [motivosFixos, setMotivosFixos] = useState<string[]>(Array(12).fill(''))
  const [motivosAvulsos, setMotivosAvulsos] = useState<string[]>(Array(12).fill(''))

  const inicializarSenha = () => {
    const senhaSalva = localStorage.getItem('senhaExcluir')
    if (!senhaSalva) {
      localStorage.setItem('senhaExcluir', '1234')
    }
  }

  useEffect(() => {
    inicializarSenha()

    const temaSalvo = localStorage.getItem('tema') as 'light' | 'dark' | null
    if (temaSalvo) setTema(temaSalvo)

    const fixos = JSON.parse(localStorage.getItem('fixos') || '[]')
    const avulsos = JSON.parse(localStorage.getItem('avulsos') || '[]')
    const motivosFixosSalvos = JSON.parse(localStorage.getItem('motivosFixos') || '[]')
    const motivosAvulsosSalvos = JSON.parse(localStorage.getItem('motivosAvulsos') || '[]')

    setValoresFixos(fixos.length ? fixos : Array(12).fill(0))
    setValoresAvulsos(avulsos.length ? avulsos : Array(12).fill(0))
    setMotivosFixos(motivosFixosSalvos.length ? motivosFixosSalvos : Array(12).fill(''))
    setMotivosAvulsos(motivosAvulsosSalvos.length ? motivosAvulsosSalvos : Array(12).fill(''))
  }, [])

  useEffect(() => {
    if (mes && tipo) {
      const indexMes = meses.indexOf(mes)
      if (indexMes !== -1) {
        if (tipo === 'fixo') {
          setValor(valoresFixos[indexMes] || 0)
          setMotivo(motivosFixos[indexMes] || '')
        } else {
          setValor(valoresAvulsos[indexMes] || 0)
          setMotivo(motivosAvulsos[indexMes] || '')
        }
      }
    }
  }, [mes, tipo, valoresFixos, valoresAvulsos, motivosFixos, motivosAvulsos])

  const handleSalvar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!mes || !tipo || valor <= 0 || !motivo) {
      alert('Preencha todos os campos corretamente.')
      return
    }

    const indexMes = meses.indexOf(mes)
    if (indexMes === -1) return

    if (tipo === 'fixo') {
      const novosFixos = [...valoresFixos]
      const novosMotivos = [...motivosFixos]
      novosFixos[indexMes] = valor
      novosMotivos[indexMes] = motivo
      setValoresFixos(novosFixos)
      setMotivosFixos(novosMotivos)

      localStorage.setItem('fixos', JSON.stringify(novosFixos))
      localStorage.setItem('motivosFixos', JSON.stringify(novosMotivos))
    } else {
      const novosAvulsos = [...valoresAvulsos]
      const novosMotivos = [...motivosAvulsos]
      novosAvulsos[indexMes] = valor
      novosMotivos[indexMes] = motivo
      setValoresAvulsos(novosAvulsos)
      setMotivosAvulsos(novosMotivos)

      localStorage.setItem('avulsos', JSON.stringify(novosAvulsos))
      localStorage.setItem('motivosAvulsos', JSON.stringify(novosMotivos))
    }

    alert(`Valor salvo para ${mes} (${tipo})`)
  }

  const handleEditar = () => {
    if (!mes || !tipo) {
      alert('Selecione mês e tipo.')
      return
    }

    const indexMes = meses.indexOf(mes)
    if (indexMes === -1) return

    if (tipo === 'fixo') {
      setValor(valoresFixos[indexMes] || 0)
      setMotivo(motivosFixos[indexMes] || '')
    } else {
      setValor(valoresAvulsos[indexMes] || 0)
      setMotivo(motivosAvulsos[indexMes] || '')
    }

    alert('Modo edição habilitado.')
  }

  const apagarTodos = () => {
    const senhaDigitada = prompt('Digite a senha:')
    const senhaCorreta = localStorage.getItem('senhaExcluir')

    if (senhaDigitada === senhaCorreta) {
      localStorage.clear()
      alert('Dados apagados.')
      window.location.href = '/'
    } else {
      alert('Senha incorreta.')
    }
  }

  const alterarSenha = () => {
    const senhaAtual = prompt('Senha atual:')
    const senhaCorreta = localStorage.getItem('senhaExcluir')

    if (senhaAtual === senhaCorreta) {
      const novaSenha = prompt('Nova senha:')
      if (novaSenha) {
        localStorage.setItem('senhaExcluir', novaSenha)
        alert('Senha alterada.')
      }
    } else {
      alert('Senha incorreta.')
    }
  }

  return (
    <main className={tema === 'dark' ? 'tema-escuro' : 'tema-claro'}>
      <header className="botao-container">
        <Link href="/" className="botao-dashboard">🏠 Dashboard</Link>
        <button onClick={apagarTodos} className="botao-apagar1">🗑️ Apagar Todos</button>
      </header>

      <section className="form-box">
        <h1>Gerenciar Valores</h1>

        <form onSubmit={handleSalvar}>
          <label>
            Mês
            <select value={mes} onChange={e => setMes(e.target.value)}>
              <option value="">Selecione</option>
              {meses.map(m => <option key={m}>{m}</option>)}
            </select>
          </label>

          <label>
            Tipo
            <select value={tipo} onChange={e => setTipo(e.target.value)}>
              <option value="">Selecione</option>
              <option value="fixo">Fixo</option>
              <option value="avulso">Avulso</option>
            </select>
          </label>

          <label>
            Valor
            <input type="number" value={valor} onChange={e => setValor(+e.target.value)} />
          </label>

          <label>
            Motivo
            <input value={motivo} onChange={e => setMotivo(e.target.value)} />
          </label>

          <div className="botoes-acao">
            <button className="salvar-btn" type="submit">💾 Salvar</button>
            <button className="salvar-btn" type="button" onClick={handleEditar}>✏️ Editar</button>
          </div>
        </form>
      </section>

      <section className="tabela-valores">
        <h2>Valores Salvos</h2>
        <table>
          <thead>
            <tr>
              <th>Mês</th>
              <th>Fixo</th>
              <th>Motivo</th>
              <th>Avulso</th>
              <th>Motivo</th>
            </tr>
          </thead>
          <tbody>
            {meses.map((m, i) => (
              <tr key={m}>
                <td>{m}</td>
                <td>{valoresFixos[i] || '-'}</td>
                <td>{motivosFixos[i] || '-'}</td>
                <td>{valoresAvulsos[i] || '-'}</td>
                <td>{motivosAvulsos[i] || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}
