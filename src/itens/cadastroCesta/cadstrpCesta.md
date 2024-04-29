Documentação do Componente CadastroCesta

Este componente React é responsável por gerenciar o cadastro de itens de uma cesta básica e calcular quantas cestas podem ser montadas com base nos itens disponíveis e na quantidade desejada de cada item.

Props:

Nenhuma propriedade é passada para este componente.
State:

items: Uma lista de objetos representando os itens cadastrados pelo usuário, contendo os campos name (nome do item) e quantity (quantidade do item).
desiredItems: Uma lista de objetos representando os itens desejados pelo usuário para compor as cestas básicas, contendo os campos name (nome do item) e quantity (quantidade desejada do item).
basketsMade: O número de cestas básicas que podem ser montadas com base nos itens cadastrados e desejados.
showItemsTable: Um booleano indicando se a tabela de cadastro de itens deve ser exibida ou não.
showDesiredItemsTable: Um booleano indicando se a tabela de itens desejados deve ser exibida ou não.
itemNameFirst: O nome do item sendo cadastrado na primeira tabela.
itemQuantityFirst: A quantidade do item sendo cadastrado na primeira tabela.
itemNameSecond: O nome do item sendo cadastrado na segunda tabela.
itemQuantitySecond: A quantidade do item sendo cadastrado na segunda tabela.
Métodos:

handleAddItem(name, quantity, list, setList): Adiciona um novo item à lista especificada (list) com o nome e a quantidade fornecidos. Se o item já existir na lista, sua quantidade será atualizada.
handleCreateCestas(): Calcula o número de cestas básicas que podem ser montadas com base nos itens cadastrados e desejados. O resultado é armazenado no estado basketsMade.
handleFile(event, setList): Lê um arquivo CSV contendo itens e suas quantidades, e atualiza a lista especificada (setList) com os itens do arquivo.
handleRemove(index, list, setList): Remove o item na posição index da lista especificada (list) e atualiza o estado com a nova lista (setList).
handleClearCalculation(): Limpa o cálculo de cestas básicas, resetando o número de cestas para zero.
Fluxo de Funcionamento:

O usuário pode cadastrar itens em duas tabelas diferentes: uma para os itens cadastrados e outra para os itens desejados.
Os itens podem ser adicionados manualmente através dos campos de entrada ou importados de um arquivo CSV.
O usuário pode remover itens das listas clicando no botão "Remover".
Ao clicar no botão "Calcular Cestas", o componente calcula quantas cestas básicas podem ser montadas com base nos itens cadastrados e desejados.
O resultado do cálculo é exibido na seção "Relatório Final".
O usuário pode limpar o cálculo clicando no botão "Limpar Cálculo".