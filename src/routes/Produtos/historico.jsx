import { useState, useEffect } from "react";

export default function Historico() {
  const [carregando, setCarregando] = useState(true);
  const comprasLocalStorage = JSON.parse(localStorage.getItem("compra"));
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const compras = comprasLocalStorage.filter(
    (item) => item.usuario == usuario.id
  );

//   compras.forEach((item) => {
//     const produtos = item.produtos.map((produto) => {
//       return { id: produto.id, quantidade: produto.quantidade };
//     });
//     const compraData = {
//       usuario: usuario.id,
//       produtos,
//       data: item.data,
//       valor: item.valor,
//     };
    console.log(compras);
//   });

  return (
    <>
      <div className="container">
        <div className="bg-black-div/90 border border-white rounded-xl  my-20 py-12 px-8">
          <div className="flex flex-col space-y-12">
              <div className="flex flex-col space-y-12">
                <h1 className="text-white text-xl font-bold">Compras do usuario: {usuario.nome}</h1>
                {compras.map((item) => (
                  <>
                <div className="w-full bg-white h-px"></div>
                  <div key={item.valor_total} className="flex space-x-12 items-center">
                    <p className="text-white font-bold">Data da compra: <span className="font-normal">{new Date(item.data_hora).toLocaleString()}</span></p>
                    <p className="text-white font-bold">Valor total: R$ <span className="font-normal">{item.valor_total}</span></p>
                  </div>
                </>
                ))}
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
