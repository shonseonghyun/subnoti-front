import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { IJoinRegType } from "../../interface/interface";
import { fetchJoin } from "../../axios/api";

export const useFetchJoin=(onSuccess:any)=>{
    return useMutation(
        (data:IJoinRegType)=>fetchJoin(data),
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