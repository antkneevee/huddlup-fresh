import React from 'react';
import ReactDOM from 'react-dom';

const ModalPortal = ({ children }) => ReactDOM.createPortal(children, document.body);

export default ModalPortal;
