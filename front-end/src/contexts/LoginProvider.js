import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const senhaLength = 5;
    if (/\S+@\S+\.\S+/.test(email) && password.length > senhaLength) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [email, password]);

  const contextUser = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
    valid,
  }), [email, password, valid]);

  return (
    <LoginContext.Provider value={ contextUser }>
      { children }
    </LoginContext.Provider>
  );
}

export default LoginProvider;

LoginProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
