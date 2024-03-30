import React, { useState } from 'react';
import '../../App.css';

function CadastroPessoas() {
  const [casado, setCasado] = useState(false);
  const [pessoasCadastradas, setPessoasCadastradas] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const csv = e.target.result;
      const lines = csv.split('\n');
      const newPeople = lines.map((line) => {
        const [nome, idade, filhos, telefone, nomeConjuge] = line.split(',');
        return { nome, idade, filhos, telefone, nomeConjuge };
      });
      setPessoasCadastradas([...pessoasCadastradas, ...newPeople]);
    };

    reader.readAsText(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nome = event.target.nome.value;
    const idade = event.target.idade.value;
    const filhos = event.target.filhos.value;
    const telefone = event.target.telefone.value;
    const nomeConjuge = casado ? event.target.nomeConjuge.value : '';

    const pessoa = { nome, idade, filhos, telefone, nomeConjuge };
    setPessoasCadastradas([...pessoasCadastradas, pessoa]);
    event.target.reset();
  };

  const handleRemove = (index) => {
    const updatedList = pessoasCadastradas.filter((_, i) => i !== index);
    setPessoasCadastradas(updatedList);
  };

  const downloadCSV = () => {
    const csvHeader = 'nome,idade,filhos,telefone,nomeConjuge';
    const csvRows = pessoasCadastradas.map((pessoa) =>
      Object.values(pessoa).join(',')
    );
    const csvContent = csvHeader + '\n' + csvRows.join('\n');
    const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'pessoas_cadastradas.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <input
        type='file'
        id='uploadFile'
        onChange={handleFileUpload}
        accept='.csv'
        name='uploadFile'
      />

      <form id='formPessoa' onSubmit={handleSubmit}>
        <div className='cad_pessoas'>
          <label htmlFor='nome'>Nome completo:</label>
          <input
            type='text'
            id='nome'
            name='nome'
            placeholder='Digite o nome completo'
            required
          />

          <label htmlFor='idade'>Idade:</label>
          <input
            type='number'
            id='idade'
            name='idade'
            placeholder='Digite a idade'
            required
          />
          <br />
          <label htmlFor='filhos'>Quantidade de filhos:</label>
          <input
            type='number'
            id='filhos'
            name='filhos'
            placeholder='Digite a quantidade'
            required
          />

          <label htmlFor='telefone'>Telefone:</label>
          <input
            type='tel'
            id='telefone'
            name='telefone'
            placeholder='Digite o telefone'
            required
          />
          <br />
          <div>
            <label htmlFor='casado'>Casado(a):</label>
            <input
              type='checkbox'
              id='casado'
              name='casado'
              onChange={(e) => setCasado(e.target.checked)}
            />
          </div>

          <label htmlFor='nomeConjuge'>Nome do cônjuge:</label>
          <input
            type='text'
            id='nomeConjuge'
            name='nomeConjuge'
            placeholder='Digite o nome do cônjuge'
            disabled={!casado}
          />
          <br />
          <button type='submit'>Cadastrar Pessoa</button>
        </div>
      </form>

      <div>
        <h2>Pessoas Cadastradas</h2>
        <button onClick={downloadCSV}>Baixar CSV</button>

        <table className='mid_table'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Idade</th>
              <th>Filhos</th>
              <th>Telefone</th>
              <th>Cônjuge</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pessoasCadastradas.map((pessoa, index) => (
              <tr key={index}>
                <td>{pessoa.nome}</td>
                <td>{pessoa.idade}</td>
                <td>{pessoa.filhos}</td>
                <td>{pessoa.telefone}</td>
                <td>{pessoa.nomeConjuge}</td>
                <td>
                  <button onClick={() => handleRemove(index)}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CadastroPessoas;
