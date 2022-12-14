import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RegisterContext from './RegisterContext';

function RegisterProvider({ children }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [valid, setValid] = useState(false);

  const MIN_LENGTH_NAME = 12;
  useEffect(() => {
    const senhaLength = 5;
    if (/\S+@\S+\.\S+/.test(email) && password.length > senhaLength) {
      if (name.length > MIN_LENGTH_NAME) {
        setValid(true);
      }
    } else {
      setValid(false);
    }
  }, [email, name, password]);

  const contextUser = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    role,
    setRole,
    valid,

  }), [email, name, password, role, valid]);

  return (
    <RegisterContext.Provider value={ contextUser }>
      { children }
    </RegisterContext.Provider>
  );
}

export default RegisterProvider;

RegisterProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
