import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Url = "http://localhost/backend-ABP-front/produto";

  useEffect(() => {
    axios
      .get(Url)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost/backend-ABP-front/produto/delete/${id}`)
      .then(() => {
        setData(data.filter((produto) => produto.Produto.id !== id));
        toast.success("Produto deletado com sucesso!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="container">
        <div className="flex justify-between mt-12 items-center">
          <h1 className="text-white text-3xl">Administrando Produtos</h1>
          <Link
            className="text-white px-7 py-3 bg-blue-high rounded-lg transition-all hover:bg-blue-light"
            to="/admin/add"
          >
            Adicionar novos produtos
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-44 items-center">
            <img
              src="../../public/svg/loading.svg"
              alt=""
              className="w-24 h-24"
            />
          </div>
        ) : error ? (
          <div>Erro ao carregar os produtos.</div>
        ) : (
          <div className="bg-black-div/90 border border-white rounded-xl mt-12 py-12 px-8">
            <div className="flex flex-col justify-start gap-12">
              {data.map((produto) => (
                <div
                  className="flex w-full justify-between items-center"
                  key={produto.Produto.id}
                >
                  <div className="flex items-center space-x-10">
                    <img
                      className="w-24 h-auto object-cover"
                      src={`data:image/jpeg;base64,${produto.Produto.imagem}`}
                      alt="Cabo Extensor"
                    />
                    <h1 className="text-white text-2xl">
                      {produto.Produto.nome}
                    </h1>
                    <h2 className="text-white text-xl">
                      R$ {produto.Produto.valor}
                    </h2>
                  </div>
                  <div className="space-x-3">
                    <button
                      className="text-white px-7 py-3 bg-blue-high rounded-lg transition-all hover:bg-blue-light"
                      onClick={() => handleDelete(produto.Produto.id)}
                    >
                      Delete
                    </button>
                    <Link
                      to={`/admin/edit/${produto.Produto.id}`}
                      className="text-white px-7 py-3 bg-blue-high rounded-lg transition-all hover:bg-blue-light"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
