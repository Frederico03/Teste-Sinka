import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { operadores } from '../../API/ApiRoutes'
import axios from 'axios'
import Pagination from '../../components/PaginateOperadores/PaginateOperadores'
import './GetOperadores.css'
import { MdHome, MdEdit, MdDelete } from 'react-icons/md';
import OperadorClientes from '../../components/OperadorClientes/OperadorClientes'
import OperadorEdit from '../../components/OperadorEdit/OperadorEdit'
import OperadorDelete from '../../components/OperadorDelete/OperadorDelete'
import loadingGif from "../../assets/media/loading.gif"

const ITEMS_PER_PAGE = 5;

function GetOperedores() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalItems, setTotalItems] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [editOperador, setEditOperador] = useState(null);
  const [deleteOperador, setDeleteOperador] = useState(null);

  const fetchData = async () => { 
    setLoading(true);
    try {
      const response = await axios.get(operadores);
      const items = response.data.map(item => ({
        id: item._id,
        nome: item.props.nome,
        criadoEm: item.props.criado_em,
        atualizadoEm: item.props.atualizado_em,
      }));

      setData(items);
      setTotalItems(response.data.length)
    } catch (error) {
      console.error("Erro ao carregar os dados:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const currentItems = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handleModalOpen = (operador) => {
    setModalOpen(true);
    setSelectedOperator(operador);
  };

  const handleEdit = (operador) => {
    setModalOpen(true);
    setEditOperador(operador);
  };

  const handleDelete = (operadorId) => {
    setModalOpen(true);
    setDeleteOperador(operadorId);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedOperator(null);
    setDeleteOperador(null);
    setEditOperador(null);
  };

  const handleEditSuccess = () => {
    closeModal();
    fetchData();
  };

  const handleDeleteSuccess = () => {
    closeModal();
    fetchData();
  };

  return (
    <div className='container'>
      <div className='header'>
        <h2>Operadores</h2>
      </div>
      {loading ? (
        <div className="loading-overlay">
          <img src={loadingGif} alt="Carregando..." className="loading-gif" />
        </div>
      ) : (
        <ul className='list-operadores'>
          {currentItems.map(item => (
            <li key={item.id}>
            <h2 onClick={() => handleModalOpen(item)}>{item.nome}</h2>
            <div className="icon-group">
              <MdEdit className="icon edit" size={20} onClick={(e) => { e.stopPropagation(); handleEdit(item); }} />
              <MdDelete className="icon delete" size={20} onClick={(e) => { e.stopPropagation(); handleDelete(item); }} />
            </div>
          </li>
          ))}
        </ul>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={setCurrentPage}
      />

      <Link to="/" className='back'>
        <MdHome size={30} color="black" />
      </Link>

      {modalOpen && selectedOperator && (
        <OperadorClientes operador={selectedOperator} closeModal={closeModal} />
      )}
      {modalOpen && editOperador && (
        <OperadorEdit operador={editOperador} closeModal={closeModal} handleEditSuccess={handleEditSuccess}/>
      )}
      {modalOpen && deleteOperador && (
        <OperadorDelete operador={deleteOperador} closeModal={closeModal} handleDeleteSuccess={handleDeleteSuccess}/>
      )}
    </div>
  );
}

export default GetOperedores