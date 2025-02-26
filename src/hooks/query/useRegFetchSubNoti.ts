import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { fetchRegSubNoti } from "../../axios/api";
import { INotiRegType } from "../../interface/interface";

// export const onSuccess = () =>{
//     alert("등록 성공!");
//     reset();
//     setIsMathcNoAvailable(false);
//     queryClient.invalidateQueries(["member",{memberNo:memberNo}],{ refetchInactive: true }); //https://pebblepark.tistory.com/32
// }

export const useRegFetchSubNoti=(onSuccess:any)=>{
    return useMutation(
        (data:INotiRegType)=>fetchRegSubNoti(data),
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