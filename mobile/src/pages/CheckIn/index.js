import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { useSelector } from 'react-redux';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Button from '~/components/Button';

import { Container, List, Content, CheckInText, CheckInTime } from './styles';

export default function CheckIn() {
  const [checkins, setCheckIns] = useState([]);
  const [loading, setLoading] = useState(false);

  const student = useSelector(state => state.student.student);

  function formatDate(value) {
    return formatRelative(parseISO(value), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }

  useEffect(() => {
    async function loadCheckIns() {
      try {
        setLoading(true);

        const response = await api.get(`students/${student.id}/checkins`);

        const data = response.data.map(checkin => ({
          ...checkin,
          dateFormatted: formatDate(checkin.created_at),
        }));

        setCheckIns(data);
      } catch (err) {
        Alert.alert('Atenção', err.response.data.error);
      } finally {
        setLoading(false);
      }
    }

    loadCheckIns();
  }, []);

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
          keyExtractor={item => String(item.id)}
          renderItem={({ item, index }) => (
            <Content>
              {loading ? (
                <>
                  <ShimmerPlaceHolder autoRun={true} />
                  <ShimmerPlaceHolder autoRun={true} width={74} />
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
