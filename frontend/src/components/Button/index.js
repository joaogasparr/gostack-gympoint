import React from 'react';

import PropTypes from 'prop-types';

import { SubmitButton } from './styles';

export default function Button({ icon, text, ...rest }) {
  return (
    <SubmitButton {...rest}>
      {icon && <div>{icon}</div>}
      <span>{text}</span>
    </SubmitButton>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

Button.defaultProps = {
  text: '',
  icon: null,
};
