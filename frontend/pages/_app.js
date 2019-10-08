import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import {Provider} from 'react-redux';
import reducer from '../reducers';
import {createStore} from 'redux';

const NodeBird = ({ Component, store }) => {
    return (
        <Provider store={store}>
            <Head>
                <title>노드버드</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.5/antd.min.css" />
            </Head>
            <AppLayout>
                <Component />
            </AppLayout>
        </Provider>
    );
}

NodeBird.propTypes = {
    Component: PropTypes.elementType,
    store: PropTypes.object,
};

export default withRedux((initialState, options)=>{
    const store = createStore(reducer, initialState);
    return store;
})(NodeBird);