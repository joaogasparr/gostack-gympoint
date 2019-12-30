import React from 'react';

import { Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function TextInput({ name, type, label, placeholder, ...rest }) {
  return (
    <Container>
      <Input
        name={name}
        type={type}
        label={label}
        placeholder={placeholder}
        {...rest}
      />
    </Container>
  );
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

TextInput.defaultProps = {
  type: '',
  label: '',
  placeholder: '',
};
