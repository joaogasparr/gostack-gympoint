import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import socketio from 'socket.io-client';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Button from '~/components/Button';
import HelpOrder from '~/components/HelpOrder';

import { Container, List } from './styles';

function ListHelpOrder({ navigation, isFocused }) {
  const [helporders, setHelpOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const student = useSelector(state => state.student.student);

  const socket = useMemo(
    () =>
      socketio('http://localhost:3333', {
        query: {
          user_id: student.id,
        },
      }),
    [student.id],
  );

  useEffect(() => {
    socket.on('answer', answer => {
      const helporder = helporders.filter(help => help.id !== answer.id);
      setHelpOrders([...helporder, answer]);
    });
  }, [socket, helporders]);

  useEffect(() => {
    async function loadHelpOrders() {
      try {
        setLoading(true);

        const response = await api.get(`students/${student.id}/help-orders`);

        const data = response.data.map(helporder => ({
          ...helporder,
          dateFormatted: formatRelative(
            parseISO(
              !!helporder.answer ? helporder.answer_at : helporder.created_at,
            ),
            new Date(),
            {
              locale: pt,
              addSuffix: true,
            },
          ),
        }));

        setHelpOrders(data);
      } catch (err) {
        Alert.alert('Atenção', err.response.data.error);
      } finally {
        setLoading(false);
      }
    }

    loadHelpOrders();
  }, [isFocused]);

  function handleOnPress(data) {
    navigation.navigate('ShowHelpOrder', { data });
  }

  return (
    <Background>
      <Header />
      <Container>
        <Button onPress={() => navigation.navigate('NewHelpOrder')}>
          Novo pedido de auxílio
        </Button>
        <List
          data={helporders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <HelpOrder
              data={item}
              loading={loading}
              onPress={() => handleOnPress(item)}
            />
          )}
        />
      </Container>
    </Background>
  );
}

ListHelpOrder.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(ListHelpOrder);
