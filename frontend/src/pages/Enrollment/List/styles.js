import styled from 'styled-components';

import { Table } from '~/components/Table';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;

  max-width: 1380px;
  margin: 30px auto;
`;

export const EnrollmentTable = styled(Table)`
  thead th {
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5) {
      text-align: center;
    }
  }

  tbody td {
    &:nth-child(1) {
      width: 313.5px;
    }

    &:nth-child(2) {
      width: 191.5px;
    }

    &:nth-child(3) {
      width: 207px;
    }

    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5) {
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
