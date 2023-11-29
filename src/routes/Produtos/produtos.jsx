import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import Loading from '../../../public/svg/loading.svg'

export default function Produtos() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost/backend-ABP-front/produto')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      {loading ? (
        <img className='w-24 mx-auto pt-24' src={Loading}></img>
      ) : error ? (
        <div>Erro ao carregar os produtos.</div>
      ) : (
        <div className="bg-black-div/90 border border-white rounded-xl mt-20 py-12 px-8">
          <div className="flex flex-wrap justify-start gap-12">
            {data.map((produto) => (
              <div className="w-40" key={produto.Produto.id}>
                <Link to={`/produtos/view/${produto.Produto.id}`}>
                  <img className="w-full h-32 object-cover" src={`data:image/jpeg;base64,${produto.Produto.imagem}`} alt="Cabo Extensor" />
                  <h1 className="text-white text-2xl">{produto.Produto.nome}</h1>
                  <h2 className="text-white text-xl">R$ {produto.Produto.valor}</h2>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}