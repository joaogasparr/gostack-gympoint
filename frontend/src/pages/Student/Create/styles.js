import styled from 'styled-components';

import ContentWrapper from '~/components/Content';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;

  max-width: 900px;
  margin: 30px auto;
`;

export const Content = styled(ContentWrapper)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 20px;

  div:nth-child(1),
  div:nth-child(2) {
    grid-column: 1 / 4;
  }

  input {
    margin-bottom: 10px;
  }
`;
