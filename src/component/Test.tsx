import React, { useEffect } from 'react';
import { Cookies } from 'react-cookie';

const Test = () => {
    const cookies = new Cookies();
    console.log(cookies.get("rememberId")); 
    console.log(cookies.get("accessToken")); 
    console.log(cookies.get("refreshToken")); 

    const onSuccess = ()=>{
        console.log(cookies.get("rememberId")); 
        console.log(cookies.get("accessToken")); 
        console.log(cookies.get("refreshToken")); 
    }

    return (
        <div>
            
        </div>
    );
};

export default 
Test;