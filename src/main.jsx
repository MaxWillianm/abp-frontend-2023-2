import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/home.jsx';
import Produtos from './routes/Produtos/produtos.jsx';
import AdicionaProduto from './routes/Produtos/adiciona_produto.jsx';
import View from './routes/Produtos/view.jsx'
import Login from './routes/login.jsx';
import Cadastro from './routes/cadastro.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children: [
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/produtos",
        element:<Produtos/>
      },
      {
        path:"/produtos/add",
        element:<AdicionaProduto/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/cadastro",
        element:<Cadastro/>
      },
      {
        path:"produtos/view/:id",
        element:<View/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
