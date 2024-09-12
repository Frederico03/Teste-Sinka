import React from 'react';
import ReactDOM from 'react-dom' 
import '../../App.css'; 
import loadingGif from "../../assets/media/loading.gif"

const Loading = () => {
  return ReactDOM.createPortal(
    <div className="loading-overlay">
      <img src={loadingGif} alt="Carregando..." className="loading-gif" />
    </div>,
    document.body
  );
};

export default Loading;
