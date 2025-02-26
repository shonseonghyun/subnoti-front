import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist({
    key:"auth",
    storage:localStorage
})

export interface IAuthUserInfo{
    accessToken:string,
    refreshToken:string,
    memberId:string,
    memberNo:number,
    email:string
}

export const AuthUserInfo = atom<IAuthUserInfo>({
    key:"authUserInfo",
    default:{
        email:"",
        accessToken:"",
        refreshToken:"",
        memberId:"",
        memberNo:0
    },
    effects_UNSTABLE:[persistAtom]
});

export const isLoginSelector = selector({
    key:"isLogin",
    get:({get})=>{
        const authUserInfo = get(AuthUserInfo);
        return !!(authUserInfo.accessToken);
    }
})

export const getAuthUserInfo = selector({
    key:"auth",
    get:({get})=>{
        return get(AuthUserInfo);
    }
})