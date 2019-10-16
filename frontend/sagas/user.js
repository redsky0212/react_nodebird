import axios from 'axios';
import { all, fork, takeLatest, call, put, delay} from 'redux-saga/effects';
import { 
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE
} from '../reducers/user';

function loginAPI(){
    // 서버요청 부분
    // axios처리
}
function signUpAPI(signUpData){
    return axios.post('http://localhost:3065/api/user/', signUpData);
}

function* login(){
    try{
        //yield call(loginAPI);
        yield delay(2000);
        yield put({     // put 은 dispatch와 같은 기능
            type:LOG_IN_SUCCESS
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

function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST, login);
}
function* watchSignUP() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchSignUP),
    ]);
}