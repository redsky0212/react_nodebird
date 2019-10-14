import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects';
import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
} from '../reducers/post';


function addPostAPI() {
    // 서버요청 부분
    // axios처리
}

function* addPost() {
    try {
        //yield call(addPostAPI);
        yield delay(2000);
        yield put({     // put 은 dispatch와 같은 기능
            type: ADD_POST_SUCCESS
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

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
    ]);
}