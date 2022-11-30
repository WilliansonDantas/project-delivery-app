import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';

function UserProvider({ children }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [verifyPassword, setVerifyPassword] = useState();
  const [image, setImage] = useState('');
  const [verifiedPassword, setVerifiedPassword] = useState(true);

  const contextUser = useMemo(() => ({
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    verifyPassword,
    setVerifyPassword,
    image,
    setImage,
    verifiedPassword,
    setVerifiedPassword,
  }), [name, email, password, verifyPassword, image, verifiedPassword]);

  return (
    <UserContext.Provider value={ contextUser }>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

UserProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
