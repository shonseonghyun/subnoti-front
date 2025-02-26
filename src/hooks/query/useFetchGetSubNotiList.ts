import { useQuery } from "react-query";
import { fetchGetSubNotiList } from "../../axios/api";

export const useFetchGetSubNotiList=(memberNo:number)=>{
    return useQuery({
        queryKey:["member",{memberNo:memberNo}],
        queryFn: ()=>fetchGetSubNotiList(memberNo),
    });
}