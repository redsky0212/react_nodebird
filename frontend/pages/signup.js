import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';

const Signup = () => {

    const onSubmit = () => {

    };

    const onChangeId = () => {

    };

    const onChangeNick = () => {

    };

    const onChangePassword = () => {

    };

    const onChangePasswordChk = () => {

    };

    const onChangeTerm = () => {

    };

    return (
        <>
        <Head>
            <title>노드버드</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.5/antd.min.css" />
        </Head>
        <AppLayout>
            <Form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br />
                    <Input name="user-id" required onChange={onChangeId} />
                </div>
                <div>
                    <label htmlFor="user-nick">닉네임</label>
                    <br />
                    <Input name="user-nick" required onChange={onChangeNick} />
                </div>
                <div>
                    <label htmlFor="user-pass">비밀번호</label>
                    <br />
                    <Input name="user-pass" required onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-pass-chk">비밀번호체크</label>
                    <br />
                    <Input name="user-pass-chk" type="password" required onChange={onChangePasswordChk} />
                </div>
                <div>
                    <Checkbox name="user-term"  onChange={onChangeTerm}>동의합니다.</Checkbox>
                </div>
                <div>
                    <Button type="primary" htmlType="submit">가입하기</Button>
                </div>
            </Form>
        </AppLayout>
        </>
    );
}

export default Signup;