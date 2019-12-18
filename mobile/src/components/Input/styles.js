import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  height: 45px;
  padding: 0 15px;

  border: 1px solid #dddddd;
  border-radius: 4px;

  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  flex: 1;
  font-size: 16px;
  margin-left: 10px;
  color: #999999;
`;
