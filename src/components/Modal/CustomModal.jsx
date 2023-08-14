import React from 'react';
import './CustomModal.scss';
const CustomModal = ({ children, visible, setVisible }) => {
  return (
    <div className={`custom-modal ${visible&&'active'}`} onClick={()=>setVisible(false)}>
      <div className='custom-modal-content' onClick={(e)=>e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default CustomModal;
