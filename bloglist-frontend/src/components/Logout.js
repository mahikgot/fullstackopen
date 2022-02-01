import React from 'react'

const Logout = ({user, setUser}) => {
  const onClickHandler = ({setUser, e}) => {
    e.preventDefault();
    window.localStorage.removeItem('user');
    setUser({});
  };

  return (
    <div>
      {user.username}
      <button onClick={(e) => onClickHandler({setUser, e})}>
        logout
      </button>
    </div>

  );
}

export default Logout
