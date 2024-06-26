import React, { useState } from 'react';
import './App.css';
import CadastroPessoas from './itens/cadastroPessoas/cadastroPessoas';
import CadastroCesta from './itens/cadastroCesta/cadastroCesta';

function App() {
  // Define o estado para controlar a visibilidade dos componentes
  const [mostrarBeneficiarios, setMostrarBeneficiarios] = useState(false);
  const [mostrarCadastroItens, setMostrarCadastroItens] = useState(false);

  // Função para alternar a visibilidade do cadastro de beneficiários
  const alternarVisibilidadeBeneficiarios = () => {
    setMostrarBeneficiarios(!mostrarBeneficiarios);
  };

  // Função para alternar a visibilidade do cadastro de itens
  const alternarVisibilidadeCadastroItens = () => {
    setMostrarCadastroItens(!mostrarCadastroItens);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='h1'>Gerenciamento Cesta Básica</h1>
      </header>
      <p className='pe'>Este aplicativo permite que você gerencie os itens da sua cesta básica e cadastre as pessoas que receberão as cestas.</p>
      <section>
        
        <button onClick={alternarVisibilidadeBeneficiarios}>
          {mostrarBeneficiarios ? 'Cadastro Beneficiários' : 'Cadastro Beneficiários'}
        </button>

        {mostrarBeneficiarios && <CadastroPessoas />}


        <button onClick={alternarVisibilidadeCadastroItens}>
          {mostrarCadastroItens ? 'Cadastro Itens' : 'Cadastro Itens'}
        </button>

        {mostrarCadastroItens && <CadastroCesta />}
      </section>
    </div>
  );
}

export default App;
