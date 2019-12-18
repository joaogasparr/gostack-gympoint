import styled from 'styled-components';

import { Table } from '~/components/Table';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;

  max-width: 1200px;
  margin: 30px auto;
`;

export const StudentTable = styled(Table)`
  thead th {
    &:nth-child(3) {
      text-align: center;
    }
  }

  tbody td {
    &:nth-child(1) {
      width: 423px;
    }
    &:nth-child(2) {
      width: 326px;
    }
    &:nth-child(3) {
      text-align: center;
    }
  }
`;

export const ShimmerLine = styled.div`
  width: 80%;
  height: 20px;
  align-self: center;
  border-radius: 8px;
`;
