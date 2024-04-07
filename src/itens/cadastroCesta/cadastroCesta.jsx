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
    // Conta os itens presentes na cesta básica
    const itemsInCesta = {};
    items.forEach((item) => {
      itemsInCesta[item.name] = item.quantity;
    });

    // Verifica a quantidade de cestas básicas possíveis
    let totalCestas = Infinity;
    desiredItems.forEach((item) => {
      if (itemsInCesta[item.name]) {
        const cestasPossible = Math.floor(
          itemsInCesta[item.name] / item.quantity
        );
        totalCestas = Math.min(totalCestas, cestasPossible);
      }
    });
    setBasketsMade(totalCestas);

    // Calcula os itens excedentes
    const remaining = [];
    desiredItems.forEach((item) => {
      if (itemsInCesta[item.name]) {
        const remainingQuantity =
          itemsInCesta[item.name] - item.quantity * totalCestas;
        if (remainingQuantity > 0) {
          remaining.push({ name: item.name, quantity: remainingQuantity });
        }
      }
    });
    setRemainingItems(remaining);
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
        <input
          type='text'
          placeholder='Peso (kg)'
          value={itemWeightFirst}
          onChange={(e) => setItemWeightFirst(e.target.value)}
        />
        <button onClick={handleAddItemFirst}>Adicionar Item</button>

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Peso (kg)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
        <input
          type='text'
          placeholder='Peso (kg)'
          value={itemWeightSecond}
          onChange={(e) => setItemWeightSecond(e.target.value)}
        />
        <button onClick={handleAddItemSecond}>Adicionar Item</button>

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Peso (kg)</th>
            </tr>
          </thead>
          <tbody>
            {desiredItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <h4>Relatório Final</h4>
        <p>{basketsMade} cestas básicas prontas</p>
        {remainingItems.length > 0 && (
          <div>
            <p>Itens excedentes:</p>
            <ul>
              {remainingItems.map((item, index) => (
                <li key={index}>
                  {item.quantity} {item.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <button onClick={handleCreateCestas}>Calcular Cestas</button>
    </div>
  );
}

export default CadastroCesta;
