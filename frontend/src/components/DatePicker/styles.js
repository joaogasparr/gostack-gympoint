import styled from 'styled-components';

export const Container = styled.div`
  label {
    display: flex;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 7px;
  }

  span {
    font-size: 12px;
    color: #f64c75;
    align-self: flex-start;
    font-weight: bold;
    margin-bottom: 5px;
  }
`;

export const ContentPicker = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 198px;
  height: 45px;
  margin-bottom: 10px;

  background: ${props => (props.calculated ? '#F5F5F5' : '#FFF')};
  border: 1px solid #dddddd;
  border-radius: 4px;

  svg {
    width: 50px;
    margin-left: 33px;
    margin-right: 5px;
  }

  input {
    background: ${props => (props.calculated ? '#F5F5F5' : '#FFF')};
    border: 0;
    color: #999999;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    margin-left: 10px;
    color: #666666;
  }
`;
