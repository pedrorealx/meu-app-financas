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
  const [motivo, setMotivo] = useState('')
  const [tema, setTema] = useState<'light' | 'dark'>('light')

  const [valoresFixos, setValoresFixos] = useState<number[]>(Array(12).fill(0))
  const [valoresAvulsos, setValoresAvulsos] = useState<number[]>(Array(12).fill(0))
  const [motivosFixos, setMotivosFixos] = useState<string[]>(Array(12).fill(''))
  const [motivosAvulsos, setMotivosAvulsos] = useState<string[]>(Array(12).fill(''))

  // Inicializa senha padrão caso não exista
  const inicializarSenha = () => {
    const senhaSalva = localStorage.getItem('senhaExcluir')
    if (!senhaSalva) {
      localStorage.setItem('senhaExcluir', '1234') // senha padrão inicial
    }
  }

  useEffect(() => {
    inicializarSenha()

    const temaSalvo = localStorage.getItem('tema') as 'light' | 'dark' | null
    if (temaSalvo) setTema(temaSalvo)

    // Carregar valores salvos
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
        } else if (tipo === 'avulso') {
          setValor(valoresAvulsos[indexMes] || 0)
          setMotivo(motivosAvulsos[indexMes] || '')
        }
      }
    }
  }, [mes, tipo, valoresFixos, valoresAvulsos, motivosFixos, motivosAvulsos])

  const handleSalvar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!mes || !tipo || valor <= 0 || !motivo) {
      alert('Por favor, preencha todos os campos corretamente.')
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

    alert(`Valor salvo para ${mes} (${tipo}) com motivo: ${motivo}`)
  }

  const handleEditar = () => {
    if (!mes || !tipo) {
      alert('Selecione mês e tipo para editar.')
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

    alert(`Modo de edição ativado para ${mes} (${tipo}). Agora altere os campos e clique em Salvar.`)
  }

  const alternarTema = () => {
    const novoTema = tema === 'light' ? 'dark' : 'light'
    setTema(novoTema)
    localStorage.setItem('tema', novoTema)
  }

  // Apagar todos os dados com senha
  const apagarTodos = () => {
    const senhaDigitada = prompt('Digite a senha para apagar todos os dados:')
    const senhaCorreta = localStorage.getItem('senhaExcluir')

    if (senhaDigitada === senhaCorreta) {
      localStorage.removeItem('fixos')
      localStorage.removeItem('avulsos')
      localStorage.removeItem('motivosFixos')
      localStorage.removeItem('motivosAvulsos')
      setValoresFixos(Array(12).fill(0))
      setValoresAvulsos(Array(12).fill(0))
      setMotivosFixos(Array(12).fill(''))
      setMotivosAvulsos(Array(12).fill(''))
      alert('Todos os dados foram apagados.')
      router.push('/')
    } else if (senhaDigitada !== null) {
      alert('Senha incorreta. A exclusão foi cancelada.')
    }
  }

  // Alterar senha
  const alterarSenha = () => {
    const senhaAtual = prompt('Digite a senha atual:')
    const senhaCorreta = localStorage.getItem('senhaExcluir')

    if (senhaAtual === senhaCorreta) {
      const novaSenha = prompt('Digite a nova senha:')
      if (novaSenha) {
        localStorage.setItem('senhaExcluir', novaSenha)
        alert('Senha alterada com sucesso!')
      }
    } else {
      alert('Senha atual incorreta.')
    }
  }

  return (
    <main className={tema === 'dark' ? 'tema-escuro' : 'tema-claro'}>
      <header className="botao-container">
        <button onClick={() => router.push('/')} className="botao-dashboard">🏠 Dashboard</button>
        
        <button onClick={apagarTodos} className="botao-apagar1">🗑️ Apagar Todos</button>
        
      </header>

      <section className="form-box">
        <h1>Gerenciar Valores</h1>
        <form onSubmit={handleSalvar}>
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

          <div className="input-row">
            <label>
              Motivo
              <input
                type="text"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Ex: Internet, Luz, Uber..."
                required
              />
            </label>
          </div>

          <div className="botoes-acao">
            <button type="submit" className="salvar-btn">💾 Salvar</button>
            <button type="button" onClick={handleEditar} className="salvar-btn">✏️ Editar</button>
            
          </div>
        </form>
      </section>

      <section className="tabela-valores">
        <h2>Valores Salvos</h2>
        <table>
          <thead>
            <tr>
              <th>Mês</th>
              <th>Fixo (R$)</th>
              <th>Motivo Fixo</th>
              <th>Avulso (R$)</th>
              <th>Motivo Avulso</th>
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
