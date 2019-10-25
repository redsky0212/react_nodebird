import React, { useState, useCallback, useEffect } from 'react';
import {Card, Icon, Button, Avatar, Form, List, Input, Comment} from 'antd';
import PropsTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

import PostCardContent from './PostCardContent';

const PostCard = ({v}) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [commentText, setCommentText] = useState('');
    const {me} = useSelector(state => state.user);
    const { commentAdded, isAddingComment} = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        setCommentText('');
    }, [commentAdded === true]);

    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        if(!me){
            return alert('로그인이 필요합니다!');
        }
        return dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {postId: v.id}
        });
    },[me && me.id]);

    const onToggleComment = useCallback((e) => {
        setCommentFormOpened(prev => !prev);
    }, []);

    const onChangeCommentText = useCallback((e) => {
        e.preventDefault();
        setCommentText(e.target.value);
    }, []);

    return (
        <div>
        <Card
            cover={v.img && <img alt="example" src={v.img} />}
            actions={[
                <Icon type="retweet" key="retweet" />,
                <Icon type="heart" key="heart" />,
                <Icon type="message" key="message" onClick={onToggleComment} />,
                <Icon type="ellipsis" key="ellipsis" />,
            ]}
            extra={<Button>팔로우</Button>}
        >
            <Card.Meta
                avatar={<Avatar>{v.User.nickname[0]}</Avatar>}
                title={v.User.nickname}
                description={<PostCardContent postData={v.content} />}
            />
        </Card>
        {commentFormOpened && (
            <>
                <Form onSubmit={onSubmitComment}>
                    <Form.Item>
                        <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
                </Form>
                <List
                    header={`${v.Comments ? v.Comments.length : 0} 댓글`}
                    itemLayout="horizontal"
                    dataSource={v.Comments || []}
                    renderItem={item => (
                        <li>
                            <Comment 
                                author={item.User.nickname} 
                                avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                content={item.content}
                                 />
                        </li>
                    )}
                >
                </List>
            </>
        )}
        </div>
    );
}

PostCard.propsTypes = {
    v: PropsTypes.shape({
        User: PropsTypes.object,
        content: PropsTypes.string,
        img: PropsTypes.string,
        createdAt: PropsTypes.object
    })
};

export default PostCard;