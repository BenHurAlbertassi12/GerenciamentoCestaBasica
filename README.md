### Gerenciamento de Cesta Básica

Este projeto é uma aplicação desenvolvida em React.js para gerenciar as pessoas beneficiárias e os itens necessários para compor cestas básicas. Com este aplicativo, os usuários podem cadastrar beneficiários, registrar informações como nome, idade, quantidade de filhos, telefone e estado civil, além de gerenciar os itens necessários para compor as cestas básicas, como alimentos e produtos de higiene.

### Funcionalidades Principais

- **Cadastro de Pessoas Beneficiárias:** Permite o registro de informações detalhadas sobre os beneficiários, como nome completo, idade, quantidade de filhos, telefone e estado civil. Os usuários também têm a opção de importar dados de um arquivo CSV e visualizar uma lista das pessoas cadastradas.

- **Cadastro de Itens da Cesta Básica:** Possibilita adicionar e gerenciar os itens necessários para compor as cestas básicas, como alimentos não perecíveis, produtos de limpeza e higiene pessoal. Os usuários podem especificar o nome e a quantidade de cada item, além de importar dados de um arquivo CSV.

- **Geração de Relatório:** Calcula automaticamente a quantidade de cestas básicas que podem ser montadas com base nos itens disponíveis e nas quantidades desejadas. Isso permite uma gestão eficiente dos recursos e facilita o planejamento da distribuição.

### Como Utilizar

1. **Instalação:**
   - Clone este repositório em sua máquina local usando o comando:
     ```
     git clone https://github.com/seu-usuario/gerenciamento-cesta-basica.git
     ```

2. **Instalar Dependências:**
   - Navegue até o diretório do projeto e instale as dependências usando npm ou yarn:
     ```
     cd gerenciamento-cesta-basica
     npm install
     ```

3. **Executar o Aplicativo:**
   - Após a instalação das dependências, execute o comando:
     ```
     npm start
     ```
   - O aplicativo será executado no modo de desenvolvimento e abrirá automaticamente uma nova aba do navegador padrão com o endereço `http://localhost:3000`.

4. **Uso da Aplicação:**
   - Uma vez que o aplicativo esteja em execução, você poderá alternar entre os cadastros de beneficiários e itens da cesta básica clicando nos botões correspondentes na interface.
   - Utilize os formulários para adicionar novas informações de beneficiários e itens da cesta básica.
   - Importe dados de arquivos CSV para facilitar o processo de cadastro.
   - Visualize e gerencie os dados cadastrados por meio das tabelas disponíveis na aplicação.

### Tecnologias Utilizadas

- React.js
- JavaScript (ES6+)
- HTML5
- CSS3