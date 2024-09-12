import React, { useState } from 'react';
import axios from 'axios';
import { operadores } from '../../API/ApiRoutes';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { MdOutlineClose } from 'react-icons/md';
import './OperadorEdit.css';
import Loading from '../Loading/Loading';
const OperadorEdit = ({ operador, closeModal, handleEditSuccess, handeEditError }) => {
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState(operador.nome);
  const [operadorEditado, setOperadorEditado] = useState(false);
  const [editError, setEditError] = useState(null);


  const editUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEditError(null); 

    try {
      await axios.put(`${operadores}/${operador.id}`, {
        nome: nome,
      });
      setOperadorEditado(true);
      handleEditSuccess()
    } catch (error) {
      setEditError('Erro ao editar o operador');
      handeEditError()
      console.error('Erro ao editar o operador:', error);
    }
    setLoading(false);
  };

  return ReactDOM.createPortal(
    <div className='modal-overlay' onClick={closeModal}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <MdOutlineClose className='modal-close' onClick={closeModal} />
        <div className='modal-body'>
          <form className='editOperadorForm' onSubmit={editUser}>
            <h2>Editar Operador</h2>
            <input
              type="text"
              id="nomeCliente"
              placeholder="Nome do cliente"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <button className="edit-button" type="submit" disabled={loading}>Editar
            </button>
            {editError && <p className='error-message'>{editError}</p>}
          </form>
        </div>
      </div>
      {loading && <Loading/>}
    </div>,
    document.body
  );
};

OperadorEdit.propTypes = {
  operador: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    criadoEm: PropTypes.string.isRequired,
    atualizadoEm: PropTypes.string.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default OperadorEdit;
