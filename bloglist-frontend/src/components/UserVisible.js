import React from 'react'

const UserVisible = ({user, children}) => {
  const show = { display: user.token ? '' : 'none' };
  return (
    <div style={show}>
      {children}
    </div>
  );
}

export default UserVisible
