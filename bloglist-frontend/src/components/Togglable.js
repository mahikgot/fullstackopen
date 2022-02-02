import React, { useState }  from 'react'

const Togglable = ({visibleLabel, hiddenLabel, up, children}) => {
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

  const positioner = (up) => {
    if (up) {
      return (
        <>
          <button onClick={onClickHandler}>
            {labelHandler()}
          </button>
          <span style={{display: visible}}>
            {children}
          </span>
        </>
      )
    }
    else {
      return (
        <>
            <span style={{display: visible}}>
              {children}
            </span>
            <button onClick={onClickHandler}>
              {labelHandler()}
            </button>
        </>
      )
    }
  }

  return (
    <>
      {positioner(up)}
    </>
  )
}
export default Togglable
