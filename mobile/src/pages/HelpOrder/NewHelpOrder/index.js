import React, { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import Background from '~/components/Background';
import Button from '~/components/Button';
import Header from '~/components/Header';
import api from '~/services/api';

import { Container, TextArea } from './styles';

export default function NewHelpOrder({ navigation }) {
  const [question, setQuestion] = useState('');

  const student = useSelector(state => state.student.student);

  async function handleSubmit() {
    try {
      await api.post(`/students/${student.id}/help-orders`, { question });

      Alert.alert('Atenção', 'Seu pedido de auxílio foi registrado', [
        {
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err) {
      Alert.alert('Atenção', err.response.data.error);
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <TextArea
          value={question}
          onChangeText={setQuestion}
          placeholder="Inclua seu pedido de auxílio"
          placeholderTextColor="#999999"
        />
        <Button onPress={handleSubmit}>Enviar pedido</Button>
      </Container>
    </Background>
  );
}

NewHelpOrder.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ListHelpOrder');
      }}>
      <Icon name="chevron-left" size={20} color="#000000" />
    </TouchableOpacity>
  ),
});

NewHelpOrder.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
