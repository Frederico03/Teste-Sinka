import React, { useState, useRef } from 'react';
import { MdCloudUpload, MdFilePresent, MdDelete, MdHome } from "react-icons/md";
import './UploadFileComponent.css';
import axios from 'axios';
import { clientes } from '../../API/ApiRoutes';
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading/Loading';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadFileComponent = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Nenhum arquivo selecionado");
  const [loading, setLoading] = useState(null);
  const inputRef = useRef(null);

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleUpload = async (e) => {
    setLoading(true)
    if (!file) {
      setLoading(false)
      toast.error("Faça o upload de um arquivo!", toastOptions)
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
      toast.success("Upload feito com sucesso!", toastOptions)
    } catch (error) {
      console.error('Erro no upload:', error);
      toast.error("Erro no upload de arquivo!", toastOptions)
    }
    setLoading(false)
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
      
      {loading && <Loading/>}
      <Link to="/" className='back'>
        <MdHome size={30} color="black" />
      </Link>
      <ToastContainer/>
    </div>
  );
};

export default UploadFileComponent;
