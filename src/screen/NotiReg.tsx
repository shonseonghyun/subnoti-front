import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Button, Col, Form, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import AppLoading from '../component/Loading/AppLoading';
import { useFetchGetEnum } from '../hooks/query/useFetchGetEnum';
import { useFetchGetPlabMatch } from '../hooks/query/useFetchPlabMatch';
import { useRegFetchSubNoti } from '../hooks/query/useRegFetchSubNoti';
import { INotiRegType } from '../interface/interface';
import { AuthUserInfo } from '../recoil/AuthUserInfo';
import { toast } from 'react-toastify';

const NotiReg = () => {
    const {register,handleSubmit,watch,formState:{errors},resetField,reset,setFocus} = useForm<INotiRegType>({mode:"onBlur"});
    
    //매치번호 인증 관련
    const [isMathcNoAvailable,setIsMathcNoAvailable] = useState(false); //매치번호 유효성 검증 플래그
    const getPlabMatch = useFetchGetPlabMatch(watch("matchNo"));

    //등록 관련
    const authUserInfo = useRecoilValue(AuthUserInfo);
    const queryClient = useQueryClient();
    const memberNo = useRecoilValue(AuthUserInfo).memberNo;
    const onSuccess = (data:any) =>{
        console.log("컴포넌트 onSuccess:",data);
        toast.success("등록 성공!",{
            position:"top-center"
          });

        reset();
        setIsMathcNoAvailable(false);
        queryClient.invalidateQueries(["member",{memberNo:memberNo}],{ refetchInactive: true }); //https://pebblepark.tistory.com/32
    };
    const regSubNotiMutation = useRegFetchSubNoti(onSuccess);

    //SubType Enum
    const getSubTypeEnum = useFetchGetEnum("subType");

    const onValid =(data:INotiRegType) => {
        if(isMathcNoAvailable){
            regSubNotiMutation.mutate(data);
        }
    }

    const clickedResetBtn =()=>{
        resetField("matchNo");
        setFocus("matchNo");
        setIsMathcNoAvailable(false);
    }

    const clickedValidBtn = async ()=>{
        if(errors.matchNo){
            return;
        }

        const response = await getPlabMatch.refetch();
        if((response.error as AxiosError)?.response?.status === 404){
            setIsMathcNoAvailable(false);
            return ;
        }

        alert("매치번호 인증완료하였습니다.");
        setIsMathcNoAvailable(true);
    }

    return (
        <div className='m-4'>
            <Form onSubmit={handleSubmit(onValid)}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <div className='hidden'>
                        <Form.Control {...register("email")} defaultValue={authUserInfo.email} hidden />
                        <Form.Control {...register("memberNo")} defaultValue={authUserInfo.memberNo} hidden />
                    </div>

                    <Form.Label className='fs-5'>매치 번호</Form.Label>
                    <Stack direction="horizontal" gap={3}>
                        <Form.Control className="me-auto" placeholder="매치번호를 입력하세요." readOnly={isMathcNoAvailable}{...register("matchNo",{
                            required:"매치번호를 입력해주세요.",
                            pattern:{
                                value:/^[0-9]*$/,
                                message:"숫자만 입력해주세요."
                            }
                        })}/>
                        
                        <Button onClick={clickedValidBtn} disabled={isMathcNoAvailable}>Valid</Button>
                        <div className="vr" />
                        <Button variant="outline-danger" onClick={clickedResetBtn}>Reset</Button>
                    </Stack>
                    {
                        errors.matchNo && (
                            <Form.Text className="text-danger">
                                {errors.matchNo.message}
                            </Form.Text>)
                    }
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className='fs-5'>서브 타입</Form.Label>
                    <Form.Select {...register("subType",{
                        pattern:{
                            value :/^(?!.*default).*$/,
                            message:"서브 타입을 선택해주세요."
                        }
                    })} defaultValue={
                        // getSubTypeEnum.data && getSubTypeEnum.data.data[0]
                        "default"
                    }
                    >
                        <option value="default" disabled>프리 서브를 선택해주세요.</option>
                        {
                            getSubTypeEnum.data && 
                            getSubTypeEnum.data.data.map((item:any)=>{
                                return (
                                    <option key={item.name} value={item.name}>{item.desc}</option>
                                )
                            })
                        }
                    </Form.Select>
                    {errors.subType && (
                        <Form.Text className="text-danger mt-1">
                            {errors.subType.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <div className="d-grid gap-2 mt-4">
                    <Button 
                        variant="primary" size="lg" type="submit"
                        disabled={regSubNotiMutation.isLoading || !isMathcNoAvailable} //중복제출 방지
                    >
                        등록
                    </Button>
                </div>
            </Form>
            {
                getPlabMatch.isLoading || regSubNotiMutation.isLoading ? <AppLoading /> : null
            }
        </div>
    );
};

export default NotiReg;