import React from 'react';
import Link from 'next/link'; 
import { Form, Input, Button, Card, Icon, Avatar } from 'antd';

const dummy = {
    isLoggedIn: true,
    imagePaths: [],
    mainPosts:[{
        User:{
            id:1,
            nickname:'redsky',

        },
        content:'첫 개시글',
        img: 'https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-0/s180x540/10268581_10152716011096729_8785818270101685508_n.png?_nc_cat=100&_nc_oc=AQl7bI6bkPHjH0INBH2e6HOLhUmpqZ_ciWFvDliwWlT1KGx3g2meKs9ks3rT0PYVY5E&_nc_ht=scontent-icn1-1.xx&oh=56e3b26a95d1ff62e1da7b3e8c1b2354&oe=5E246E60',
    }],
};

const Home = () => {
    return (
        <div>
            {
                dummy.isLoggedIn && 
                <Form style={{marginBottom:20}} encType="multipart/form-data">
                    <Input.TextArea maxLength={140} placeholder="어떤 신기한 일이 일어날까요?" />
                    <div>
                        <input type="file" multiple hidden />
                        <Button>이미지 업로드</Button>
                        <Button type="primary" style={{float:'right'}} htmlType="submit">짹짹</Button>
                    </div>
                    <div>
                        {
                            dummy.imagePaths.map((v, i) => {
                                return (
                                    <div key={v} style={{display:'inline-block'}}>
                                        <img src={'http://localhost:3065/'+v} style={{width:'200px'}} alt={v} />
                                        <div>
                                            <Button>제거</Button>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </Form>
            }
            {
                dummy.mainPosts.map((v, i) => {
                    return (
                        <Card key={+v.createdAt}
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
                })
            }
            
        </div>
    );
}

export default Home;