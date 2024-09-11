import React, { useState } from 'react';
import './MainPage.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import { clientes } from '../../API/ApiRoutes';


const MainPage = () => {
  const [isOperadoresOpen, setIsOperadoresOpen] = useState(false);
  const [isArquivoOpen, setIsArquivoOpen] = useState(false);

  const handleExport = async () => {
    try {
      const response = await axios.get(clientes, {
        responseType: 'blob', 
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'clientes.csv'); 
      document.body.appendChild(link);
      
      link.click();
      
      link.remove();
      
      alert('Export realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao exportar o CSV:', error);
      alert('Falha no export, tente novamente.');
    }
  }

  return (
    <div className='container'>
      <div className="header">
        <h2>SINKA TESTE</h2>
      </div>
      <div className="dropdown">
        <div className="dropdown-header" onClick={() => setIsOperadoresOpen(!isOperadoresOpen)}>
          <span>Operadores</span>
          <i className={`fa fa-chevron-${isOperadoresOpen ? 'up' : 'down'}`} aria-hidden="true"></i>
        </div>
        <ul className={`dropdown-list ${isOperadoresOpen ? 'open' : ''}`}> 
            <li key='Create'><Link to='/AddOperedores'>Adicionar Operador</Link></li>
            <li key='Get'><Link to='/GetOperadores'>Buscar Operadores</Link></li>
        </ul>
      </div>
      <div className="dropdown">
        <div className="dropdown-header" onClick={() => setIsArquivoOpen(!isArquivoOpen)}>
          <span>Clientes</span>
          <i className={`fa fa-chevron-${isArquivoOpen ? 'up' : 'down'}`} aria-hidden="true"></i>
        </div>
        <ul className={`dropdown-list ${isArquivoOpen ? 'open' : ''}`}> 
          <li key='Create'><Link to='/UploadCSV'>Upload CSV - Clientes</Link></li>
          <li key='Get' onClick={handleExport}>Exportar CSV - Clientes</li>
        </ul>
      </div>
    </div>
  );
}

export default MainPage;
