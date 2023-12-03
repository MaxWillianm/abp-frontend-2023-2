import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export function App() {

  return (
  <>
    <div>
      <ToastContainer />
      <Header />
      <Outlet />
      <Footer />
    </div>
  </>
  );
}

export default App;
