import styled from 'styled-components';

import { Table } from '~/components/Table';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;

  max-width: 900px;
  margin: 30px auto;
`;

export const PlanTable = styled(Table)`
  thead th {
    &:nth-child(2),
    &:nth-child(3) {
      text-align: center;
    }
  }

  tbody td {
    &:nth-child(1) {
      width: 347px;
    }

    &:nth-child(2) {
      width: 200px;
    }

    &:nth-child(2),
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
