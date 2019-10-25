import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
    LOAD_MAIN_POSTS_REQUEST, LOAD_MAIN_POSTS_SUCCESS, LOAD_MAIN_POSTS_FAILURE, 
} from '../reducers/post';


function addPostAPI(postData) {
    // 서버요청 부분
    // axios처리
    return axios.post('/post', postData, {
        withCredentials: true,  // 다른도메인 서버와 쿠키를 주고받기위한 셋팅
    });
}

function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data);
        //yield delay(2000);
        yield put({     // put 은 dispatch와 같은 기능
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: ADD_POST_FAILURE,
            error: e,
        });
    }
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function addCommentAPI() {
    // 서버요청 부분
    // axios처리
}

function* addComment(action) {
    try {
        //yield call(addCommentAPI);
        yield delay(2000);
        yield put({     // put 은 dispatch와 같은 기능
            type: ADD_COMMENT_SUCCESS,
            data: {
                postId: action.data.postId
            }
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: e,
        });
    }
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function loadMainPostsAPI() {
    return axios.get('/posts');
}

function* loadMainPosts() {
    try {
        const result = yield call(loadMainPostsAPI);
        yield put({
            type: LOAD_MAIN_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        yield put({
            type: LOAD_MAIN_POSTS_FAILURE,
            error: e,
        });
    }
}

function* watchLoadMainPosts() {
    yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}

export default function* postSaga() {
    yield all([
        fork(watchLoadMainPosts),
        fork(watchAddPost),
        fork(watchAddComment),
    ]);
}