import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carrinho from "../../public//svg/carrinho";
import { toast } from 'react-toastify';

export default function Header() {
  const location = useLocation();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    if(location.pathname === '/'){
      const usuario = JSON.parse(localStorage.getItem('usuario'));
       setUser(usuario);
    }
  }, [location.pathname]);


  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if(usuario === ''){
      navigate('/login');
    }
  }, [location.pathname]);
  

  const handleUser = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
    toast.success('Você saiu da sua conta!');
  }

  if(window.location.pathname === '/login' || window.location.pathname === '/cadastro'){
    return null;
  }
  return (
    <div className="App">
      <header className="bg-black-div/80 w-full">
        <div className="container">
          <div className="flex w-full justify-between uppercase items-center space-x-12">
            <div className="flex items-center py-5 space-x-12">
            <Link to={'/'}><img src="../../public/svg/logo.svg" alt="" className="w-24 h-24" /></Link>
              <Link className="text-white" to="/" >Home</Link>
              <Link className="text-white" to="/produtos" >Produtos</Link>
              <Link className="text-white" to="/historico" >Historico</Link>
            </div>
            <div className="flex items-center space-x-5">
              <Link to="/carrinho" ><Carrinho className="w-7 fill-white" /></Link>
              <p className="text-white normal-case">Olá, {user.nome}!</p>
              <button onClick={handleUser} className="text-white px-7 py-3 bg-blue-high rounded-lg transition-all hover:bg-blue-light" >sair</button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
