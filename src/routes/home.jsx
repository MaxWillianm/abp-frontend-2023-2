import { useEffect } from "react";
import VerifyLogin from "../routes/Controllers/verifyLogin";

export default function Home() {

  useEffect(() => {
    VerifyLogin();
  }, []);

  return (
    <div className="container">
      <div className="bg-black-div/90 border border-white rounded-xl mt-20 py-12 px-8">
        <h1 className="text-5xl font-bold text-blue-light">Bem-vindo ao Market X!</h1>
        <p className="text-lg text-white mt-12">
          Aqui você encontra os melhores produtos pelo menor preço!
        </p>
      </div>
    </div>
  );
}
