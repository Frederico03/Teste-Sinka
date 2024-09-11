import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import './OperadorModal.css'; 
import PropTypes from "prop-types"
import {MdOutlineClose} from 'react-icons/md'
import axios from 'axios';
import { clientes } from '../../API/ApiRoutes';
import loadingGif from "../../assets/media/loading.gif"

const OperatorModal = ({ operador, closeModal }) => {
  const [loading, setLoading] = useState(true)
  const [cliente, setCliente] = useState([])

  useEffect(() => {
    const fetchData = async () => { 
      setLoading(true);
      try {
        const response = await axios.get(`${clientes}/${operador.id}`);

        const cliente = response.data.map(item => ({
          nome: item.props.nome,
          email: item.props.email,
          data_nascimento: item.props.data_nascimento,
          valor: item.props.valor,
        }));

        setCliente(cliente)
        console.log(cliente)
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [operador.id])

  return ReactDOM.createPortal(
    <div className='modal-overlay' onClick={closeModal}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <MdOutlineClose className='modal-close' onClick={closeModal}/>
        <ul className='list-clientes'>
        {loading ? (
            <div className="loading-overlay">
            <img src={loadingGif} alt="Carregando..." className="loading-gif" />
          </div>
          ) : (
            cliente.map((c, index) => (
              <li key={index}>
                <h2>{c.nome}</h2>
                <p><strong>Data de Nascimento:</strong> {new Date(c.data_nascimento).toLocaleDateString()}</p>
                <p><strong>Email:</strong> {c.email}</p>
                <p><strong>Valor:</strong> {c.valor}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>,
    document.body
  );
};

OperatorModal.propTypes = {
  operador: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    criadoEm: PropTypes.string.isRequired,
    atualizadoEm: PropTypes.string.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default OperatorModal;
