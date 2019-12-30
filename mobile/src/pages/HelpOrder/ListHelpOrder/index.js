import React, { useState, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
import { APP_URL } from 'react-native-dotenv';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';

import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import socketio from 'socket.io-client';

import Background from '~/components/Background';
import Button from '~/components/Button';
import Header from '~/components/Header';
import HelpOrder from '~/components/HelpOrder';
import api from '~/services/api';

import { Container, List } from './styles';

function ListHelpOrder({ navigation, isFocused }) {
  const [helporders, setHelpOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(true);

  const student = useSelector(state => state.student.student);

  const socket = useMemo(
    () =>
      socketio(APP_URL, {
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

  async function loadHelpOrders(pagination = 1, refresh = false) {
    try {
      if (loadMore || refresh) {
        setLoading(true);

        if (refresh) {
          setRefreshing(true);
          setLoadMore(true);
          setHelpOrders([]);
        }

        const response = await api.get(`students/${student.id}/help-orders`, {
          params: {
            page: pagination,
          },
        });

        if (!response.data.length) {
          setLoadMore(false);
        }

        const dataFormatted = response.data.map(helporder => ({
          ...helporder,
          dateFormatted: formatRelative(
            parseISO(
              helporder.answer ? helporder.answer_at : helporder.created_at,
            ),
            new Date(),
            {
              locale: pt,
              addSuffix: true,
            },
          ),
        }));

        const data =
          pagination >= 2 ? [...helporders, ...dataFormatted] : dataFormatted;

        setHelpOrders(data);
        setPage(pagination);
      }
    } catch (err) {
      Alert.alert('Atenção', err.response.data.error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadHelpOrders(1, true);
  }, [isFocused]);

  async function handleLoadMore() {
    if (loadMore && !refreshing) {
      const nextPage = page + 1;
      await loadHelpOrders(nextPage);
    }
  }

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
          onRefresh={() => loadHelpOrders(1, true)}
          refreshing={refreshing}
          onEndReachedThreshold={0.2}
          onEndReached={handleLoadMore}
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
