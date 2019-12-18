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

export const Content = styled.View`
  background: #fff;
  margin-bottom: 10px;
  padding: 15px 20px;

  border: 1px solid #dddddd;
  border-radius: 4px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CheckInText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
  color: #444444;
`;

export const CheckInTime = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: #666666;
`;
