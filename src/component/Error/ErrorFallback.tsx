import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import styled from 'styled-components';
import { getErrorContent } from '../../utils/ErrMsg';
import { getErrorDataByCode } from '../../interface/Error';

const Container = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  height: 100%;
  top:50%;
  position: relative;
`;

const Title = styled.h2`
  font-size: 24px;
  padding: 12px;
`;

const Message = styled.p`
  font-size: 20px;
`;

const ResetButton = styled.button`
  width: 100px;
  height: 48px;
  color: #fff;
  background: #000;
  font-weight: 500;
  font-size: 22px;
  border-radius: 8px;
  margin: 20px;
`;

const ErrorFallback = ({error,resetErrorBoundary}:FallbackProps) => {
    const errorData = getErrorDataByCode(error);

    return (
    <Container>
      <Title>{errorData?.title}</Title>
      <Message>{errorData?.content}</Message>
      <ResetButton onClick={resetErrorBoundary}>새로고침</ResetButton>
    </Container>
    );
};

export default ErrorFallback;