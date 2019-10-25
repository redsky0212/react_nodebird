import axios from 'axios';
import { all, fork, takeLatest, takeEvery, call, put, delay} from 'redux-saga/effects';
import { 
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    LOAD_USER_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
} from '../reducers/user';

function loginAPI(loginData){
    // 서버요청 부분
    // axios처리
    return axios.post('/user/login', loginData, {withCredentials:true});
}
function signUpAPI(signUpData){
    return axios.post('/user/', signUpData);
}

function logOutAPI() {
    // 서버에 요청을 보내는 부분
    return axios.post('/user/logout', {}, {
        withCredentials: true,
    });
}

function loadUserAPI() {
    // 서버에 요청을 보내는 부분
    return axios.get('/user/', {
        withCredentials: true,
    });
}

function* login(action){
    try{
        const result = yield call(loginAPI, action.data);
        //yield delay(2000);
        yield put({     // put 은 dispatch와 같은 기능
            type:LOG_IN_SUCCESS,
            data: result.data
        });
    }catch(e){
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE
        });
    }
}
function* signUp(action) {
    try {
        yield call(signUpAPI, action.data);
        // throw new Error('회원가입 에러!!');
        //yield delay(2000);
        yield put({     // put 은 dispatch와 같은 기능
            type: SIGN_UP_SUCCESS
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE,
            error: 'aaa'
        });
    }
}

function* logOut() {
    try {
        // yield call(logOutAPI);
        yield call(logOutAPI);
        yield put({ // put은 dispatch 동일
            type: LOG_OUT_SUCCESS,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOG_OUT_FAILURE,
            error: e,
        });
    }
}

function* loadUser() {
    try {
        // yield call(loadUserAPI);
        const result = yield call(loadUserAPI);
        yield put({ // put은 dispatch 동일
            type: LOAD_USER_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOAD_USER_FAILURE,
            error: e,
        });
    }
}

function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST, login);
}
function* watchSignUP() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchLogOut() {
    yield takeEvery(LOG_OUT_REQUEST, logOut);
}
function* watchLoadUser() {
    yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchLogOut),
        fork(watchSignUP),
        fork(watchLoadUser),
    ]);
}