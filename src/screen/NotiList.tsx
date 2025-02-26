import React, { useCallback } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { QueryErrorResetBoundary, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import Loading2 from '../component/Loading/AppLoading';
import { useFetchDelSubNoti } from '../hooks/query/useFetchDelSubNoti';
import { useFetchGetSubNotiList } from '../hooks/query/useFetchGetSubNotiList';
import { AuthUserInfo, getAuthUserInfo } from '../recoil/AuthUserInfo';
import { formatDateTime } from '../utils/DateUtil';
import { ErrorBoundary } from 'react-error-boundary';
import Error from '../component/Error/ErrorCustom';
import ErrorCustom from '../component/Error/ErrorCustom';

const NotiList = () => {
    const authUserInfo = useRecoilValue(getAuthUserInfo); 
    const getSubNotiList = useFetchGetSubNotiList(authUserInfo.memberNo);
    const queryClient = useQueryClient();
    const memberNo = useRecoilValue(AuthUserInfo).memberNo;

    const clickedMatch = useCallback((matchNo:number)=>{
        window.open(`https://www.plabfootball.com/match/${matchNo}/`);
    },[]);

    const onSuccess = () =>{
        alert("등록 해제하였습니다.");
        queryClient.invalidateQueries(["member",{memberNo:memberNo}],{ refetchInactive: true }); //https://pebblepark.tistory.com/32
    };
    const delSubNoti = useFetchDelSubNoti(onSuccess);

    const clickedDelNoti = (notiNo:number) =>{  
        delSubNoti.mutate(notiNo);
    }
    return (
        <div>
            <Row xs={1} md={2} className="g-2 m-4">
                {
                    getSubNotiList.data && 
                    getSubNotiList.data.data.map((item:any) => (
                        <Col key={item.notiNo}>
                            <Card>
                                {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                                <Card.Body>
                                    <Card.Title onClick={()=>clickedMatch(item.matchNo)} style={{cursor:"pointer",display:"inline-block"}}>{item.matchName}</Card.Title>
                                    <Card.Text>
                                        {formatDateTime(item.startDt+item.startTm)} 
                                    </Card.Text>
                                    <Button variant="primary" onClick={()=>clickedDelNoti(item.notiNo)}>등록 해제</Button>
                                </Card.Body>
                                <Card.Footer className="text-muted">
                                    {item.subType}
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
            {
                getSubNotiList.isLoading || delSubNoti.isLoading ? <Loading2 /> : null
            }
        </div>
        

        //     <QueryErrorResetBoundary>
        //         {({ reset }) => (
        //             <ErrorBoundary onReset={reset}  FallbackComponent={ErrorCustom}>
        // <div>
        //     <Row xs={1} md={2} className="g-2 m-4">
        //         {
        //             getSubNotiList.data && 
        //             getSubNotiList.data.data.map((item:any) => (
        //                 <Col key={item.notiNo}>
        //                     <Card>
        //                         {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
        //                         <Card.Body>
        //                             <Card.Title onClick={()=>clickedMatch(item.matchNo)} style={{cursor:"pointer",display:"inline-block"}}>{item.matchName}</Card.Title>
        //                             <Card.Text>
        //                                 {formatDateTime(item.startDt+item.startTm)} 
        //                             </Card.Text>
        //                             <Button variant="primary" onClick={()=>clickedDelNoti(item.notiNo)}>등록 해제</Button>
        //                         </Card.Body>
        //                         <Card.Footer className="text-muted">
        //                             {item.subType}
        //                         </Card.Footer>
        //                     </Card>
        //                 </Col>
        //             ))
        //         }
        //     </Row>
        //     {
        //         getSubNotiList.isLoading || delSubNoti.isLoading ? <Loading2 /> : null
        //     }
        // </div>
        //             </ErrorBoundary>
        //         )}
        //     </QueryErrorResetBoundary>
    );
};

export default NotiList;