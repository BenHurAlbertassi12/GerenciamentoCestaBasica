// Função para adicionar itens à lista
function adicionarItem() {
    var item = document.getElementById('item').value;
    var quantidade = document.getElementById('quantidade').value;
    var listaItens = document.getElementById('itens');
    var listItem = document.createElement('li');
    listItem.textContent = item + ' - ' + quantidade + 'kg';
    listaItens.appendChild(listItem);

    document.getElementById('item').value = '';
    document.getElementById('quantidade').value = '';
}

document.getElementById('formPessoa').addEventListener('submit', function (event) {
    event.preventDefault();
    var nome = document.getElementById('nome').value;
    var idade = document.getElementById('idade').value;
    var filhos = document.getElementById('filhos').value;
    var telefone = document.getElementById('telefone').value;
    var casado = document.getElementById('casado').checked;
    var nomeConjuge = document.getElementById('nomeConjuge').value;

    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('filhos').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('casado').checked = false;
    document.getElementById('nomeConjuge').value = '';
    alert('Pessoa cadastrada com sucesso!');
});
