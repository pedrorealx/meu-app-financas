'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import '../globals.css'  // ✅ import corrigido, sobe um nível para encontrar o arquivo

export default function Valores() {
  const router = useRouter()
  const [fixo, setFixo] = useState<number>(0)
  const [avulso, setAvulso] = useState<number>(0)
  const [fixos, setFixos] = useState<number[]>([])
  const [avulsos, setAvulsos] = useState<number[]>([])
  const [tema, setTema] = useState<'light' | 'dark'>('light')

  // Carregar tema e valores do localStorage ao iniciar
  useEffect(() => {
    const temaSalvo = localStorage.getItem('tema') as 'light' | 'dark' | null
    if (temaSalvo) setTema(temaSalvo)

    const fixosSalvos = localStorage.getItem('fixos')
    const avulsosSalvos = localStorage.getItem('avulsos')
    if (fixosSalvos) setFixos(JSON.parse(fixosSalvos))
    if (avulsosSalvos) setAvulsos(JSON.parse(avulsosSalvos))
  }, [])

  const salvarValores = () => {
    // Adiciona valores fixos
    if (fixo > 0) {
      const novosFixos = [...fixos, fixo]
      setFixos(novosFixos)
      localStorage.setItem('fixos', JSON.stringify(novosFixos))
    }

    // Adiciona valores avulsos
    if (avulso > 0) {
      const novosAvulsos = [...avulsos, avulso]
      setAvulsos(novosAvulsos)
      localStorage.setItem('avulsos', JSON.stringify(novosAvulsos))
    }

    setFixo(0)
    setAvulso(0)
    router.push('/') // Voltar para página inicial
  }

  const alternarTema = () => {
    const novoTema = tema === 'light' ? 'dark' : 'light'
    setTema(novoTema)
    localStorage.setItem('tema', novoTema)
  }

  // Funções para apagar valores
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
    <main
      className={tema === 'dark' ? 'tema-escuro' : 'tema-claro'}
      style={{ transition: 'background-color 0.4s ease, color 0.4s ease', minHeight: '100vh', padding: '1rem' }}
    >
      {/* Botões */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button onClick={alternarTema} className="botao-neon">☾/☼</button>
        <button onClick={() => router.push('/')} className="">🏠 Voltar ao Dashboard</button>
        <button onClick={apagarFixos} className="botao-apagar1">🗑️ Apagar Fixos</button>
        <button onClick={apagarAvulsos} className="botao-apagar1">🗑️ Apagar Avulsos</button>
        <button onClick={apagarTodos} className="botao-apagar1">🗑️ Apagar Todos</button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Adicionar Valores</h1>

      <div className="form-box">
        <label>
          Valor Fixo (R$):
          <input
            type="number"
            value={fixo}
            onChange={(e) => setFixo(Number(e.target.value))}
          />
        </label>

        <label>
          Valor Avulso (R$):
          <input
            type="number"
            value={avulso}
            onChange={(e) => setAvulso(Number(e.target.value))}
          />
        </label>

        <button onClick={salvarValores} className="">
          Salvar
        </button>
      </div>

      {/* Mostra lista de valores adicionados */}
      <div className="mt-6">
        <h2 className="">Valores Fixos:</h2>
        <ul>
          {fixos.map((v, i) => <li key={i}>R$ {v}</li>)}
        </ul>

        <h2 className="">Valores Avulsos:</h2>
        <ul>
          {avulsos.map((v, i) => <li key={i}>R$ {v}</li>)}
        </ul>
      </div>
    </main>
  )
}
