import { darken } from 'polished';
import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  disabled: props.loading ? props.loading : props.limitPage,
}))`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 45px;
  border: 0;
  border-radius: 4px;
  background: ${props => props.color};
  transition: background 0.2s;

  &:hover {
    background: ${props => darken(0.03, props.color)};
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}

  span {
    font-size: 14px;
    font-weight: bold;
    line-height: 16px;
    color: #fff;
  }

  div {
    display: flex;
    flex-direction: row;

    margin-right: 10px;
  }
`;
