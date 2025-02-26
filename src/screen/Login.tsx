import React from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { Cookies, useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useFetchLogin } from '../hooks/query/useFetchLogin';
import useRememberId from '../hooks/useRememberId';
import { ILoignRegType } from '../interface/interface';
import { AuthUserInfo } from '../recoil/AuthUserInfo';
import { getCookie } from '../utils/Cookie';

const Login = () => {
    const [authUserInfo,setAuthUserInfo] = useRecoilState(AuthUserInfo);
    const {register,handleSubmit,getValues,formState:{errors}} = useForm<ILoignRegType>({mode:'onBlur'});
    const [isRememberId,onToggle,checkboxRef,doRememberId,rememberId] = useRememberId(false,getValues);
    const location = useLocation();
    const navigate = useNavigate();

    const onSuccess = (data:any)=>{
        setAuthUserInfo({
            accessToken:getCookie("accessToken"),
            refreshToken:getCookie("refreshToken"),
            memberId:data.data.memberId,
            email:data.data.email,
            memberNo:data.data.memberNo
        });
            
        const from = location.state?.redirectedFrom?.pathname || "/";
        navigate(from);
    }

    const loginMutation = useFetchLogin(onSuccess);

    const onValid = (data:ILoignRegType)=>{
        doRememberId();
        loginMutation.mutate(data);
    }


    return (
        <div className='m-4'>

            <Form onSubmit={handleSubmit(onValid)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" defaultValue={rememberId} {...register("email",
                        {
                            required:"이메일을 입력해주세요.",
                            pattern:{
                                value: /^[A-Z0-9._%+-]+@naver.com$/i,
                                // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message:"이메일 형식을 확인해주세요."
                            }
                        }
                    )}  />
                    {errors.email && (
                        <Form.Text className="text-danger">
                            {errors.email.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" {...register("pwd",
                        {
                            required:"비밀번호을 입력해주세요."
                        }
                    )}  />
                    {errors.pwd && (
                        <Form.Text className="text-danger">
                            {errors.pwd.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check 
                        label="Remember Id" 
                        type="checkbox"
                        ref={checkboxRef}
                        onChange={onToggle} 
                        checked={isRememberId}
                    />
                </Form.Group>
        
                <Stack gap={2} className="col-md-5 m-auto">
                    <Button variant="primary" type='submit'>로그인</Button>
                    <Stack className="d-flex justify-content-center" direction="horizontal" >
                        <div className="p-2 mx-auto">
                            <Link to="/accounts/findme" style={{ textDecoration: "none" ,color:"black"}}>
                                아이디/비밀번호 찾기
                            </Link>
                        </div>
                        <div className="p-2 mx-auto">
                            <Link to="/auth/join" style={{ textDecoration: "none" ,color:"black"}}>
                                회원가입
                            </Link>
                        </div>
                    </Stack>
                </Stack>
            </Form>
        </div>
    );
};

export default Login;