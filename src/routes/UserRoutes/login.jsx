import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

function Login() {
  const [credenciais, setCredenciais] = useState({
    email: "",
    senha: "",
  });
  const [carregando, setCarregando] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCarregando(true);

    try {
      if (!credenciais.email || !credenciais.senha) {
        throw new Error("Por favor, preencha todos os campos.");
      }

      const data = JSON.stringify(credenciais);
      const response = await axios.post(
        "http://localhost/backend-ABP-front/usuario/login",
        data,
        {}
      );

      if(response.data == "<pre>Usuário não encontrado</pre>"){
        throw new Error("");
      }
      console.log(response.data);

      localStorage.setItem("usuario", JSON.stringify(response.data.Usuario));

      setIsFormSubmitted(true);
      setFormError("");
      navigate('/');
      toast.success('Login bem-sucedido!');
    } catch (error) {
      console.error(error.message);
      toast.error('Usuário não encontrado!');
    }

    setCarregando(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredenciais((prevCredenciais) => ({
      ...prevCredenciais,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="bg-black-div/90 border border-white rounded-xl my-20 py-12 px-8">
        <div className="flex justify-center mb-9">
          <img src="../../public/svg/logo.svg" alt="" className="w-44 h-44" />
        </div>
        <div>
          <h1 className="text-white text-center mb-3 text-3xl font-bold">Login</h1>
        </div>
        <form
          id="formLogin"
          className="flex flex-col space-y-12"
          onSubmit={handleSubmit}
        >
          <input
            className="ml-5 bg-black-input text-white rounded px-4 py-3"
            placeholder="E-mail"
            type="email"
            name="email"
            value={credenciais.email}
            onChange={handleChange}
          />
          <input
            className="ml-5 bg-black-input text-white rounded px-4 py-3"
            placeholder="Senha"
            type="password"
            name="senha"
            value={credenciais.senha}
            onChange={handleChange}
          />
          <button
            className="text-white flex w-1/4 mx-auto justify-center items-center bg-blue-high rounded p-5 transition-all hover:bg-blue-light"
            type="submit"
            disabled={carregando}
          >
            {carregando ? (
              <img
                src="../../public/svg/loading_white.svg"
                className="w-9 h-9"
              />
            ) : (
              "Login"
            )}
          </button>
          {formError && <p className="text-white">{formError}</p>}
          {isFormSubmitted && <p className="text-white">Login bem-sucedido!</p>}
        </form>
        <div className="flex justify-center mt-8 items-center">
          <p className="text-white">Não possui uma conta?</p>
          <Link to="/cadastro" className="text-white ml-2 hover:underline">
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
