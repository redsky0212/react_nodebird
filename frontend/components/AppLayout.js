import React from 'react';
import Link from 'next/link';
import { Menu, Input, Button, Row, Col, Card, Avatar } from 'antd';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

const dummy = {
    nickname: '처음닉네임',
    Post:[],
    Followings:[],
    Followers:[],
    isLoggedIn: false,
};

const AppLayout = ({children}) => {
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>노드버드</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{verticalAlign:'middle'}} />
                </Menu.Item>
            </Menu>
            <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {dummy.isLoggedIn? <UserProfile /> : <LoginForm /> }
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <Link href="http://www.glcharts.com"><a target="_blank">Made by redsky</a></Link>
                </Col>
            </Row>
        </div>
    );
}

export default AppLayout;