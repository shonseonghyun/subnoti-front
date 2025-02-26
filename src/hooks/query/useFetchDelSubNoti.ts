import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { fetchDelSubNoti } from "../../axios/api";

// export const onSuccess = () =>{
//     alert("등록 성공!");
//     reset();
//     setIsMathcNoAvailable(false);
//     queryClient.invalidateQueries(["member",{memberNo:memberNo}],{ refetchInactive: true }); //https://pebblepark.tistory.com/32
// }

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