import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import MainPage from './pages/MainPage/MainPage';
import GetOperedores from "./pages/GetOperadores/GetOperedores";
import AddOperedores from "./pages/AddOperadores/AddOperadores";
import UploadFileComponent from './pages/UploadFile/UploadFileComponent';


function App() {

  return (
    <BrowserRouter>
        <header>
          <Link to="/"></Link>
        </header>
        <Routes>
          <Route path="/" element={< MainPage/>} />
          <Route path="/GetOperadores" element={< GetOperedores/>} />
          <Route path="/AddOperedores" element={< AddOperedores/>} />
          <Route path="/UploadCSV" element={< UploadFileComponent/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
