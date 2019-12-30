import React, { useState, useEffect, useRef } from 'react';
import CurrencyInput from 'react-number-format';

import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

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
        prefix="R$"
        defaultValue={defaultValue}
        value={value}
        onValueChange={({ value }) => onChange(value)}
        thousandSeparator
        decimalScale={2}
        fixedDecimalScale
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
  calculated: PropTypes.bool,
  onChange: PropTypes.func,
};

NumberFormat.defaultProps = {
  label: '',
  calculated: false,
  onChange: null,
};
