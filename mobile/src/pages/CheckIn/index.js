import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Background from '~/components/Background';
import Button from '~/components/Button';
import Header from '~/components/Header';
import api from '~/services/api';

import { Container, List, Content, CheckInText, CheckInTime } from './styles';

export default function CheckIn() {
  const [checkins, setCheckIns] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(true);

  const student = useSelector(state => state.student.student);

  function formatDate(value) {
    return formatRelative(parseISO(value), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }

  async function loadCheckIns(pagination = 1, refresh = false) {
    try {
      if (loadMore || refresh) {
        setLoading(true);

        if (refresh) {
          setRefreshing(true);
          setLoadMore(true);
          setCheckIns([]);
        }

        const response = await api.get(`students/${student.id}/checkins`, {
          params: {
            page: pagination,
          },
        });

        if (!response.data.length) {
          setLoadMore(false);
        }

        const dataFormatted = response.data.map(checkin => ({
          ...checkin,
          dateFormatted: formatDate(checkin.created_at),
        }));

        const data =
          pagination >= 2 ? [...checkins, ...dataFormatted] : dataFormatted;

        setCheckIns(data);
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
    loadCheckIns();
  }, []);

  function handleLoadMore() {
    if (loadMore && !refreshing) {
      const nextPage = page + 1;
      loadCheckIns(nextPage);
    }
  }

  async function handleSubmit() {
    try {
      const response = await api.post(`students/${student.id}/checkins`);

      const data = [
        ...checkins,
        {
          ...response.data,
          dateFormatted: formatDate(response.data.createdAt),
        },
      ];

      setCheckIns(data);
    } catch (err) {
      Alert.alert('Atenção', err.response.data.error);
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <Button onPress={handleSubmit}>Novo check-in</Button>

        <List
          data={checkins}
          onRefresh={() => loadCheckIns(1, true)}
          refreshing={refreshing}
          onEndReachedThreshold={0.2}
          onEndReached={handleLoadMore}
          keyExtractor={item => String(item.id)}
          renderItem={({ item, index }) => (
            <Content>
              {loading ? (
                <>
                  <ShimmerPlaceHolder autoRun />
                  <ShimmerPlaceHolder autoRun width={74} />
                </>
              ) : (
                <>
                  <CheckInText>Check-in #{checkins.length - index}</CheckInText>
                  <CheckInTime>{item.dateFormatted}</CheckInTime>
                </>
              )}
            </Content>
          )}
        />
      </Container>
    </Background>
  );
}

CheckIn.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};
