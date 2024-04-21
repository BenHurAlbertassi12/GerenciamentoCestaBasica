import React, { useState } from 'react';
import '../../App.css';

function CadastroCesta() {
  const [items, setItems] = useState([]);
  const [desiredItems, setDesiredItems] = useState([]);
  const [basketsMade, setBasketsMade] = useState(0);
  const [remainingItems, setRemainingItems] = useState([]);

  // Estados para os inputs do primeiro conjunto
  const [itemNameFirst, setItemNameFirst] = useState('');
  const [itemQuantityFirst, setItemQuantityFirst] = useState('');
  const [itemWeightFirst, setItemWeightFirst] = useState('');

  // Estados para os inputs do segundo conjunto
  const [itemNameSecond, setItemNameSecond] = useState('');
  const [itemQuantitySecond, setItemQuantitySecond] = useState('');
  const [itemWeightSecond, setItemWeightSecond] = useState('');

  const handleAddItemFirst = () => {
    const newItem = {
      name: itemNameFirst,
      quantity: itemQuantityFirst,
      weight: itemWeightFirst,
    };
    setItems([...items, newItem]);
    setItemNameFirst('');
    setItemQuantityFirst('');
    setItemWeightFirst('');
  };

  const handleAddItemSecond = () => {
    const newItem = {
      name: itemNameSecond,
      quantity: itemQuantitySecond,
      weight: itemWeightSecond,
    };
    setDesiredItems([...desiredItems, newItem]);
    setItemNameSecond('');
    setItemQuantitySecond('');
    setItemWeightSecond('');
  };

  const handleCreateCestas = () => {
    // Calcula a quantidade de cestas possíveis
    let totalCestas = Infinity;
    desiredItems.forEach((item) => {
      const itemInList = items.find((listItem) => listItem.name === item.name);
      if (itemInList) {
        totalCestas = Math.min(
          totalCestas,
          Math.floor(itemInList.quantity / item.quantity)
        );
      }
    });
    setBasketsMade(totalCestas);

    // Calcula a quantidade de itens restantes
    const remaining = [];
    items.forEach((item) => {
      const desiredItem = desiredItems.find(
        (desired) => desired.name === item.name
      );
      if (desiredItem) {
        const remainingQuantity =
          item.quantity - desiredItem.quantity * totalCestas;
        if (remainingQuantity > 0) {
          remaining.push({ ...item, remainingQuantity });
        }
      }
    });
    setRemainingItems(remaining);
  };

  const downloadCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      items.map((e) => Object.values(e).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'items.csv');
    document.body.appendChild(link);
    link.click();
  };

  const handleFileNovosItens = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n').slice(1);
      const newItems = lines.map((line) => {
        const [name, quantity, weight] = line.split(',');
        return { name, quantity, weight };
      });
      setItems(newItems);
    };
    reader.readAsText(file);
  };

  const handleFileCesta = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n').slice(1);
      const newItems = lines.map((line) => {
        const [name, quantity, weight] = line.split(',');
        return { name, quantity, weight };
      });
      setDesiredItems(newItems);
    };
    reader.readAsText(file);
    };
    
      const handleRemove = (index, listType) => {
        if (listType === 'items') {
          const updatedItems = [...items];
          updatedItems.splice(index, 1);
          setItems(updatedItems);
        } else if (listType === 'desiredItems') {
          const updatedDesiredItems = [...desiredItems];
          updatedDesiredItems.splice(index, 1);
          setDesiredItems(updatedDesiredItems);
        }
      };

  return (
    <div>
      <section>
        <h4>Cadastro Itens</h4>
        <input
          type='text'
          placeholder='Nome do Item'
          value={itemNameFirst}
          onChange={(e) => setItemNameFirst(e.target.value)}
        />
        <input
          type='text'
          placeholder='Quantidade'
          value={itemQuantityFirst}
          onChange={(e) => setItemQuantityFirst(e.target.value)}
        />
        <button onClick={handleAddItemFirst}>Adicionar Item</button>

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.weight}</td>
                <button onClick={() => handleRemove(index, 'items')}>
                  Remover
                </button>
              </tr>
            ))}
          </tbody>
        </table>
        <input type='file' accept='.csv' onChange={handleFileNovosItens} />
      </section>
      <section>
        <h4>Lista de Itens da Cesta Básica</h4>
        <input
          type='text'
          placeholder='Nome do Item'
          value={itemNameSecond}
          onChange={(e) => setItemNameSecond(e.target.value)}
        />
        <input
          type='text'
          placeholder='Quantidade'
          value={itemQuantitySecond}
          onChange={(e) => setItemQuantitySecond(e.target.value)}
        />
        <button onClick={handleAddItemSecond}>Adicionar Item</button>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {desiredItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.weight}</td>
                <button onClick={() => handleRemove(index, 'desiredItems')}>
                  Remover
                </button>
              </tr>
            ))}
          </tbody>
        </table>
        <input type='file' accept='.csv' onChange={handleFileCesta} />
      </section>
      <section>
        <h4>Relatório Final</h4>
        <p>{basketsMade} cestas básicas prontas</p>
        {remainingItems.map((item, index) => (
          <p key={index}>
            {item.remainingQuantity} {item.name}(s) excedente(s)
          </p>
        ))}
      </section>
      <button onClick={handleCreateCestas}>Calcular Cestas</button>
      <button onClick={downloadCSV}>Baixar Itens em CSV</button>
    </div>
  );
}

export default CadastroCesta;
