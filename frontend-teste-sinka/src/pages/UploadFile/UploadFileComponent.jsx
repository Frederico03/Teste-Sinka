import React, { useState, useRef } from 'react';
import { MdCloudUpload, MdFilePresent, MdDelete, MdHome } from "react-icons/md";
import './UploadFileComponent.css';
import axios from 'axios';
import { clientes } from '../../API/ApiRoutes';
import { Link } from 'react-router-dom'

const UploadFileComponent = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Nenhum arquivo selecionado");
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleUpload = async (e) => {
    if (!file) {
      alert("Selecione um arquivo primeiro.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(clientes, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response)
      alert('Upload realizado com sucesso!');
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Falha no upload, tente novamente.');
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <h2>Upload CSV</h2>
      </div>
      <form className='uploadFiles' onClick={() => document.querySelector(".input-field").click()}>
        <input 
          type='file' 
          accept='.csv' 
          className='input-field' 
          hidden 
          onChange={handleFileChange} 
          ref={inputRef}
        />
        {file ? (
          <MdFilePresent size={60} color='green'/>
        ) : (
          <MdCloudUpload color='green' size={60} />
        )}
        <p>Busque Arquivos para anexo</p>
      </form>
      <section className='uploaded-row'>
        <span className='uploaded-content'>
          {fileName}
          <MdDelete onClick={() => {
            setFileName("Nenhum arquivo anexado")
            setFile(null)
            inputRef.current.value = null;
          }}/>
        </span>
      </section>

      <button className="sucess-button" type="button" onClick={handleUpload}>Fazer Upload
      </button>
      <Link to="/" className='back'>
        <MdHome size={30} color="black" />
      </Link>
    </div>
  );
};

export default UploadFileComponent;
