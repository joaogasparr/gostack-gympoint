import React from 'react';
import { MdSearch } from 'react-icons/md';

import PropTypes from 'prop-types';

import { Wrapper, Content, SearchInput } from './styles';

export default function Title({ text, search, onChange, children }) {
  return (
    <Wrapper>
      <strong>{text}</strong>
      <Content search={search}>
        {children}
        {search && (
          <SearchInput>
            <MdSearch size={20} color="#999999" />
            <input
              name="search"
              type="text"
              placeholder="Buscar aluno"
              onChange={onChange}
            />
          </SearchInput>
        )}
      </Content>
    </Wrapper>
  );
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
  search: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.element.isRequired,
};

Title.defaultProps = {
  search: false,
  onChange: null,
};
