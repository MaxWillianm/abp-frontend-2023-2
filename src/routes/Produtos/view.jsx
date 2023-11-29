import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../../../public/svg/loading.svg'

export default function View() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const Url = `http://localhost/backend-ABP-front/produto/view/${id}`;

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
  }, [id]);

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
          <section className="flex space-x-20 justify-center p-4">
            <div className="max-w-md w-full">
              <img src={`data:image/jpeg;base64,${data.Produto.imagem}`} alt="Produto Azul" className="max-w-full h-auto border border-gray-300 p-1" />
            </div>

            <div className="max-w-md w-full">
              <h2 className="text-xl text-white font-semibold mb-4">Descrição</h2>
              <div className="list-disc text-white pl-4 mb-4">
                <p>{data.Produto.descricao}</p>
              </div>

              <div className='flex flex-col'>
                <h2 className="text-xl text-white font-semibold mb-4">R$ {data.Produto.valor}</h2>

                <button onClick={null} className="bg-red-500 text-white py-2 px-4 transition-all rounded hover:bg-red-700">Adicionar ao Carrinho</button>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}