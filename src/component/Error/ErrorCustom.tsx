import React from 'react';
import { ErrorBoundary,FallbackProps } from 'react-error-boundary';

const ErrorCustom = ({error,resetErrorBoundary}:FallbackProps) => {
    return (
        <div>
            <h1>새로고침 필요해</h1>
        </div>
    );
};

export default ErrorCustom;