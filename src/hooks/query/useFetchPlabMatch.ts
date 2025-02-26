import { useQuery } from "react-query";
import { fetchGetPlabMatch } from "../../axios/api";

export const useFetchGetPlabMatch=(matchNo:number)=>{
    return useQuery({
        queryKey:["plabMatchNo",{matchNo:matchNo}],
        queryFn: ()=>fetchGetPlabMatch(matchNo),
        enabled:false,
    });
}