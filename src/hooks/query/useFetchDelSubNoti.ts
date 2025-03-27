import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { fetchDelSubNoti } from "../../axios/api";

export const useFetchDelSubNoti=(onSuccess:any)=>{
    return useMutation(
        (notiNo:number)=>fetchDelSubNoti(notiNo),
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