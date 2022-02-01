import React from 'react'

const UserHidden = ({user, children}) => {
  const show = { display: user.token ? 'none' : '' };
  return (
    <div style={show}>
      {children}
    </div>
  );
}

export default UserHidden
