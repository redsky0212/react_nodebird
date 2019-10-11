const dummyUser = {
    nickname: 'redsky',
    Post: [],
    Followings: [],
    Followers: [],
};

export const initialState = {
    isLoggedIn: false,
    user: null,
    signUpData: {},
};

// action
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';

export const loginAction = {
    type: LOG_IN_REQUEST,
    data: {
        nickname: 'redsky',
    }
};
export const logoutAction = {
    type: LOG_OUT_REQUEST,

}
// 동적인 데이터 처리는 함수로 argument를 받아서 셋팅한다.
export const signupAction = (data) => {
    return {
        type: SIGN_UP_REQUEST,
        data: data
    }
}

// reducer
const reducer = (state=initialState, action) => {
    switch( action.type ){
        case LOG_IN_REQUEST: {
            return {
                ...state,
                isLoggedIn: true,
                user: dummyUser,
            }
        }
        case LOG_OUT_REQUEST: {
            return {
                ...state,
                isLoggedIn: false,
                user:null,
            }
        }
        case SIGN_UP_REQUEST: {
            return {
                ...state,
                signUpData: action.data
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default reducer;