'use client'

import { useState } from 'react'
import './config.css'


export default function Config() {
  const [tema, setTema] = useState<'light' | 'dark'>('light')

  const alternarTema = () => {
    const novoTema = tema === 'light' ? 'dark' : 'light'
    setTema(novoTema)
    localStorage.setItem('tema', novoTema)
  }

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
      alert('Senha incorreta.')
    }
  }

  const resetar = () => {
    if (confirm("Tem certeza que deseja resetar todos os dados?")) {
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <main className={tema === 'dark' ? 'tema-escuro' : 'tema-claro'}>
      <h1 className="text-2xl font-bold mb-4">⚙ Configurações</h1>

      <div className="botoes-container">
        <button onClick={alternarTema} className="botao-padrao">
          {tema === 'dark' ? '☼ Modo Claro' : '☾ Modo Escuro'}
        </button>
        <button onClick={alterarSenha} className="botao-padrao">🔑 Alterar Senha</button>
        <button onClick={resetar} className="botao-apagar1">🗑 Resetar App</button>
      </div>
    </main>
  )
}
