export interface ILoignRegType{
    email:string,
    pwd:string
}

export interface INotiRegType{
    matchNo:number,
    subType:string,
    memberNo:number,
    email:string
}

export interface IJoinRegType{
    email:string,
    pwd:string,
    pwdConfirm:string,
    name:string,
    birthDt:string,
    gender:string,
    tel:string
}