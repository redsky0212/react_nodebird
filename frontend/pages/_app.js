import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import {Provider} from 'react-redux';
import reducer from '../reducers';
import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import rootSaga from '../sagas';
import { LOAD_USER_REQUEST } from '../reducers/user';

const NodeBird = ({ Component, store, pageProps }) => {
    return (
        <Provider store={store}>
            <Head>
                <title>노드버드</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.5/antd.min.css" />
            </Head>
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </Provider>
    );
}

NodeBird.propTypes = {
    Component: PropTypes.elementType,
    store: PropTypes.object,
};

NodeBird.getInitialProps = async (context) => {
    const { ctx, Component } = context;
    let pageProps = {};

    const state = ctx.store.getState();
    const cookie = ctx.isServer ? ctx.req.headers.cookie : '';    // isServer일때는 cookie값을 가져와서
    axios.defaults.headers.Cookie = '';
    if (ctx.isServer && cookie) {
        axios.defaults.headers.Cookie = cookie;     // 쿠키값을 직접 코딩으로 셋팅 해줘야 한다.
        // axios.defaults.headers.Authorization = ''; // 이런식으로 토큰넘기는 방식으로도 할 수 있다.
    }
    if (!state.user.me) { // user정보가 없을경우 user정보를 가져오는 saga ajax호출을 한다.
        ctx.store.dispatch({
            type: LOAD_USER_REQUEST,
        });
    }
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx) || {};
    }
    return { pageProps };
};

const configureStore = (initialState, options) => {
    // 사가 미들웨어 추가
    const sagaMiddleware = createSagaMiddleware();

    // 커스터마이징 코드 추가
    //const middlewares = [sagaMiddleware];
    const middlewares = [sagaMiddleware, (store) => (next) => (action) => {
        console.log(action);
        next(action);
    }]

    const enhancer = process.env.NODE_ENV === 'production' ?
        compose(applyMiddleware(...middlewares))
        : compose(
            applyMiddleware(...middlewares),
            !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
        );
    const store = createStore(reducer, initialState, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);    // 이 부분을 추가 코딩 해줘야함.(서버사이드렌더링을 위함)
    sagaMiddleware.run(rootSaga);
    return store;
};

export default withRedux(configureStore)(withReduxSaga(NodeBird));