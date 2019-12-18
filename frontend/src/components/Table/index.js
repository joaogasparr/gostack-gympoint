import styled, { css } from 'styled-components';

import Button from '~/components/Button';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  thead th {
    color: #444444;
    font-size: 16px;
    font-weight: bold;
    line-height: 19px;
  }

  tbody td {
    color: #666666;
    font-size: 16px;
    line-height: 20px;
    padding: 20px 0 16px 0;
  }

  tr + tr {
    border-top: 1px solid #eeeeee;
  }

  div {
    text-align: right;

    button {
      background: none;
      border: 0;
      font-size: 15px;
      color: #de3b3b;
    }

    a {
      > button {
        color: #4d85ee;
        margin-right: 23px;
      }
    }
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;

  span {
    font-size: 12px;
    color: #666666;
  }
`;

const FooterButton = styled(Button)`
  background: transparent;
  border: 0;
  width: 35px;
  height: 35px;
  margin-left: 7px;
  opacity: ${props => (props.limitPage ? 0.35 : 1)};

  &:hover {
    ${props =>
      props.limitPage &&
      css`
        cursor: not-allowed;
      `}
  }
`;

export { Table, Footer, FooterButton };
