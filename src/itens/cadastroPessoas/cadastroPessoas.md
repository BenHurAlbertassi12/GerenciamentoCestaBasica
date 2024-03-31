# Documentação do Componente CadastroPessoas

O componente `CadastroPessoas` é responsável por permitir o cadastro e visualização de pessoas, armazenando as informações em um array e também permitindo a importação e exportação desses dados em formato CSV.

### Props

O componente não recebe nenhuma propriedade.

### Estado

1. **casado**: Booleano que indica se a pessoa cadastrada é casada ou não.
2. **pessoasCadastradas**: Array que armazena as informações das pessoas cadastradas.
3. **nomeValido**: Booleano que indica se o nome digitado é válido.
4. **telefoneValido**: Booleano que indica se o telefone digitado é válido.

### Funções

1. **handleFileUpload**: Função que trata o upload de um arquivo CSV contendo informações das pessoas a serem cadastradas.
2. **handleSubmit**: Função que trata o envio do formulário de cadastro, validando os campos e adicionando a pessoa ao array `pessoasCadastradas`.
3. **handleRemove**: Função que remove uma pessoa cadastrada da lista, com base no índice.
4. **downloadCSV**: Função que gera um arquivo CSV contendo as informações das pessoas cadastradas e permite o download do mesmo.

### Hooks

1. **useEffect**: Hook utilizado para carregar os dados das pessoas cadastradas do armazenamento local ao montar o componente, e também para atualizar o armazenamento local sempre que houver uma mudança na lista de pessoas cadastradas.

### Fluxo de Funcionamento

1. O usuário pode importar um arquivo CSV clicando no botão de upload. O conteúdo do arquivo é lido e as informações são adicionadas à lista de pessoas cadastradas.
2. O usuário pode preencher o formulário de cadastro manualmente, fornecendo nome, idade, quantidade de filhos, telefone e, se casado, o nome do cônjuge.
3. Os campos de nome e telefone são validados, exibindo mensagens de erro caso não estejam no formato correto.
4. Ao cadastrar uma pessoa, os dados são adicionados à lista de pessoas cadastradas.
5. O usuário pode remover uma pessoa cadastrada clicando no botão "Remover".
6. O usuário pode baixar um arquivo CSV contendo as informações das pessoas cadastradas clicando no botão "Baixar CSV".

### Componentes Filhos

O componente não possui componentes filhos.

### Exemplo de Uso

```jsx
import React from 'react';
import CadastroPessoas from './components/CadastroPessoas';

function App() {
  return (
    <div className="App">
      <CadastroPessoas />
    </div>
  );
}

export default App;
```

### Estilos

O componente utiliza classes CSS para estilização, como por exemplo, "cad_pessoas", "invalido", entre outras. Estas classes devem ser definidas no arquivo CSS global ou no componente que utiliza o `CadastroPessoas`.
