import React from 'react';
import Body from './component/Body';
import Header from './component/Header';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './component/Error/ErrorFallback';
import { useQueryErrorResetBoundary } from 'react-query';
import { ToastContainer } from 'react-toastify';

const Container = styled.div`
  font-family: "Jua", serif;
  /* font-family : 'NanumSquare', sans-serif; */
  font-weight: 400;
  font-style: normal;
`;

function App() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Container>
      <ToastContainer />
      <Header />  
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
        <Body />
      </ErrorBoundary>
    </Container>
  );
}

export default App;
