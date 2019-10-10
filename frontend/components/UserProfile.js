import React, { useCallback } from 'react';
import {Card, Avatar, Button} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import { logoutAction } from '../reducers/user';

const UserProfile = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const onLogout = useCallback((e) => {
        e.preventDefault();
        dispatch(logoutAction);
    }, []);

    return (
        <>
        <Card
            actions={[
                <div key="twit">트위터<br />{user.Post.length}</div>,
                <div key="following">팔로잉<br />{user.Followings.length}</div>,
                <div key="follower">팔로워<br />{user.Followers.length}</div>
            ]}>
            <Card.Meta
                avatar={<Avatar>{user.nickname[0]}</Avatar>}
                title={user.nickname}
            />
        </Card>
        <Button onClick={onLogout}>로그아웃</Button>
        </>
    );
}

export default UserProfile;

