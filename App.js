// src/App.jsx

import React, { useState, useEffect } from 'react';
import './App.css'; // Para o estilo (usaremos Tailwind para simplificar)

function App() {
  // Estado para controle do orçamento
  const [budget, setBudget] = useState(0); // Orçamento total
  const [currentBudget, setCurrentBudget] = useState(0); // Orçamento restante
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productWeight, setProductWeight] = useState('');
  const [productHistory, setProductHistory] = useState([]);

  // Função para adicionar produto
  const addProduct = () => {
    if (!productName || !productPrice || !productQuantity) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    // Criando objeto do produto
    const newProduct = {
      name: productName,
      price: parseFloat(productPrice),
      quantity: parseInt(productQuantity),
      weight: productWeight ? parseFloat(productWeight) : 0,
    };

    // Atualizando histórico
    setProductHistory([...productHistory, newProduct]);

    // Atualizando o orçamento
    const totalPrice = newProduct.price * newProduct.quantity;
    setCurrentBudget(currentBudget - totalPrice);

    // Limpando os campos
    setProductName('');
    setProductPrice('');
    setProductQuantity('');
    setProductWeight('');
  };

  // Função para atualizar orçamento inicial
  const setInitialBudget = (e) => {
    const value = parseFloat(e.target.value);
    setBudget(value);
    setCurrentBudget(value);
  };

  return (
    <div className="App max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Cadastro de Produtos</h1>
      
      {/* Campo para definir orçamento */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Orçamento Total:</label>
        <input
          type="number"
          value={budget}
          onChange={setInitialBudget}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          placeholder="Informe seu orçamento"
        />
        <p className="mt-2 text-sm text-gray-600">Saldo restante: R$ {currentBudget.toFixed(2)}</p>
      </div>

      {/* Formulário de cadastro de produto */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nome do Produto:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          placeholder="Nome do produto"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Preço:</label>
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          placeholder="Preço do produto"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Quantidade:</label>
        <input
          type="number"
          value={productQuantity}
          onChange={(e) => setProductQuantity(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          placeholder="Quantidade do produto"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Peso (KG - opcional):</label>
        <input
          type="number"
          value={productWeight}
          onChange={(e) => setProductWeight(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          placeholder="Peso em KG"
        />
      </div>

      {/* Botão para adicionar produto */}
      <button
        onClick={addProduct}
        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Adicionar Produto
      </button>

      {/* Histórico de produtos */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Histórico de Produtos</h2>
        <ul className="mt-2">
          {productHistory.map((product, index) => (
            <li key={index} className="border-b py-2">
              <strong>{product.name}</strong> - R$ {product.price.toFixed(2)} x {product.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
