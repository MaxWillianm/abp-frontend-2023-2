import { useEffect } from "react";
import VerifyLogin from "../Controllers/verifyLogin";

export default function Historico() {

  useEffect(() => {
    VerifyLogin();
  }, []);

  const comprasLocalStorage = JSON.parse(localStorage.getItem("compra"));
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  let compras = [];
  if(comprasLocalStorage){
    compras = comprasLocalStorage.filter((item) => item.usuario === usuario.id);
  }


  return (
    <>
      <div className="bg-gray-800 text-white mb-12 text-center py-4">
        <h1 className="text-2xl">Histórico de compras</h1>
      </div>
      <div className="container">
        <div className="bg-black-div/90 border border-white rounded-xl  my-20 py-12 px-8">
          <div className="flex flex-col space-y-12">
              <div className="flex flex-col space-y-12">
                <h1 className="text-white text-xl font-bold">Compras do usuario: {usuario.nome}</h1>
                {compras.length > 0 ? (compras.map((item) => (
                  <>
                <div className="w-full bg-white h-px"></div>
                  <div key={item.valor_total} className="flex space-x-12 items-center">
                    <p className="text-white font-bold">Data da compra: <span className="font-normal">{new Date(item.data_hora).toLocaleString()}</span></p>
                    <p className="text-white font-bold">Valor total: R$ <span className="font-normal">{item.valor_total}</span></p>
                  </div>
                </>
                ))) : (
                  <h1 className="text-white text-xl font-bold">Nenhuma compra realizada</h1>
                )
              }
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
