import React from 'react';
import {Card, Icon, Button, Avatar} from 'antd';
import PropsTypes from 'prop-types';

const PostCard = ({v}) => {

    return (
        <Card
            cover={v.img && <img alt="example" src={v.img} />}
            actions={[
                <Icon type="retweet" key="retweet" />,
                <Icon type="heart" key="heart" />,
                <Icon type="message" key="message" />,
                <Icon type="ellipsis" key="ellipsis" />,
            ]}
            extra={<Button>팔로우</Button>}
        >
            <Card.Meta
                avatar={<Avatar>{v.User.nickname[0]}</Avatar>}
                title={v.User.nickname}
                description={v.content}
            />
        </Card>
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