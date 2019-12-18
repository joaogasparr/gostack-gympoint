import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-content: center;

  margin-top: 20px;
  padding: 0 20px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { marginTop: 20 },
})``;
