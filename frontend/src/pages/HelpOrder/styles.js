import ReactModal from 'react-modal';

import { Form, Textarea } from '@rocketseat/unform';
import styled from 'styled-components';

import { Table } from '~/components/Table';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;

  max-width: 700px;
  margin: 30px auto;
`;

export const HelpOrderTable = styled(Table)`
  div {
    button {
      color: #4d85ee;
    }
  }
`;

const customStyles = {
  overlay: { background: 'rgba(0, 0, 0, 0.7)' },
};

export const AnswerModal = styled(ReactModal).attrs({
  style: customStyles,
})`
  display: flex;
  flex-direction: column;

  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;

  width: 450px;
  height: 425px;
  padding: 30px;
  margin-right: -50%;

  background: #ffffff;
  border: 1px solid #979797;
  border-radius: 4px;

  transform: translate(-50%, -50%);

  strong {
    font-size: 14px;
    font-weight: bold;
    line-height: 16px;
  }

  small {
    font-size: 16px;
    min-height: 104px;
    color: #666666;
    line-height: 26px;
    margin-top: 8px;
  }

  z-index: 99999;
`;

export const FormAnswer = styled(Form)`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    display: flex;
    font-size: 14px;
    font-weight: bold;
    line-height: 16px;
    margin-bottom: 8px;
  }

  button {
    margin-top: 21px;

    span {
      font-size: 16px;
      line-height: 19px;
    }
  }
`;

export const TextAnswer = styled(Textarea)`
  width: 100%;
  height: 127px;
  padding: 13px 15px;
  color: #999999;
  background: #fff;
  border: 1px solid #dddddd;
  border-radius: 4px;

  font-size: 16px;
  line-height: 19px;
`;
