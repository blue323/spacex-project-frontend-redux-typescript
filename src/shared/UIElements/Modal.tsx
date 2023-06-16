import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './Modal.css';

type KeyboardEvent = {
    key: string;
}

type ModalType = {
    title: string, 
    onClose: () => void, 
    show: boolean
}

const Modal: React.FC<ModalType> = props => {
  const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
    if (e.key === '27') {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
    document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">{props.title}</h4>
          </div>
          <div className="modal-body">{props.children}</div>
          <div className="modal-footer">
            <button onClick={props.onClose} >
              Close
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('modal-hook') as HTMLElement
  );
};

export default Modal;