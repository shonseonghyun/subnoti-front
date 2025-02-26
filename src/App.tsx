import React from 'react';
import Body from './component/Body';
import Header from './component/Header';
import styled from 'styled-components';

const MyComponent = styled.div`
  font-family: "Jua", serif;
  /* font-family : 'NanumSquare', sans-serif; */
  font-weight: 400;
  font-style: normal;
`;

function App() {
  return (
    <MyComponent>
      <Header />
      <Body />
    </MyComponent>
  );
}

export default App;
