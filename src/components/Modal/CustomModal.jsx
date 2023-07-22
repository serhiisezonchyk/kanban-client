import React from 'react';
import style from './CustomModal.module.css';
const CustomModal = ({ children, visible, setVisible }) => {
  const modalClasses = [style.customModal];
    if (visible) {
        modalClasses.push(style.active)
  }
  return (
    <div className={modalClasses.join(' ')} onClick={()=>setVisible(false)}>
      <div className={style.customModalContent} onClick={(e)=>e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default CustomModal;
