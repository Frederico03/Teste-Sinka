import React, { useState } from 'react';
import axios from 'axios';
import { operadores } from '../../API/ApiRoutes';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { MdOutlineClose } from 'react-icons/md';
import './OperadorDelete.css';
import loadingGif from "../../assets/media/loading.gif"

const OperadorDelete = ({ operador, closeModal, handleDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [operadorDeletado, setOperadorDeletado] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const deleteUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDeleteError(null); 

    try {
      console.log(operador.id)
      await axios.delete(`${operadores}/${operador.id}`);
      setOperadorDeletado(true);
      handleDeleteSuccess()
    } catch (error) {
      setDeleteError('Erro ao deletar o operador');
      console.error('Erro ao deletar o operador:', error);
    }
    setLoading(false);
  };

  return ReactDOM.createPortal(
    <div className='modal-overlay' onClick={closeModal}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <MdOutlineClose className='modal-close' onClick={closeModal} />
        <div className='modal-body'>
          {loading ? (
            <div className="loading-overlay">
              <img src={loadingGif} alt="Carregando..." className="loading-gif" />
            </div>
          ) : (
            <>
              {operadorDeletado ? (
                <div className='success-message'>
                  <p>Operador deletado com sucesso!</p>
                  <button className="delete-button" onClick={closeModal}>
                    Fechar
                  </button>
                </div>
              ) : (
                <form className='deleteOperadorForm' onSubmit={deleteUser}>
                  <h2>Tem certeza que quer deletar o operador?</h2>
                  <h3>{operador.nome}</h3>
                  <button className="delete-button" type="submit" disabled={loading}>Deletar
                  </button>
                  {deleteError && <p className='error-message'>{deleteError}</p>}
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

OperadorDelete.propTypes = {
  operador: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default OperadorDelete;
