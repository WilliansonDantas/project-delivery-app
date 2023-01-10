import React from 'react';
import PropTypes from 'prop-types';

function EmailInput({ setEmail }) {
  return (
    <label htmlFor="email">
      Email:
      <input
        data-testid="common_login__input-email"
        type="email"
        id="email"
        className="email w-full block bg-black rounded p-2 text-white"
        placeholder="exemplo@exemplo.com"
        onChange={ (e) => setEmail(e.target.value) }
      />
    </label>
  );
}

export default EmailInput;

EmailInput.propTypes = {
  setEmail: PropTypes.func,
}.isRequired;
