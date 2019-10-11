import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import {Provider} from 'react-redux';
import reducer from '../reducers';
import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

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
    // 사가 미들웨어 추가
    const sagaMiddleware = createSagaMiddleware();

    // 커스터마이징 코드 추가
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'?
        compose(applyMiddleware(...middlewares))
        :compose(
        applyMiddleware(...middlewares),
        !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f)=>f,
    );
    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);
    return store;
})(NodeBird);