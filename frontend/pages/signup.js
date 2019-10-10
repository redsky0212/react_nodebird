import React, { useState, useCallback } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import PropTypes from 'prop-types';
import { signupAction } from '../reducers/user';
import {useDispatch} from 'react-redux';

// custom hook 만들기 예제(같은 기능을 하는 hook을 합쳐서 custom으로 만들어서 사용)
// 여기서는 id, nick, password 가 같으므로 custom hook을 사용한다.
export const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = (e) => {
        setter(e.target.value);
    }
    return [value, handler];
}

const Signup = () => {

    const dispatch = useDispatch();

    // hooks방식의 state 설정.(id, nick, password는 custom hook을 사용)
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);  // password가 틀린경우 에러체크
    const [termError, setTermError] = useState(false);          // 약관동의 안한경우 에러체크

    
    const [id, onChangeId] = useInput('');
    const [nick, onChangeNick] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if( password !== passwordCheck ){
            return setPasswordError(true);
        }
        if( !term ){
            return setTermError(true);
        }

        dispatch(signupAction({
            id,
            password,
            nick
        }));

    }, [password, passwordCheck, term]);

    const onChangePasswordChk = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [password]);

    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked);
    }, []);

    return (
        <>
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
        </>
    );
}

export default Signup;