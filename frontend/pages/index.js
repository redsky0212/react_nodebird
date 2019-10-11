import React, { useEffect } from 'react';
import Link from 'next/link'; 
import { Form, Input, Button, Card, Icon, Avatar } from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import { loginAction, logoutAction } from '../reducers/user';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
    // redux의 state를 가져와 쓰는 방법
    const { isLoggedIn, me } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);

    // redux의 hook(useDispatch)을 이용하여 사용.
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(loginAction);
    // }, []);
    

    return (
        <div>
            {isLoggedIn ? <div>로그인 했습니다: {me.nickname}</div>:<div>로그아웃 했습니다.</div>}
            { isLoggedIn && <PostForm /> }
            {
                mainPosts.map((v, i) => {
                    return (
                        <PostCard key={+v.createdAt} v={v} />
                    );
                })
            }
            
        </div>
    );
}

export default Home;