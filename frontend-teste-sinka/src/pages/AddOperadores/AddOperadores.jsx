import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import { operadores } from '../../API/ApiRoutes'
import axios from 'axios'
import './AddOperadores.css'
import { MdHome } from 'react-icons/md';

function AddOperedores() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [nomeOperador, setNomeOperador] = useState(''); 

  const createOperador = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(operadores, {
        nome: nomeOperador, 
      });
      if(response)
      setData(response.data); 
    } catch (error) {
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
      <Link to="/" className="back">
        <MdHome size={30} color="black" />
      </Link>
    </div>
  );
}

export default AddOperedores