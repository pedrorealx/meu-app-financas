'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import './valores.css'


export default function Valores() {
  const router = useRouter()
  const [fixo, setFixo] = useState<number>(0)
  const [avulso, setAvulso] = useState<number>(0)
  const [fixos, setFixos] = useState<number[]>([])
  const [avulsos, setAvulsos] = useState<number[]>([])
  const [tema, setTema] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const temaSalvo = localStorage.getItem('tema') as 'light' | 'dark' | null
    if (temaSalvo) setTema(temaSalvo)

    const fixosSalvos = localStorage.getItem('fixos')
    const avulsosSalvos = localStorage.getItem('avulsos')
    if (fixosSalvos) setFixos(JSON.parse(fixosSalvos))
    if (avulsosSalvos) setAvulsos(JSON.parse(avulsosSalvos))
  }, [])

  const salvarValores = () => {
    if (fixo > 0) {
      const novosFixos = [...fixos, fixo]
      setFixos(novosFixos)
      localStorage.setItem('fixos', JSON.stringify(novosFixos))
    }

    if (avulso > 0) {
      const novosAvulsos = [...avulsos, avulso]
      setAvulsos(novosAvulsos)
      localStorage.setItem('avulsos', JSON.stringify(novosAvulsos))
    }

    setFixo(0)
    setAvulso(0)
    router.push('/')
  }

  const alternarTema = () => {
    const novoTema = tema === 'light' ? 'dark' : 'light'
    setTema(novoTema)
    localStorage.setItem('tema', novoTema)
  }

  const apagarFixos = () => {
    setFixos([])
    localStorage.removeItem('fixos')
  }

  const apagarAvulsos = () => {
    setAvulsos([])
    localStorage.removeItem('avulsos')
  }

  const apagarTodos = () => {
    apagarFixos()
    apagarAvulsos()
  }

  return (
    <main className={tema === 'dark' ? 'tema-escuro' : 'tema-claro'}>
      <header className="botao-container">
         <button onClick={() => router.push('/')} className="botao-dashboard">🏠 Dashboard</button>
        <button onClick={alternarTema} className="botao-neon">☾/☼ Tema</button>
       
        <button onClick={apagarFixos} className="botao-apagar1">🗑️ Apagar Fixos</button>
        <button onClick={apagarAvulsos} className="botao-apagar1">🗑️ Apagar Avulsos</button>
        <button onClick={apagarTodos} className="botao-apagar1">🗑️ Apagar Todos</button>
      </header>

      <section className="form-box">
        <h1>Adicionar Valores</h1>

        <div className="input-row">
          <label>
            Valor Fixo (R$)
            <input
              type="number"
              value={fixo}
              onChange={(e) => setFixo(Number(e.target.value))}
              placeholder="Ex: 500"
            />
          </label>

          <label>
            Valor Avulso (R$)
            <input
              type="number"
              value={avulso}
              onChange={(e) => setAvulso(Number(e.target.value))}
              placeholder="Ex: 200"
            />
          </label>
        </div>

        <button onClick={salvarValores} className="botao-neon salvar-btn">
          💾 Salvar Valores
        </button>
      </section>

      <section className="valores-lista">
        <h2>Valores Fixos</h2>
        <ul>
          {fixos.map((v, i) => <li key={i}>R$ {v}</li>)}
        </ul>

        <h2>Valores Avulsos</h2>
        <ul>
          {avulsos.map((v, i) => <li key={i}>R$ {v}</li>)}
        </ul>
      </section>
    </main>
  )
}
