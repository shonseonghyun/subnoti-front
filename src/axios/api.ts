import axios from "axios";
import { IJoinRegType, ILoignRegType, INotiRegType } from "../interface/interface";
import { PrivateApi, PublicApi } from "./AxiosInstance";

export const fetchLogin = async(data:ILoignRegType)=>{
    const url = '/api/v1/auth/login';
    return await PublicApi.post(url,
        data
    ).then(response=>response.data);
}

export const fetchJoin = async(data:IJoinRegType)=>{
    const url = '/api/v1/member';
    return await PublicApi.post(url,
        data
    ).then(response=>response.data);
}


export const fetchRegSubNoti = async (data:INotiRegType)=>{
    const url = '/api/v1/noti/freeSub';
    return await PrivateApi.post(url,
        data
    ).then(response=>response.data);
}

export const fetchDelSubNoti = async (notiNo:number)=>{
    const url = `/api/v1/noti/freeSub/${notiNo}`;
    return await PrivateApi.delete(url).then(response=>response.data);
}

export const fetchGetPlabMatch = async (matchNo:number)=>{
    return axios.get(`https://www.plabfootball.com/api/v2/matches/${matchNo}/`)
}

export const fetchGetSubNotiList = async (memberNo:number)=>{
    const url = `/api/v1/noti/freeSub/member/${memberNo}`;
    return await PrivateApi.get(url)
    .then(response=>response.data);
}

export const fetchGetEnum = async (key:string)=>{
    const url = `/api/v1/enum/${key}`;
    return await PublicApi.get(url)
    .then(response=>response.data);
}

export const fetchReissueAccessTokenWithRefreshToken = async (refreshToken:string)=>{
    const url = `/api/v1/auth/reissue`;
    return await PublicApi.post(url,{
        refreshToken:refreshToken
        }
    ).then(response=>response.data)
    .catch(error=>error)
    ;
}
