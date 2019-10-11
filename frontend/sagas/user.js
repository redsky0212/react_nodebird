import { all, fork, takeLatest, call, put} from 'redux-saga/effects';
import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user';

function loginAPI(){
    // 서버요청 부분
    // axios처리
}

function* login(){
    try{
        yield call(loginAPI);
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

function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST, login);
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
    ]);
}