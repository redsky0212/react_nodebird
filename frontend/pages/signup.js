import React, { useState } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';

const Signup = () => {
    // hooks방식의 state 설정.
    const [id, setId] = useState('');
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);  // password가 틀린경우 에러체크
    const [termError, setTermError] = useState(false);          // 약관동의 안한경우 에러체크


    const onSubmit = (e) => {
        e.preventDefault();
        console.log({id, nick, password, passwordCheck, term});

        if( password !== passwordCheck ){
            return setPasswordError(true);
        }
        if( !term ){
            return setTermError(true);
        }
    };

    const onChangeId = (e) => {
        setId(e.target.value);
    };

    const onChangeNick = (e) => {
        setNick(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangePasswordChk = (e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    };

    const onChangeTerm = (e) => {
        setTermError(false);
        setTerm(e.target.checked);
    };

    // custom hook 만들기 예제(같은 기능을 하는 hook을 합쳐서 custom으로 만들어서 사용)
    // const useInput = (initValue = null) => {
    //     const [value, setter] = useState(initValue);
    //     const handler = (e) => {
    //         setter(e.target.value);
    //     }
    //     return [value, handler];
    // }
    // const [id, onChangeId] = useInput('');
    // const [nick, onChangeNick] = useInput('');
    // const [password, onChangePassword] = useInput('');

    return (
        <>
        <Head>
            <title>노드버드</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.5/antd.min.css" />
        </Head>
        <AppLayout>
            <Form onSubmit={onSubmit} style={{ padding: 10 }}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br />
                    <Input name="user-id" value={id} required onChange={onChangeId} />
                </div>
                <div>
                    <label htmlFor="user-nick">닉네임</label>
                    <br />
                    <Input name="user-nick" value={nick} required onChange={onChangeNick} />
                </div>
                <div>
                    <label htmlFor="user-pass">비밀번호</label>
                    <br />
                    <Input name="user-pass" value={password} required onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-pass-chk">비밀번호체크</label>
                    <br />
                    <Input name="user-pass-chk" type="password" value={passwordCheck} required onChange={onChangePasswordChk} />
                    {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치 해야 합니다.</div>}
                </div>
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>동의합니다.</Checkbox>
                    {termError && <div style={{color:'red'}}>약관에 동의 하셔야 합니다.</div>}
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