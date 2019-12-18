import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  strong {
    font-size: 24px;
    font-weight: bold;
    line-height: 28px;
  }
`;

export const Content = styled.div`
  display: flex;

  button {
    height: 36px;
    width: 142px;
    margin-left: 16px;
    margin-right: ${props => (props.search ? 16 : 0)}px;
  }
`;

export const SearchInput = styled.div`
  display: flex;
  align-items: center;

  height: 36px;
  width: 237px;

  background: #fff;
  border: 1px solid #dddddd;
  border-radius: 4px;

  svg {
    margin-left: 10px;
  }

  input {
    border: 0;
    color: #999999;
    width: 100%;
    height: 100%;
    padding: 0 10px;
  }
`;
