import React from 'react';
import { Button, Col, Form, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useFetchJoin } from '../hooks/query/useFetchJoin';
import { IJoinRegType } from '../interface/interface';

const Join = () => {
    const {register,handleSubmit,getValues,formState:{errors}} = useForm<IJoinRegType>({mode:'onBlur'});
    const joinMutation = useFetchJoin(()=>{});

    const onValid = (data:IJoinRegType) =>{
        console.log(data);
        joinMutation.mutate(data);
    }

    return (
        <div className='m-4'>
            <Form onSubmit={handleSubmit(onValid)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>이메일</Form.Label>
                    <Stack direction="horizontal" gap={3}>
                        <Form.Control type="text" placeholder="Enter email" {...register("email",
                            {
                                required:"이메일을 입력해주세요.",
                                pattern:{
                                    value: /^[A-Z0-9._%+-]+@naver.com$/i,
                                    // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message:"이메일 형식을 확인해주세요."
                                },
                                // validate:{
                                //     checkEmailAvailable: async (email)=>{
                                //         return 
                                //     }
                                // }
                            }
                        )}  />
                        <Button>CHECK</Button>
                        <Button>AUTH</Button>
                    </Stack>
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

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" {...register("pwdConfirm",
                        {
                            validate:{
                                passwordConfirm:(value)=>{
                                    return value == getValues("pwd") || "비밀번호가 일치하지 않습니다.";
                                }
                            }
                        }
                    )}  />
                    {errors.pwdConfirm && (
                        <Form.Text className="text-danger">
                            {errors.pwdConfirm.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" {...register("name",
                        {
                            required:"이름을 입력해주세요."
                        }
                    )}  />
                    {errors.name && (
                        <Form.Text className="text-danger">
                            {errors.name.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" as={Col} controlId="formGridState">
                    <Form.Label>성별</Form.Label>
                        <Form.Select {...register("gender",{
                            required:"성별을 선택해주세요",
                            pattern:{
                                value:/^[FE]{0,}MALE$/,
                                message:"성별을 선택해주세요."
                            }
                        })}>
                        <option selected disabled>성별을 선택해주세요</option>
                        <option value={"MALE"}>남성</option>
                        <option value={"FEMALE"}>여성</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>휴대폰 번호</Form.Label>
                    <Form.Control type="text" placeholder="Enter Tel Number" {...register("tel",
                        {
                            required:"휴대폰 번호를 입력해주세요.",
                            pattern:{
                                value:/^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
                                message:"휴대폰 번호를 확인해주세요."
                            }
                        }
                    )}  />
                    {errors.tel && (
                        <Form.Text className="text-danger">
                            {errors.tel.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Stack gap={2} className="col-md-5 m-auto">
                    <Button variant="primary" type='submit'>회원가입</Button>
                </Stack>
            </Form>
        </div>
        
    );
};

export default Join;