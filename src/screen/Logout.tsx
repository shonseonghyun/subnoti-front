import React, { useCallback, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { AuthUserInfo } from '../recoil/AuthUserInfo';
import { removeCookie } from '../utils/Cookie';

const Logout = () => {
    // const isLogin = useRecoilValue(isLoginSelector);
    const resetAuthInfo = useResetRecoilState(AuthUserInfo);
    const navigate = useNavigate();
    // const clickedLogout = useCallback(()=>{
    //   resetAuthInfo();
    //   removeCookie("accessToken");
    //   removeCookie("refreshToken");
    //   navigate("/");
    // },[]);

    useEffect(()=>{
        resetAuthInfo();
      removeCookie("accessToken");
      removeCookie("refreshToken");
      navigate("/");
    })
  
    return (
        null
        // <Navigate to={"/"} />
    );
};

export default Logout;