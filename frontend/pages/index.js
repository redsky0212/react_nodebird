import React from 'react';
import Link from 'next/link'; 
import { Form, Input, Button, Card, Icon, Avatar } from 'antd';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

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
            { dummy.isLoggedIn && <PostForm /> }
            {
                dummy.mainPosts.map((v, i) => {
                    return (
                        <PostCard key={+v.createdAt} v={v} />
                    );
                })
            }
            
        </div>
    );
}

export default Home;