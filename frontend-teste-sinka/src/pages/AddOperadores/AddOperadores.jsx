import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import { operadores } from '../../API/ApiRoutes'
import axios from 'axios'
import './AddOperadores.css'
import { MdHome } from 'react-icons/md';
import Loading from '../../components/Loading/Loading'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddOperedores() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [nomeOperador, setNomeOperador] = useState(''); 

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  }

  const createOperador = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(operadores, {
        nome: nomeOperador, 
      });
      if(response)
      setData(response.data); 
      toast.success(
        "Operador criado com sucesso!",
        toastOptions
      )
    } catch (error) {
      toast.error(
        "Falha ao criar operador!",
        toastOptions
      )
      console.error('Erro ao adicionar o usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Adicione Operadores</h2>
      </div>
      <form className="addOperadorForm" onSubmit={createOperador}>
        <input
          type="text"
          id="nomeOperador"
          placeholder="Nome do Operador"
          value={nomeOperador}
          onChange={(e) => setNomeOperador(e.target.value)}
        />
        <button className="add-button" type="submit" disabled={loading}>Adicionar
        </button>
      </form>
      {loading && <Loading/>}
      <Link to="/" className="back">
        <MdHome size={30} color="black" />
      </Link>
      <ToastContainer />
    </div>
  );
}

export default AddOperedores