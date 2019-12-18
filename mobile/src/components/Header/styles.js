import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { ifIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.SafeAreaView`
  background: #fff;
  height: ${Platform.OS === 'ios'
    ? getStatusBarHeight() + ifIphoneX(64, 44)
    : 54}px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  width: 116px;
  height: 18px;
`;
