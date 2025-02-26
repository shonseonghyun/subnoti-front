import { useMutation } from "react-query";
import { fetchLogin } from "../../axios/api";
import { AxiosError } from "axios";
import { ILoignRegType } from "../../interface/interface";

export const useFetchLogin=(onSuccess:any)=>{
    return useMutation(
        (data:ILoignRegType)=>fetchLogin(data),
        {
            onSuccess:onSuccess,
            onError(error) {
                if(error instanceof AxiosError){
                    alert(error.response?.data.msg);
                }
            },
        }
    );
}