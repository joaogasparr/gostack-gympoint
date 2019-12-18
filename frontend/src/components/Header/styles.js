import styled from 'styled-components';

export const Container = styled.div`
  height: 64px;
  background: #fff;
  padding: 0 30px;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 64px;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 24px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      height: 18px;
      margin-left: 20px;

      font-size: 15px;
      font-weight: bold;
      color: #444444;
      line-height: 18px;

      & + a {
        color: #999999;
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;

  div {
    text-align: right;

    strong {
      display: block;
      font-size: 14px;
      height: 16px;
      color: #666666;
    }

    button {
      border: 0;
      height: 16px;
      margin-top: 4px;
      font-size: 14px;
      color: #de3b3b;
    }
  }
`;
