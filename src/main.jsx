// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/home.jsx';
import Produtos from './routes/Produtos/produtos.jsx';
import AdicionaProduto from './routes/Produtos/adiciona_produto.jsx';
import View from './routes/Produtos/view.jsx'
import Login from './routes/UserRoutes/login.jsx';
import Cadastro from './routes/UserRoutes/cadastro.jsx';
import NotFound from './routes/notFound.jsx';
import Kart from './routes/Kart/kart.jsx';
import Historico from './routes/Produtos/historico.jsx';
import Admin from './routes/Admin/admin.jsx';
import EditProduto from './routes/Produtos/edit_produto.jsx';

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
        path:"/login",
        element:<Login/>
      },
      {
        path:"/produtos",
        element:<Produtos/>
      },
      {
        path:"/admin/add",
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
      },
      {
        path:"/carrinho",
        element:<Kart/>
      },
      {
        path:"/historico",
        element:<Historico/>
      },
      {
        path:"*",
        element:<NotFound />
      },
      {
        path:"/admin",
        element:<Admin/>
      },
      {
        path:"/admin/edit/:id",
        element:<EditProduto/>
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
)
