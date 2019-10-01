import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';

const Profile = () => {
    return (
        <>
        <Head>
            <title>노드버드</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.5/antd.min.css" />
        </Head>
        <AppLayout>
            <div>profile!!!</div>
        </AppLayout>
        </>
    );
}

export default Profile;