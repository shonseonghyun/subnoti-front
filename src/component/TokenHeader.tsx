import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { setAccessToken } from '../axios/AxiosInstance';
import { getAuthUserInfo } from '../recoil/AuthUserInfo';

type FlexibleProps = {
    children: React.ReactNode; // 거의 모든 타입 허용
  };

const TokenHeader = ({children}:FlexibleProps) => {
  const acessToken = useRecoilValue(getAuthUserInfo).accessToken;

  useEffect(() => { 
    setAccessToken(acessToken); // token이 바뀔 때마다 헤더 업데이트
  }, [acessToken]);

    return (
      <>
        {children}  
      </>
    );
};

export default TokenHeader;