import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../../public/svg/loading.svg'
import { useNavigate } from 'react-router-dom';

export default function View() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const Url = `http://localhost/backend-ABP-front/produto/view/${id}`;
  const navigate = useNavigate();

  const addProdutoCarrinho = () => {
    const usuario = localStorage.getItem('usuario');
    if (usuario === null) {
      navigate('/login');
    } else {
      const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      const novoProduto = {
        id: data.Produto.id,
      };
      carrinho.push(novoProduto);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      toast.success('Produto adicionado ao carrinho!');
    }
  }


  useEffect(() => {
    axios.get(Url)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [Url, id]);

  return (
    <div className="font-sans">
      {loading ? (
        <div className='text-white w-full h-screen justify-center items-center'>
          <img className='w-24 mx-auto pt-24' src={Loading}></img>
        </div>
      ) : (
        <>
          <header className="bg-gray-800 text-white mb-12 text-center py-4">
            <h1 className="text-2xl">{data.Produto.nome}</h1>
          </header>
          <div className='container'>
            <div className="bg-black-div/90 border border-white rounded-xl mt-12 py-12 px-8">
              <div className="flex flex-wrap justify-center gap-12">
                <section className="flex space-x-20 justify-center p-4">
                  <div className="max-w-md w-full">
                    <img src={`data:image/jpeg;base64,${data.Produto.imagem}`} alt="Produto Azul" className="max-w-full h-auto border p-1" />
                  </div>
                  <div className="max-w-md w-full">
                    
                    <h2 className="text-xl text-white font-semibold mb-4">Descrição</h2>
                    <div className="list-disc text-white pl-4 mb-4">
                      <p>{data.Produto.descricao}</p>
                    </div>
                    
                    <div className='flex items-center space-x-3'>
                      <h2 className="text-xl text-white font-semibold">Cor:</h2>
                    <p className='text-white'>{data.Produto.cor}</p>
                    </div>
                    <div className='flex flex-col'>
                      <h2 className="text-xl text-white font-semibold mb-4">R$ {data.Produto.valor}</h2>
                      <button onClick={addProdutoCarrinho} className="bg-red-500 text-white py-2 px-4 transition-all rounded hover:bg-red-700">Adicionar ao Carrinho</button>
                    </div>
                  </div>
                </section>
              </div>
              <div className='container justify-end flex'>
                <Link to="/produtos" className="bg-gray-800 text-white py-2 px-8 transition-all rounded hover:bg-gray-700">Voltar</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}