import React, { useState } from 'react';
import '../../App.css';

function CadastroCesta() {
  const [items, setItems] = useState([]);
  const [desiredItems, setDesiredItems] = useState([]);
  const [basketsMade, setBasketsMade] = useState(0);

  const [showItemsTable, setShowItemsTable] = useState(false);
  const [showDesiredItemsTable, setShowDesiredItemsTable] = useState(false);

  const [itemNameFirst, setItemNameFirst] = useState('');
  const [itemQuantityFirst, setItemQuantityFirst] = useState('');

  const [itemNameSecond, setItemNameSecond] = useState('');
  const [itemQuantitySecond, setItemQuantitySecond] = useState('');

  const handleAddItem = (name, quantity, list, setList) => {
    const newItem = {
      name,
      quantity: parseInt(quantity),
    };
    const updatedList = [...list];
    const existingIndex = updatedList.findIndex((item) => item.name === name);
    if (existingIndex !== -1) {
      updatedList[existingIndex].quantity += newItem.quantity;
    } else {
      updatedList.push(newItem);
    }
    setList(updatedList);
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
      return;
    }

    setBasketsMade(totalCestas);
  };

  const handleFile = (event, setList) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n').slice(1);
      const newItems = lines.map((line) => {
        const [name, quantity] = line.split(',');
        return {
          name,
          quantity: parseInt(quantity),
        };
      });
      setList(newItems);
    };
    reader.readAsText(file);
  };

  const handleRemove = (index, list, setList) => {
    const updatedList = [...list];
    updatedList.splice(index, 1);
    setList(updatedList);
  };

  const handleClearCalculation = () => {
    setBasketsMade(0);
  };

  return (
    <div>
      <section>
        <h2 className='clarear_titulo'>Lista de Itens da Cesta Básica</h2>
        <button
          onClick={() => setShowDesiredItemsTable(!showDesiredItemsTable)}>
          {showDesiredItemsTable ? 'Esconder' : 'Mostrar'} Tabela de Lista de
          Itens
        </button>
        {showDesiredItemsTable && (
          <>
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
            <button
              onClick={() =>
                handleAddItem(
                  itemNameSecond,
                  itemQuantitySecond,
                  desiredItems,
                  setDesiredItems
                )
              }>
              Adicionar Item
            </button>
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
                    <td>
                      <button
                        onClick={() =>
                          handleRemove(index, desiredItems, setDesiredItems)
                        }>
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <input
              type='file'
              accept='.csv'
              onChange={(e) => handleFile(e, setDesiredItems)}
            />
          </>
        )}
      </section>
      <section>
        <h4 className='clarear_titulo'>Cadastro Itens</h4>
        <button onClick={() => setShowItemsTable(!showItemsTable)}>
          {showItemsTable ? 'Esconder' : 'Mostrar'} Tabela de Cadastro
        </button>
        {showItemsTable && (
          <>
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
            <button
              onClick={() =>
                handleAddItem(itemNameFirst, itemQuantityFirst, items, setItems)
              }>
              Adicionar Item
            </button>
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
                    <td>
                      <button
                        onClick={() => handleRemove(index, items, setItems)}>
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <input
              type='file'
              accept='.csv'
              onChange={(e) => handleFile(e, setItems)}
            />
          </>
        )}
      </section>
      <section>
        <h4 className='clarear_titulo'>Relatório Final</h4>
        <p>{basketsMade} cestas básicas prontas</p>
      </section>
      <button onClick={handleCreateCestas}>Calcular Cestas</button>
      <button onClick={handleClearCalculation}>Limpar Cálculo</button>
    </div>
  );
}

export default CadastroCesta;
