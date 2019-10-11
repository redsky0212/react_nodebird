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
export const LOG_IN = 'LOG_IN';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';
export const SIGN_UP = 'SIGN_UP';

export const loginAction = {
    type: LOG_IN,
    data: {
        nickname: 'redsky',
    }
};
export const logoutAction = {
    type: LOG_OUT,

}
// 동적인 데이터 처리는 함수로 argument를 받아서 셋팅한다.
export const signupAction = (data) => {
    return {
        type: SIGN_UP,
        data: data
    }
}

// reducer
const reducer = (state=initialState, action) => {
    switch( action.type ){
        case LOG_IN: {
            return {
                ...state,
                isLoggedIn: true,
                user: dummyUser,
            }
        }
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                user:null,
            }
        }
        case SIGN_UP: {
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