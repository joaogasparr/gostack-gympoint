import React from 'react';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';

import {
  Container,
  HelpHeader,
  IconText,
  IconHeader,
  TimeText,
  QuestionText,
} from './styles';

export default function HelpOrder({ data, loading, onPress }) {
  return (
    <Container disabled={loading} onPress={onPress}>
      {loading ? (
        <>
          <HelpHeader>
            <IconHeader>
              <ShimmerPlaceHolder autoRun />
            </IconHeader>
            <ShimmerPlaceHolder autoRun width={74} />
          </HelpHeader>
          <ShimmerPlaceHolder
            autoRun
            width={295}
            height={78}
            style={{ marginTop: 16 }}
          />
        </>
      ) : (
        <>
          <HelpHeader>
            <IconHeader>
              <Icon
                name="check-circle"
                size={16}
                color={data.answer ? '#42CB59' : '#999999'}
              />
              <IconText answered={!!data.answer}>
                {data.answer ? 'Respondido' : 'Sem resposta'}
              </IconText>
            </IconHeader>
            <TimeText>{data.dateFormatted}</TimeText>
          </HelpHeader>
          <QuestionText>{data.question}</QuestionText>
        </>
      )}
    </Container>
  );
}

HelpOrder.propTypes = {
  data: PropTypes.oneOfType[(PropTypes.array, PropTypes.element)].isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
