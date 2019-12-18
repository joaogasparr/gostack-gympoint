import styled from 'styled-components';

export const Container = styled.div`
  label {
    display: flex;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 7px;
  }

  & > div > div:nth-child(1),
  & > div > div:nth-child(2) {
    width: 100%;
    height: 45px;
    padding: 0 15px;
    color: #666666;
    background: #fff;
    border: 1px solid #dddddd;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  span {
    font-size: 12px;
    color: #f64c75;
    align-self: flex-start;
    font-weight: bold;
    margin-bottom: 5px;
  }
`;
