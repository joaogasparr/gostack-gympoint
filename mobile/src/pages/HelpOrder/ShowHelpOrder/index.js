import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';

import {
  Container,
  Content,
  HeaderQuestion,
  QuestionTitle,
  QuestionTime,
  QuestionText,
  AnswerTitle,
  AnswerText,
} from './styles';

export default function ShowHelpOrder({ navigation }) {
  const helpOrder = navigation.getParam('data');

  return (
    <Background>
      <Header />
      <Container>
        <Content>
          <HeaderQuestion>
            <QuestionTitle>PERGUNTA</QuestionTitle>
            <QuestionTime>{helpOrder.dateFormatted}</QuestionTime>
          </HeaderQuestion>
          <QuestionText>{helpOrder.question}</QuestionText>
          <AnswerTitle>RESPOSTA</AnswerTitle>
          <AnswerText>{helpOrder.answer}</AnswerText>
        </Content>
      </Container>
    </Background>
  );
}

ShowHelpOrder.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ListHelpOrder');
      }}>
      <Icon name="chevron-left" size={20} color="#000000" />
    </TouchableOpacity>
  ),
});

ShowHelpOrder.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
