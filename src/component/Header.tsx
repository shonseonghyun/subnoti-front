import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginSelector } from '../recoil/AuthUserInfo';

const Header = () => {
  const isLogin = useRecoilValue(isLoginSelector); 

    return (
        <Navbar 
          // fixed='top'
          collapseOnSelect expand="lg" className="bg-body-tertiary" 
          data-bs-theme="dark"
        >
          <Container>
            <Link to={"/"} className={"navbar-brand"}>
              FreeSubImg
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                {
                  isLogin && 
                  <>
                    <Link to={"/noti/reg"} className={"nav-link"}>
                      등록
                    </Link>
                    <Link to={"/noti/list"} className={"nav-link"}>
                      리스트
                    </Link>
                  </>
                }
                <Link to={"/noti/guide"} className={"nav-link"}>
                  가이드
                </Link>
              </Nav>
              {
                isLogin && 
                <Nav>
                  <Link to={"/logout"} className={"nav-link"}>
                    로그아웃
                  </Link>
                  {/* <p className={"nav-link"} style={{cursor:"pointer"}} onClick={clickedLogout}>
                    로그아웃
                  </p> */}
                </Nav>
              }
              {
                !isLogin && 
                <Nav>
                  <Link to={"/login"} className={"nav-link"}>
                    로그인
                  </Link>
                </Nav>
              }
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
};

export default Header;