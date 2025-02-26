import { useQuery } from "react-query";
import { fetchGetEnum } from "../../axios/api";

export const useFetchGetEnum=(key:string)=>{
    return useQuery({
        queryKey:["enum",{"key":key}],
        queryFn: ()=>fetchGetEnum(key),
    });
}