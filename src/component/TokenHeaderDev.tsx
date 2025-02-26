import React, { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { PrivateApi, refreshAccessTokenWithRefreshToken, setAccessToken } from '../axios/AxiosInstance';
import { AuthUserInfo } from '../recoil/AuthUserInfo';

const TokenHeaderDev = () => {
    const [authUserInfo,setAuthUserInfo] = useRecoilState(AuthUserInfo);
    const resetAuthInfo = useResetRecoilState(AuthUserInfo);

    useEffect(()=>{
        const requestInterceptor = setAccessToken(authUserInfo.accessToken); // accessToken이 바뀔 때마다 헤더 업데이트
        const tokenRefreshInterceptor = refreshAccessTokenWithRefreshToken(authUserInfo,setAuthUserInfo,resetAuthInfo);
        
        return () => {
            //unmount
            //해당문이 존재하여 마운트시마다 등록된 requestInterceptor를 등록해제시켜 중복 세팅을 방지할 수 있다.
            PrivateApi.interceptors.request.eject(requestInterceptor);
            PrivateApi.interceptors.response.eject(tokenRefreshInterceptor);
        }
    },[authUserInfo]);
    
    return (
        <>
        </>
    );
};

export default TokenHeaderDev;