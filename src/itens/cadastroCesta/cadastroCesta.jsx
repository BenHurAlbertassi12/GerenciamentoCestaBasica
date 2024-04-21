import React, { useState } from 'react';
import '../../App.css';

function CadastroCesta() {
  const [items, setItems] = useState([]);
  const [desiredItems, setDesiredItems] = useState([]);
  const [basketsMade, setBasketsMade] = useState(0);
  const [remainingItems, setRemainingItems] = useState([]);
  const [missingItems, setMissingItems] = useState([]);

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
      quantity: parseInt(itemQuantityFirst),
      weight: parseFloat(itemWeightFirst),
    };
    const updatedItems = [...items];
    const existingIndex = updatedItems.findIndex(
      (item) => item.name === itemNameFirst
    );
    if (existingIndex !== -1) {
      updatedItems[existingIndex].quantity += newItem.quantity;
    } else {
      updatedItems.push(newItem);
    }
    setItems(updatedItems);
    setItemNameFirst('');
    setItemQuantityFirst('');
    setItemWeightFirst('');
  };

  const handleAddItemSecond = () => {
    const newItem = {
      name: itemNameSecond,
      quantity: parseInt(itemQuantitySecond),
      weight: parseFloat(itemWeightSecond),
    };
    const updatedDesiredItems = [...desiredItems];
    const existingIndex = updatedDesiredItems.findIndex(
      (item) => item.name === itemNameSecond
    );
    if (existingIndex !== -1) {
      updatedDesiredItems[existingIndex].quantity += newItem.quantity;
    } else {
      updatedDesiredItems.push(newItem);
    }
    setDesiredItems(updatedDesiredItems);
    setItemNameSecond('');
    setItemQuantitySecond('');
    setItemWeightSecond('');
  };

  const handleCreateCestas = () => {
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

    if (totalCestas === Infinity) {
      setBasketsMade(0);
      setRemainingItems([]);
      setMissingItems(desiredItems);
      return;
    }

    setBasketsMade(totalCestas);

    const remaining = [];
    const missing = [];
    items.forEach((item) => {
      const desiredItem = desiredItems.find(
        (desired) => desired.name === item.name
      );
      if (desiredItem) {
        const remainingQuantity =
          item.quantity - desiredItem.quantity * totalCestas;
        if (remainingQuantity > 0) {
          remaining.push({ ...item, remainingQuantity });
        } else if (remainingQuantity < 0) {
          missing.push({
            name: item.name,
            quantity: Math.abs(remainingQuantity),
          });
        }
      }
    });

    setRemainingItems(remaining);
    setMissingItems(missing);
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
        return {
          name,
          quantity: parseInt(quantity),
          weight: parseFloat(weight),
        };
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
        return {
          name,
          quantity: parseInt(quantity),
          weight: parseFloat(weight),
        };
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

  const handleClearCalculation = () => {
    setBasketsMade(0);
    setRemainingItems([]);
    setMissingItems([]);
  };

  const handleMissingItems = () => {
    let missing = [];
    desiredItems.forEach((desiredItem) => {
      const itemInList = items.find((item) => item.name === desiredItem.name);
      if (!itemInList) {
        missing.push(desiredItem);
      } else {
        const requiredQuantity = desiredItem.quantity * basketsMade;
        if (itemInList.quantity < requiredQuantity) {
          missing.push({
            name: itemInList.name,
            quantity: requiredQuantity - itemInList.quantity,
          });
        }
      }
    });
    setMissingItems(missing);
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
                <td>
                  <button onClick={() => handleRemove(index, 'items')}>
                    Remover
                  </button>
                </td>
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
                <td>
                  <button onClick={() => handleRemove(index, 'desiredItems')}>
                    Remover
                  </button>
                </td>
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
        {missingItems.length > 0 && (
          <div>
            <h4>Itens Faltantes para Montar Nova Cesta:</h4>
            <ul>
              {missingItems.map((item, index) => (
                <li key={index}>
                  {item.name}: {item.quantity} unidade(s)
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <button onClick={handleCreateCestas}>Calcular Cestas</button>
      <button onClick={downloadCSV}>Baixar Itens em CSV</button>
      <button onClick={handleMissingItems}>Ver Itens Faltantes</button>
      <button onClick={handleClearCalculation}>Limpar Cálculo</button>
    </div>
  );
}

export default CadastroCesta;
