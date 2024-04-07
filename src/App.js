import React from 'react';
import './App.css';
// import CadastroPessoas from './itens/cadastroPessoas/cadastroPessoas';
import CadastroCesta from './itens/cadastroCesta/cadastroCesta';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='h1'>Gerenciamento Cesta Básica</h1>
      </header>
      <p className='pe'>Este aplicativo permite que você gerencie os itens da sua cesta básica e cadastre as pessoas que receberão as cestas.</p>
      <section>
      
          <h3>Cadastro Beneficiários</h3>
          {/* <CadastroPessoas /> */}
        

      
        <h3>Cadastro Itens</h3>
        <CadastroCesta />
          <p>Resultado Cesta Básica</p>
        
      
          <h3>Itens Cesta Básica</h3>
        
      </section>
    </div>
  );
}

export default App;
