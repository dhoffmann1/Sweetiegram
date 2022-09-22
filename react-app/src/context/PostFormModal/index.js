import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../Modal.css';
import { ModalContext } from '../Modal';
import "./PostFormModal.css"
// const ModalContext = React.createContext();

export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" style={{zIndex:'150'}} onClick={onClose} className='post-form-modal-background'/>
      <div id="modal-content" style={{zIndex:'200'}} className='post-form-modal-content'>
        {children}
      </div>
    </div>
    ,
    modalNode
  );
}
