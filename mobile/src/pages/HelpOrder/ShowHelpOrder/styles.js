import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-content: center;

  margin-top: 20px;
  padding: 0 20px;
`;

export const Content = styled.View`
  background: #fff;
  height: 400px;
  padding: 20px;

  border: 1px solid #dddddd;
  border-radius: 4px;
`;

export const HeaderQuestion = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const QuestionTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444444;
  line-height: 16px;
`;

export const QuestionTime = styled.Text`
  margin-bottom: 16px;

  font-size: 14px;
  color: #666666;
  line-height: 16px;
`;

export const QuestionText = styled.Text`
  min-width: 295px;
  min-height: 156px;
  font-size: 14px;
  color: #666666;
  line-height: 26px;
`;

export const AnswerTitle = styled.Text`
  margin-top: 20px;
  margin-bottom: 16px;

  font-size: 14px;
  font-weight: bold;
  color: #444444;
  line-height: 16px;
`;

export const AnswerText = styled.Text`
  min-width: 295px;
  min-height: 78px;
  font-size: 14px;
  color: #666666;
  line-height: 26px;
`;
