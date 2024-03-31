import React, { useEffect, useState } from 'react';
import '../../App.css';

function CadastroPessoas() {
  const [casado, setCasado] = useState(false);
  const [pessoasCadastradas, setPessoasCadastradas] = useState([]);
  const [nomeValido, setNomeValido] = useState(true);
  const [telefoneValido, setTelefoneValido] = useState(true);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const csv = e.target.result;
      const lines = csv.split('\n').slice(1); // Ignora a primeira linha (cabeçalho)
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
    const nome = event.target.nome.value.trim(); // Remove espaços em branco antes e depois
    const telefone = event.target.telefone.value.replace(/\D/g, ''); // Remove não dígitos
    if (!nome.match(/^[A-Za-z\s]+$/)) {
      setNomeValido(false);
      return;
    } else {
      setNomeValido(true);
    }
    if (telefone.length !== 11) {
      setTelefoneValido(false);
      return;
    } else {
      setTelefoneValido(true);
    }

    const idade = event.target.idade.value;
    const filhos = event.target.filhos.value;
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
    const csvRows = pessoasCadastradas.map((pessoa) =>
      Object.values(pessoa).join(',')
    );
    const csvContent = csvRows.join('\n');
    const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'pessoas_cadastradas.csv');
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    const savedData = localStorage.getItem('pessoasCadastradas');
    if (savedData) {
      setPessoasCadastradas(JSON.parse(savedData));
    }
  }, []);

    useEffect(() => {
      localStorage.setItem(
        'pessoasCadastradas',
        JSON.stringify(pessoasCadastradas)
      );
    }, [pessoasCadastradas]);

  return (
    <div>
      <div className='distancia'>
        <input
          type='file'
          id='uploadFile'
          onChange={handleFileUpload}
          accept='.csv'
          name='uploadFile'
          tite
        />
      </div>

      <form id='formPessoa' onSubmit={handleSubmit}>
        <div className='cad_pessoas'>
          <label htmlFor='nome'>Nome completo:</label>
          <input
            type='text'
            id='nome'
            name='nome'
            pattern='[A-Za-z\s]+'
            title='O nome deve conter apenas letras'
            placeholder='Digite o nome completo'
            required
            className={!nomeValido ? 'invalido' : ''}
          />
          {!nomeValido && (
            <p className='erro'>O nome deve conter apenas letras.</p>
          )}

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
            onChange={(e) => {
              const telefone = e.target.value.replace(/\D/g, '');
              if (telefone.length !== 11) {
                setTelefoneValido(false);
              } else {
                setTelefoneValido(true);
              }
            }}
            className={!telefoneValido ? 'invalido' : ''}
          />
          {!telefoneValido && (
            <p className='erro'>
              O telefone deve conter exatamente 11 dígitos.
            </p>
          )}
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
