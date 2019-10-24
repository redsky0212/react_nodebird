import React, { useCallback } from 'react';
import Link from 'next/link';
import { Input, Button, Form } from 'antd';
import { useInput } from '../pages/signup';
import {useDispatch, useSelector} from 'react-redux';
import { loginRequestAction } from '../reducers/user';


const LoginForm = () => {
    const [userId, onChangeUserId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const dispatch = useDispatch();
    const { isLoggingIn } = useSelector(state=>state.user);

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        console.log({ userId, password });
        dispatch(loginRequestAction({ userId, password }));
    }, [userId, password]);

    return (
        <Form onSubmit={onSubmitForm} style={{padding:10}}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <Input name="user-id" value={userId} onChange={onChangeUserId} required />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
            </div>
            <div style={{marginTop: '10px'}}>
                <Button type="primary" htmlType="submit" loading={isLoggingIn}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </div>
        </Form>
    );
}

export default LoginForm;