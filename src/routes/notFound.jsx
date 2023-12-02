import { Link } from "react-router-dom";
import erro from "../../public/images/dark.png"

export default function NotFound() {
  return (
    <div className="container">
    <div className="bg-black-div/90 border border-white rounded-xl my-20 py-12 px-8">
      <div className="flex justify-center ">
        <img className="" src={erro} alt="meme" />
        <div>
          <h1 className="text-white  text-8xl">404</h1>
          <h2 className="text-white text-3xl" >Pagina não encontrada </h2>
          <p className="pt-3.5 text-white" >A página que você procura não existe ou não está disponível no momento.</p>
          <Link to="/"><button className="pt-24"><span className="  text-white bg-red-500 text-white py-2 px-4 rounded">ir para a pagina inicial</span></button></Link>
          
        </div>
          
      </div>
    </div>
  </div>
  );
}