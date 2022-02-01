import React, { useState }  from 'react'

const Togglable = ({visibleLabel, hiddenLabel, children}) => {
  const [visible, setVisible] = useState('none');

  const onClickHandler = () => {
    if (visible) {
      setVisible('');
    }
    else {
      setVisible('none');
    }
  };

  const labelHandler = () => {
    if (visible) {
      return visibleLabel;
    }
    else {
      return hiddenLabel;
    }
  };

  return (
    <div>
      <div style={{display: visible}}>
        {children}
      </div>
      <button onClick={onClickHandler}>
        {labelHandler()}
      </button>
    </div>
  )
}
export default Togglable
