import { useEffect, useState } from "react";
import Carrinho from "../../../public/svg/carrinho";
import { toast } from "react-toastify";
import axios from "axios";

export default function Kart() {
  const itemsCarrinho = JSON.parse(localStorage.getItem('carrinho'));
  const url = 'http://localhost/backend-ABP-front/produto/view/';
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (itemsCarrinho) {
      itemsCarrinho.forEach((item) => {
        axios.get(url + item.id)
          .then((response) => {
            const updatedItem = { ...response.data, quantity: 1 };
            setItems((oldItems) => [...oldItems, updatedItem]);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
  }, []);

  const handleDecrease = (index) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity -= 1;
      return updatedItems;
    });
  };

  const handleIncrease = (index) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity += 1;
      return updatedItems;
    });
  };

  let total = 0;
  items.forEach((item) => {
    total += parseInt(item.Produto.valor, 10) * item.quantity;
  });

  const removeFromLocalStorage = (id) => {
    const updatedItemsCarrinho = itemsCarrinho.filter((item) => item.id !== id);
    localStorage.setItem('carrinho', JSON.stringify(updatedItemsCarrinho));
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.Produto.id !== id);
      return updatedItems;
    });
  };

  const handleCompra = () => {
    try {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      const produtosId = items.map((item) => ({ id: item.Produto.id, quantidade: item.quantity }));
      
      const compraData = {
        usuario: usuario.id,
        produtos: produtosId,
        valor_total: total,
        data_hora: new Date().toISOString()
      };

      if(compraData.produtos.length === 0)
        {
          toast.error('Adicione algum produto ao carrinho para comprar!');
          return;
        }
        
      const comprasAnteriores = JSON.parse(localStorage.getItem('compra')) || [];
      const comprasAtualizadas = [...comprasAnteriores, compraData];

      localStorage.setItem('compra', JSON.stringify(comprasAtualizadas));
      localStorage.removeItem('carrinho');
      setItems([]);
      toast.success('Compra realizada com sucesso!');

    } catch (error) {
      console.error(error);
      toast.error('Adicione algum produto ao carrinho para comprar!');
    }
  };

  return (
    <div className="container">
      <div className="bg-black-div/90 border border-white rounded-xl mt-20 py-12 px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Carrinho alt="" className="w-16 h-16 fill-white" />
            <h1 className="text-white text-2xl font-bold">Meu Carrinho</h1>
          </div>
          <div className="flex items-center space-x-4">
            <h1 className="text-white text-2xl font-bold">Total: R$ {total}</h1>
            <button onClick={handleCompra} className="bg-blue-high px-8 py-3 rounded-lg transition-all hover:bg-blue-light">
              <h1 className="text-white text-lg font-bold">Finalizar Compra</h1>
            </button>
          </div>
        </div>
        <div className="flex flex-col mt-10 space-y-4">
          {items.length > 0 ? (items.map((item, index) => (
            <div className="flex justify-between items-center" key={item.Produto.id}>
              <div className="flex items-center space-x-4">
                <img src={`data:image/jpeg;base64,${item.Produto.imagem}`} alt="" className="w-16 h-16" />
                <div className="flex flex-col">
                  <h1 className="text-white text-xl font-bold">{item.Produto.nome}</h1>
                  <h1 className="text-white text-lg">R$ {item.Produto.valor}</h1>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-blue-high px-8 py-3 rounded-lg transition-all hover:bg-blue-light" onClick={() => handleDecrease(index)}>
                  <h1 className="text-white text-lg font-bold">-</h1>
                </button>
                <h1 className="text-white text-lg font-bold">{item.quantity}</h1>
                <button className="bg-blue-high px-8 py-3 rounded-lg transition-all hover:bg-blue-light" onClick={() => handleIncrease(index)}>
                  <h1 className="text-white text-lg font-bold">+</h1>
                </button>
                <button className="bg-red-high px-8 py-3 rounded-lg transition-all hover:bg-red-light" onClick={() => removeFromLocalStorage(item.Produto.id)}>
                  <h1 className="text-white text-lg font-bold">Remover</h1>
                </button>
              </div>
            </div>
          ))
          ) : (
            <h1 className="text-white text-lg font-bold">Seu carrinho está vazio!</h1>
          )}
        </div>
      </div>
    </div>
  );
}
