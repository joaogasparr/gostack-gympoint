import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import ReactDatePicker from 'react-datepicker';
import MaskedTextInput from 'react-text-mask';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { Container, ContentPicker } from './styles';

export default function DatePicker({
  name,
  label,
  disabled,
  calculated,
  onChange,
  value,
  ...rest
}) {
  const ref = useRef();
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [date, setDate] = useState(defaultValue);

  useEffect(() => {
    if (!value || value != 'Invalid Date') {
      setDate(value);
    }
  }, [value]);

  useEffect(() => {
    setDate(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]);

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <ContentPicker calculated={calculated}>
        <ReactDatePicker
          id={fieldName}
          name={fieldName}
          disabled={disabled}
          autoComplete="off"
          selected={date}
          customInput={
            <MaskedTextInput
              mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            />
          }
          onChange={date => {
            setDate(date);
            onChange(date);
          }}
          dateFormat="dd/MM/yyyy"
          ref={ref}
          {...rest}
        />
        {!calculated && <MdKeyboardArrowDown size={20} color="#CCCCCC" />}
      </ContentPicker>
      {error && <span>{error}</span>}
    </Container>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.any,
};

DatePicker.defaultProps = {
  label: '',
  disabled: false,
  onChange: null,
  value: null,
};
