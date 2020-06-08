import React from 'react';

const buttonComp = ({ activeBtn, onClickBtn, text }) => {
  return(
    <div
    onClick={onClickBtn}
    style={{
      display: 'flex', justifyContent: 'center', margin: '30px 0', width: '100%', padding: '10px 0',
      backgroundColor: (activeBtn) ? '#627141' : '#f2f2f2', color: (activeBtn) ? '#fff' : '#333', transition: '.3s'
    }}>
      {text}
    </div>
  )
}

export default buttonComp;