import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    display: flex;
    font-size: 14px;
    font-weight: bold;
    line-height: 16px;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    height: 45px;
    padding: 0 15px;
    color: #999999;
    background: #fff;
    border: 1px solid #dddddd;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  span {
    font-size: 12px;
    font-weight: bold;
    color: #f64c75;

    align-self: flex-start;
  }
`;
