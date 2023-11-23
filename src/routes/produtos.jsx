import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom";



export default function Produtos() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost/backend-ABP-front/produto')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError("Servidor temporariamente indisponivel");
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <div className="bg-black-div/90 border border-white rounded-xl  my-20 py-12 px-8">
        {data && data.map((item) => (
          <div key={item.Produto.id}>
            <div className="flex items-center">
              <div className="flex w-full flex-col">
                <h1 className="font-bold text-white"> Nome: {item.Produto.nome}</h1>
                <p className="text-white">Valor: R${item.Produto.valor}</p>
                <p className="text-white">Quantidade: {item.Produto.quantidade}</p>
              </div>
              <button className="text-white px-5 py-3 bg-blue-high rounded-lg transition-all hover:bg-blue-light">Deletar</button>
            </div>
            <div className="w-full h-px border-b border-white my-6"></div>
          </div>
        ))}
        {!data && !error &&
        <div className="flex w-full justify-center items-center">
          <img src="../../public/svg/loading.svg" alt="" className="w-24 h-24" />
        </div>
        }
        {error &&
        <div className="flex w-full justify-center items-center">
          <p className="text-white">{error}</p>
        </div>
        }
      </div>
    </div>
  )
}
