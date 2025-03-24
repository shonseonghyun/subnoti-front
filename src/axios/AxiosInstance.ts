import axios from "axios";
import { Resetter, SetterOrUpdater } from "recoil";
import { IAuthUserInfo } from "../recoil/AuthUserInfo";
import { fetchReissueAccessTokenWithRefreshToken } from "./api";

export const PublicApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_IP,
    withCredentials:true
})

export const PrivateApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_IP,
    withCredentials:true
})

const RefreshApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_IP,
    withCredentials:true 
})

export const setAccessToken = (accessToken:string)=>{
    console.log("AxiosInstance[setAccessToken] exec");

    const requestInterceptor= PrivateApi.interceptors.request.use(
        (config)=>{
            config.headers.Authorization = `Bearer ${accessToken}`;
            return config;
        }
    );
    return requestInterceptor;
}

export const refreshAccessTokenWithRefreshToken = (authUserInfo:IAuthUserInfo,setAuthUserInfo:SetterOrUpdater<IAuthUserInfo>,resetAuthInfo: Resetter) =>{
    console.log("AxiosInstance[refreshAccessTokenWithRefreshToken] exec");
    
    const refreshToken = authUserInfo.refreshToken;
    const refreshTokenInterceptor = PrivateApi.interceptors.response.use(
        //정상응답인경우
        (response)=>{
            return response;
        },

        //200 외 응답인 경우
        async (error)=>{
            if(error.response === undefined){
                console.log("error인스턴스 reponse 존재하지 않음");
                return Promise.reject(error); // 리액트 쿼리 onError 탐
                // return ; //리액트 쿼리 onSuccess 탐
            }

            const originalConfig = error.config;
            console.log(originalConfig);
            const code = error.response.data.code;
            
            if(code =="J01"){ // AccessToken Expried case .. 
                if(refreshToken){ // refreshToken 존재한다면
                    console.log("Reissue AccessToken With RefreshToken");

                    //accessToken 재발급 요청
                    const response = await fetchReissueAccessTokenWithRefreshToken(refreshToken); 
                    console.log("accessToken 재발급 요청에 대한 응답: ",response);

                    
                    //성공 시 response.code , response.msg , response.data. 로 들어온다
                    //실패 시 response(에러 객체).response.data.code로 들어온다.
                    if(response?.response?.data?.code == "J02"){ //RefreshToken Expried case .. 
                        resetAuthInfo();
                        return Promise.reject(error);
                    }

                    const reissueAccessToken = response.data.accessToken;
                    const reissueRefreshToken = response.data.refreshToken;

                    // accessToken 설정
                     setAuthUserInfo({
                        accessToken: reissueAccessToken,
                        refreshToken: reissueRefreshToken,
                        email: authUserInfo.email,
                        memberId: authUserInfo.memberId,
                        memberNo:authUserInfo.memberNo
                    });


                    // 재요청 시 header 세팅
                    originalConfig.headers["Authorization"] = "Bearer " + reissueAccessToken;
                    
                    // 재요청
                    // PrivatApi로 요청 시 "PrivateApi.interceptors.response.use"내가 등록한 인터셉터가 실행되게 되어 인터셉터 내부 구성해둔 토큰재발급 및 재요청이 두 번 발생한다.
                    // const originalResponse = await PrivateApi(originalConfig);
                    const originalResponse = await RefreshApi(originalConfig); 
                    return originalResponse;
                }
            }

            // AccessToken Expried case가 아닌 경우 reissue 필요 없으므로 그대로 error 리턴
            return Promise.reject(error);
        }
    );
    return refreshTokenInterceptor;
}