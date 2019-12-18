import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import CurrencyInput from 'react-number-format';

import { Container } from './styles';

export default function NumberFormat({
  name,
  label,
  onChange,
  calculated,
  ...rest
}) {
  const ref = useRef();
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
    });
  }, [ref.current, fieldName]);

  return (
    <Container calculated={calculated}>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <CurrencyInput
        name={fieldName}
        prefix={'R$'}
        teste={true}
        defaultValue={defaultValue}
        value={value}
        onValueChange={({ value }) => onChange(value)}
        thousandSeparator={true}
        decimalScale={2}
        fixedDecimalScale={true}
        ref={ref}
        disabled={calculated}
        {...rest}
      />
      {error && <span>{error}</span>}
    </Container>
  );
}

NumberFormat.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

NumberFormat.defaultProps = {
  label: '',
  onChange: null,
};
