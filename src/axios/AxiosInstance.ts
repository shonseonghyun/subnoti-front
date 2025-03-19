import axios from "axios";
import { Resetter, SetterOrUpdater } from "recoil";
import { IAuthUserInfo } from "../recoil/AuthUserInfo";

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
    console.log("setAccessToken 메소드 실행");

    const requestInterceptor= PrivateApi.interceptors.request.use(
        (config)=>{
            console.log("인터셉트 시작");
            console.log("액세스토큰: ",accessToken);
            try{
                config.headers.Authorization = `Bearer ${accessToken}`;
            }catch(err){
                alert(err)
            }
            console.log("인터셉트 종료");
    
            return config;
        }
    );
    return requestInterceptor;
    // console.log("이게뭐지: ", a);
}

export const refreshAccessTokenWithRefreshToken = (authUserInfo:IAuthUserInfo,setAuthUserInfo:SetterOrUpdater<IAuthUserInfo>,resetAuthInfo: Resetter) =>{
    const refreshToken = authUserInfo.refreshToken;

    const refreshTokenInterceptor = PrivateApi.interceptors.response.use(
        //정상응답인경우
        (response)=>{
            return response;
        },

        //200 외 응답인 경우
        async (error)=>{
            console.log("200외 응답 받음");
            console.log(error.response);
            console.log(error.response.data.code);

            if(error.response ===undefined){
                // alert("데이터를 불러올 수 없습니다. 재시도 부탁드립니다.");
                return Promise.reject(error); // 리액트 쿼리 onError 탐
                // return ; //리액트 쿼리 onSuccess 탐
            }

            const originalConfig = error.config;
            const code = error.response.data.code;
            const msg = error.response.data.msg;

            
            if(code =="J01"){
                if(refreshToken){ //refreshToken 존재한다면
                    console.log("재발급 진행 요청");

                    //accessToken 재발급 요청
                    const response = await axios.post(`http://localhost:8001/api/v1/auth/reissue`,{
                             refreshToken: refreshToken
                    });

                    const reissueAccessToken = response.data.data.accessToken;
                    const reissueRefreshToken = response.data.data.refreshToken;

                    //  accessToken 설정
                     setAuthUserInfo({
                        accessToken: reissueAccessToken,
                        refreshToken: reissueRefreshToken,
                        email: authUserInfo.email,
                        memberId: authUserInfo.memberId,
                        memberNo:authUserInfo.memberNo
                    });


                    //재요청 시 header 세팅
                    originalConfig.headers["Authorization"] = "Bearer " + reissueAccessToken;
                    
                    //재요청
                    //PrivatApi로 요청 시 "PrivateApi.interceptors.response.use"내가 등록한 인터셉터가 실행되게 되어 인터셉터 내부 구성해둔 토큰재발급 및 재요청이 두 번 발생한다.
                    // const originalResponse = await PrivateApi(originalConfig);
                    const originalResponse = await RefreshApi(originalConfig); 
                    return originalResponse;
                }
            }else{
                console.log("자동 로그인하지 않음");
                alert(msg);
                resetAuthInfo();
                return error;
            }
        }
    );
    return refreshTokenInterceptor;
}