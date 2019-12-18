import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-content: center;

  margin-top: 20px;
  padding: 0 20px;
`;

export const TextArea = styled.TextInput.attrs({
  multiline: true,
  textAlignVertical: 'top',
})`
  height: 300px;
  padding: 20px;
  margin-bottom: 20px;

  background: #fff;
  border: 1px solid #dddddd;
  border-radius: 4px;

  font-size: 16px;
  color: #999999;
  line-height: 19px;
`;
