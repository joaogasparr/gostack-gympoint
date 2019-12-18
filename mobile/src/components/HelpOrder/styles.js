import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background: #fff;
  margin-bottom: 10px;
  padding: 20px;

  border: 1px solid #dddddd;
  border-radius: 4px;
`;

export const HelpHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const IconHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${props => (props.answered ? '#42CB59' : '#999999')};
  margin-left: 8px;
`;

export const TimeText = styled.Text`
  font-size: 14px;
  color: #666666;
`;

export const QuestionText = styled.Text.attrs({
  numberOfLines: 3,
})`
  min-width: 295px;
  min-height: 78px;
  font-size: 14px;
  color: #666666;
  line-height: 26px;
  margin-top: 16px;
`;
