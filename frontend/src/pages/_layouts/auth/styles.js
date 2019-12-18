import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: #f1556e;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  max-width: 360px;
  width: 100%;
  height: 448px;

  background: #fff;
  border: 1px solid #979797;
  border-radius: 4px;
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.3);
  padding: 50px 30px;

  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    button {
      font-size: 16px;
      line-height: 19px;
    }
  }
`;
