import React, { useState } from 'react';
import PropTypes from 'prop-types';

function renderSpan() {
  return (
    <span>O e-mail deve ser um e-mail válido. Exemplo: exemplo@exemplo.com</span>
  );
}

function handleEmail({ value }, setValidEmail, setEmail) {
  setValidEmail(false);
  if (/\S+@\S+\.\S+/.test(value)) {
    setValidEmail(true);
    setEmail(value);
  }
}

function EmailInput({ setEmail }) {
  const [validEmail, setValidEmail] = useState(true);

  return (
    <label htmlFor="email">
      Email
      <input
        data-testid="common_login__input-email"
        type="email"
        id="email"
        className="email"
        placeholder="exemplo@exemplo.com"
        onChange={ (e) => handleEmail(e.target, setValidEmail, setEmail) }
      />
      { !validEmail && renderSpan()}
    </label>
  );
}

export default EmailInput;

EmailInput.propTypes = {
  setEmail: PropTypes.func,
}.isRequired;
