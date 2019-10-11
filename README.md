# React 로 만드는 nodebird 프로젝트
---------------------------------

## React frontend 설치 과정 정리
* frontend 폴더에서 npm init.
* npm i react react-dom next 설치.
* npm i -D nodemon webpack 설치.
  - nodemon : node.js 기반의 어플리케이션 개발시 파일 변경이 감지될 때 자동으로 재시작하도록 도와주는 툴.
* 혹시 git을 연결 했을 경우 .gitignore파일을 만들어 올릴 필요없는 파일들을 제외 시킨다.
  - node_modules폴더는 제외시킴... 
  - ignore 해야할 목록을 알려주는 사이트 (https://www.gitignore.io/)
* npm i -D eslint 설치
  - 사람마다 코딩 스타일이 다르므로 그것을 정해진 규칙대로 코딩스타일을 맞춰서 하게끔 하기 위함.
* eslint가 설치 되었으면 eslint설정을 한다.
  - frontend 에 .eslintrc 파일 생성.
```
{
    "parserOptions": {
        "ecmaVersion": 2019,    // javascript 버전 
        "sourceType": "module", // js 코드에서 모듈 시스템을 이용하여 할거기 때문에 module
        "ecmaFeatures": {
            "jsx": true         // jsx는 원래 eslint에서 경고를 띄워줌(html코드가 있어서..) 여기서 true로 해 놓으면 eslint가 허용해줌.
        },
        "env": {
            "browser": true,    // 브라우져 환경에서 볼꺼기 때문에 true
            "node": true,       // react에서 nodejs를 쓰기때문에 true
        },
        "extends": [            // 여러가지 룰들을 켜기 위함.
            "eslint:recommended",   // eslint가 기본적으로 추천해주는 코딩 스타일을 켬.
            "plugin:react/recommended"  // react를 사용할때  eslint가 추천하는 기본 코딩 스타일을 켬.
        ],
        "plugins": [            // 에디터별로 eslint가 지원하지 않을 수 있어서 활성화 시켜줌.(npm 으로 직접 설치 해줘야함)
            "import",           // import를 사용
            "react-hooks"       // react-hooks를 사용
        ]
    }
}
```
* eslint에서 plugins에 적어줬던 것들을 설치한다.
  - npm i -D eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks
  - 개발할때만 쓰는거기때문에 devDependencies 에 넣어주는게 좋음.
* next는 자체 router가 있기 때문에 react-router를 안씀.
* pages폴더를 생성하고 index.js파일 생성
```
const Home = () => {
    return (
        <div>Hello Next!</div>
    );
}
export defalut Home;
```
* next를 이전에 설치를 했기때문에 next를 이용해서 띄움.
  - next는 webpack dev server처럼 사용할 수 있게 해준다.
  - package.json에 script를 아래와 같이 등록해놓고 next로 띄워주면 동작함(npm run dev).
```
"scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
},
```
* next에서는 맨 위에 import React from 'react'를 안해도 됨 하지만 결국은 useState등을 사용할 꺼기 때문에 쓸 수밖에 없으나...

## next 라우팅 시스템
* next에서는 폴더 구조대로 파일명을 router로 사용하므로 따로 router코딩을 하지 않는다.
  - 예를 들어 pages&gt;user폴더 및에 create.js파일을 만들면 url 라우터 경로는 루트/user/create가 된다.
  - 추 후 prosaction모드(next start)로 빌드하면 소스 노출이 되지 않기 때문에 보안상에도 문제가 없다. 기본적으로 코드 스플리팅이 적용되어있음.
    - code splitting : 번들링된 js파일을 적절히 분리하여 필요한 파일만 불러오는 lazy-load하는 방식.

## ant design 적용하기 (https://ant.design) (npm i antd)
* 실무에서는 사용할 수도 있고 따로 만들어 사용할 수도 있다.
* 개발자가 따로 개발자용 사이트나 어드민사이트 같은거 만들때 유용함.
* ant design으로 커버가 되지않은 부분은 styled component로 대체한다. (npm i styled-components)
* 각 layout에 따라 소스코드가 있기 때문에 코드를 가져다 쓸 수 있음.
* 순서
  - npm i antd 해서 ant design을 사용하기 위한 설치를 진행한다.
  - 먼저 layout을 만들기 위해서 components폴더를 생성하고 AppLayout.js파일을 생성한다.
  - 상단 menu를 만들기 위해 ant design사이트에서 menu부분 코드를 가져다 쓴다.(https://ant.design/components/menu/)
  - index.js파일에서 AppLayout.js콤포넌트를 가져다 쓰면서 children으로 내용을 전달한다.
  - ant design이 적용 안되어있으므로 css를 head에 불러와 적용해줘야 한다.
  - next에서는 head에 css를 불러와 쓸때 index.js에서 import Head from 'next/head' 해준다음
  - jsx에서 head코딩을 한다.(https://nextjs.org/docs#populating-head)
```
<Head>
    <title>노드버드</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.5/antd.min.css" />
</Head>
```
  - 다음으로 AppLayout.js에서 틀어진 css를 더 이쁘게 적용한다. react에서 style을 적용할때는 내용에 객체로 넣는걸 추천.

## 기본 페이지 만들기
* profile.js, signup.js 파일을 생성하고 
* Head, AppLayout 을 똑같이 코딩하여 채워 넣는다.
* AppLayout콤포넌트에서는 Menu.Item에 각 페이지의 Link를 걸어준다.(import Link from 'next/link';)
* 현재까지 코딩시 Head부분과 AppLayout코딩하는 부분들의 중복 코딩이 발생한다. 이부분은 추 후 개선필요.

## 회원가입 폼 만들기
* signup.js파일에 코딩 진행 참조.
  - input 에는 항상 value, onChange를 짝을 지어줘야 한다.
  - 각 form의 input을 만들고 state와 onchange함수, setState를 코딩한다.

## 회원가입 state와 custom hook(커스텀훅)
* console.log는 eslint에서 기본적으로 에러체크를 한다. webpack에서 자동으로 제외 시키게 하던지 아니면 모두 지워주는게 좋음.
* 폼 검증 로직 추가.
* 반복적으로 사용되는 hooks는 custom hook으로 만들어서 추가적인 작업을 더 넣어 만들어 줄 수도 있다.(signup.js파일 내부 소스 참조)
  - 비슷한 처리를 하는 input을 커스텀으로 만들면 state선언과 onchange함수을 한꺼번에 custom hook을 사용해서 쓸 수 있으므로 편리함.
```
const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = (e) => {
        setter(e.target.value);
    }
    return [value, handler];
}
const [id, onChangeId] = useInput('');
const [nick, onChangeNick] = useInput('');
const [password, onChangePassword] = useInput('');
```
* hooks를 사용하는 함수형 컴포넌트에서는 자식 컴포넌트로 넘겨주는 props의 function은 모두 useCallback으로 감싼다.
  - 이유 : hooks컴포넌트는 리렌더링 될때마다 모두 다시 렌더링 하기 때문에 jsx에 바인딩 된 props들도 모두 새로 생성해서 넘겨주므로 비효율적이다.
  - 그래서 useCallback을 사용하여 원하는 state가 바뀌었을때만 다시 렌더링 하게 적용한다. 
  - const onChange = useCallback(첫번째는 함수, 두번째는 바뀔state배열); 빈 배열state는 최초 한번만 함수를 생성한다.
  - useMemo와 useCallback은 거의 비슷하다. 문자열, 숫자, 객체 같은건 useMemo, 함수는 useCallback을 사용.

## ----------------------------------------
## SNS 화면 만들기
## ----------------------------------------

## next에서 제공하는 파일, 폴더
* next에서 제공하는 기본파일,폴더들
  - _document.js : html, head, body를 담당.
  - _app.js : root
  - pages : 실제 컴포넌트들.
  - _error.js : 에러가 발생한다면 호출되는 화면.

## _app.js로 레이아웃 분리하기 (그 외 기본 next에서 제공하는 파일 _document.js, _error.js)
* head, AppLayout들이 모든 페이지에 들어가 있어서 계속 렌더링 되는 비효율적인 이슈가 있어서 따로 분리가 필요함.
* next에서는 pages안에 _app.js파일을 만들면 이하 화면들은 자동으로 _app.js를 부모콤포넌트로 사용한다.
* 우리프로젝트에서는 _app.js안에 **공통으로 쓰는 layout부분**을 넣는다.
* _app.js는 props로 Component를 받는다(next에서 처리하는것임). 그것을 내용으로 사용한다. &lt;Component/&gt;
* 하나의 콤포넌트 안에서도 여러가지 자식 컴포넌트를 모두 따로따로 렌더링이 안되게 처리 하고자 할때는 각각의 컴포넌트에 React의 memo로 씌워준다.
  - 상황에 따라 다르겠지만 너무 세세한 최적화는 불필요 할 수도 있다.
```
// Input 컴포넌트는 antd에서 만든 컴포넌트 이기때문에 수정할 수가 없어서 아래와 같이 코딩한다.
import {memo} from 'react';
const TextInput = memo(({value, onChange}) => {
    return (
        <Input name="user-id" value={value} required onChange={onChange} />
    );
});

// 사용부분
<TextInput value={value} onchange={onChangeId} />
```

## prop-types(npm i prop-types 설치) (https://www.npmjs.com/package/prop-types)
* 부모로부터 자식에게 전해지는 props가 제대로 올바른 자료형으로 전해졌나 파악할 수 있는것.
* _app.js에 Component를 propTypes를 정해준다. Component : PropTypes.node (node는 jsx에서사용하는 모든 태그들 전체)
* jsx처럼 받는 부분은 node가 아닌 elementType으로 한다. 위 줄 오류발생.

## antd 그리드 시스템 사용(https://ant.design/components/grid/)
* Row, Col, Card, Card.Meta 등과 xs, md등의 속성등도 파악 필요.
* 실제 데이터가 없을경우 dummy데이터를 변수로 만들어서 우선 적용한다.
* Card actions사용 (로그인 부분)

## 커스텀 훅 재사용하기
* 이전에 만들어 놓은 useInput 커스텀훅을 재사용할 수 있다.
* AppLayout에 Login폼을 붙이기 위해 LoginForm.js컴포넌트를 만들어 이전에 만든 useInput커스텀훅을 재사용한다.
* useInput은 export되어 있어야 한다.
```
import { useInput } from '../pages/signup';

const LoginForm = () => {
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        console.log({id, password});
    });

    return (
        <Form onSubmit={onSubmitForm}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <Input name="user-id" value={id} onChange={onChangeId} required />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
            </div>
            <div>
                <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </div>
        </Form>
    );
}

export default LoginForm;
```

## 메인화면 만들기
* 노드버드 메뉴의 메인화면을 구성한다.(index.js 참조)
* antd 를 최대한 활용하여 만든다. index.js파일 소스 참조.
* 추 후 조건문, 반복문 기준으로 컴포넌트를 분리하는게 좋음.

## 프로필 화면 만들기
* antd를 이용하여 닉네임form, 팔로잉목록List, 팔로워목록List 를 추가.
* profile.js파일 참조

## 컴포넌트 분리하기
* 보통은 조건문, 반복문, Form 들을 기준으로 분리를 한다.
* index.js에서 (PostCard.js, PostForm.js)를 분리.
* profile.js에서 (NicknameEditForm.js)를 분리.
* AppLayout.js에서는 (UserProfile.js, LoginForm.js) 분리.
* props를 받는 컴포넌트는 prop-types 를 지정해 준다.
  - 객체는 PropsTypes.object로 해도 되지만 좀 더 자세한 설정을 하기 위해서는 PropsTypes.shape()를 사용한다.(https://www.npmjs.com/package/prop-types)

## ----------------------------------------
## 리덕스 익히기
## ----------------------------------------

## redux 주요 개념 소개
* 흩어져 있는 dummy데이터들을 redux로 관리하게 된다.
* 보통 복잡한 state는 redux를 쓰고 간단한 state는 react에서 바로 쓴다.
* action -> state를 바꾸는 행동.(react의 setState와 비슷))
  - dispatch -> action을 실행.
* reducer -> action의 결과로 state를 어떻게 바꿀지 로직을 정리.
* redux는 react와는 별개로 어디서든 쓸 수 있는 구조이다.

## 첫 리듀서 만들기
* 설치 (npm i redux react-redux) 리덕스는 리엑트와 별개이기 때문에 react-redux가 react와 연결시켜주는 기능을 함.
* reducers폴더 생성 -> 안에 데이터의 그룹별로 index.js, user.js, post.js파일 생성
* redux는 하나의 파일을 사용하면 양이 크므로 그룹별로 나눠서 적용하고 최종 하나로 묶어주는 루트 state파일이 있어야 한다.(combineReducers)
* 최초 user.js파일을 예시로 reducer를 만들어 본다.
  - store(initialState)객체랑 reducer, action은 여러군데서 사용할 수 있으므로 export해준다.
* 리듀서 switch에는 default가 반드시 있어야 한다.
```
export const initialState = {
    isLoggedIn: false,
    user: {},
};

// action
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const loginAction = {
    type: LOG_IN,
    data: {
        nickname: 'redsky',
    }
};
export const logoutAction = {
    type: LOG_OUT,

}

// reducer
const reducer = (state=initialState, action) => {
    switch( action.type ){
        case LOG_IN: {
            return {
                ...state,
                isLoggedIn: true,
                user: action.data,
            }
        }
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                user:null,
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
```
## 불변성과 리듀서 여러개 합치기
* post.js 리듀서 코딩 만들기
  - 불변성을 위하여 스프레드 문법을 사용하여 객체를 복사해서 사용한다.(또는 immutable을 사용한다.)
  - 가독성을 좋게 하기 위하여 immutable 을 사용하기도 한다.
  - store객체랑 reducer, action은 여러군데서 사용할 수 있으므로 export해준다.
* 리듀서 switch에는 default가 반드시 있어야 한다.
```
export const initialState = {
    mainPosts: [],
};

// action
export const ADD_POST = 'ADD_POST';
export const ADD_DUMMY = 'ADD_DUMMY';

export const addPost = {
    type: ADD_POST,
};
export const addDummy = {
    type: ADD_DUMMY,
    data: {
        content: 'Hello',
        UserId: 1,
        User: {
            nickname: 'redsky'
        }
    }

}

// reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
            }
        }
        case ADD_DUMMY: {
            return {
                ...state,
                mainPosts: [action.data, ...state.mainPosts],
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
```
* 코딩한 user.js, post.js 리듀서를 index.js에서 하나로 합친다.
  - redux의 combineReducers 를 이용하여 하나로 합친다.
  - user, post에 연결되어있는 initialState를 루트인 index.js에서 하나로 엮어놓은 구조라고 생각하면 됨.
```
import {combineReducers} from 'redux';
import user from './user';
import post from './post';

const rootReducer = combineReducers({
    user,
    post
});

export default rootReducer;
```
## redux와 react 연결하기
* 예상해서 만들어 놓은 redux구조를 react화면에 붙이는 과정에서 상황에 따라 수정이 발생할 일이 많다.
* 그냥 react에서 redux를 붙이는 방식과 next에서 붙이는 방식은 조금 다름. study필요.
* next에서는 **(npm i next-redux-wrapper)** 설치가 하나 더 필요함.
* next-redux-wrapper는 props로 받는 store를 실제로는 구현이 안되어 있기 때문에 그 부분을 처리 해주는 것.
  - withRedux부분 코드는 모든 프로젝트에서 같게 쓰므로 그냥 외우면 됨
  - 합쳐진 reducer와 state를 합쳐서 store로 만들어 리턴.
```
export default withRedux((initialState, options)=>{
    const store = createStore(reducer, initialState);
    return store;
})(NodeBird);
```
* 레이아웃역할을 하는 _app.js에 redux를 연결하는 코딩을 한다.
  - store는 state, action, reducer가 합쳐진 것.
```
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
```

## redux devtools 사용하기
* react-redux의 Provider를 이용하여 연결시 store값을 전달 해야하는데 store값 가져오는 부분과 devtools를 연결하는 부분을 설명.
* redux devtools를 사용하기 위해서는 코드를 연결해줘야 한다.
  - 미들웨어를 추가한다.
```
import {createStore, compose, applyMiddleware} from 'redux';

export default withRedux((initialState, options)=>{
    // 커스터마이징 코드 추가
    // options.isServer로 window가 undefined여부를 판단할 수 있음.
    // 추후 redux의 확장기능을 추가 하기 위해서는 미들웨어를 추가할 수 있다.
    const middlewares = [];
    const enhancer = compose(
        applyMiddleware(...middlewares),
        !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f)=>f,
    );
    const store = createStore(reducer, initialState, enhancer);
    return store;
})(NodeBird);
```
## react-redux 훅 사용하기. 공식문서(https://react-redux.js.org/next/api/hooks)
* pages/index.js참조
* react-redux 7.1.1부터 사용가능.
* class형 컴포넌트는 connect를 사용하고 함수형훅스 컴포넌트는 redux 훅을 사용한다.(useDispatch, useSelector)
* useEffect의 두번째 배열인자가 없을때는 componentDidMount와 같으므로 이 부분에서 리듀서의 action을 dispatch해본다.
```
import {useDispatch} from 'react-redux';
import { LOG_IN, loginAction } from '../reducers/user';

// redux의 hook(useDispatch)을 이용하여 사용.
const dispatch = useDispatch();
useEffect(() => {
    dispatch({
        type: LOG_IN,
        data: {
            nickname: 'redsky'
        }
    });
    // action처리 함수를 불러와서 action함수로 처리해도 된다.
    dispatch(loginAction);
}, []);
```
* 리덕스의 state를 가져다 쓰는 방법(useSelector)
  - const {isLoggedIn, user} = **useSelector**(state=>state.user);

## react-redux connect
* 위에서 사용한 redux의 hooks를 사용하기 전에는 connect hoc를 이용하여 사용하였다.
  - 기존방식 코딩 방법
```
// store안의 state 값을 props로 연결한다.
const mapStateToProps = (state) => {
    return {
        trendChartData: state.sales.get('trendChartData')
    };
};
/* 액션 생성자를 사용하여 액션을 생성하고,
    해당 액션을 dispatch 하는 함수를 만들은 후, 이를 props 로 연결해줍니다.
*/
const mapDispatchToProps = (dispatch) => ({
    onSetTrendChart: (params) => dispatch(setTrendChart(params))
});
TrendChartContainer = connect(mapStateToProps, mapDispatchToProps)(TrendChartContainer);


export default TrendChartContainer;
```
## dummy 데이터를 리덕스로 옮겨 사용하기.
* 기존 dummy데이터로 화면에 만들어 놨던 임시 데이터를 redux의 state로 옮기고 그것을 useSelector로 가져와 화면에 바인딩 한다.
* useSelector로 가져와 사용할 때 최대한 잘게 쪼개서 가져와 바인딩하면 rendering을 줄일 수 있어서 좋다.
```
// redux의 state를 가져와 쓰는 방법
const { isLoggedIn, user } = useSelector(state => state.user);
const { mainPosts } = useSelector(state => state.post);

// redux의 hook(useDispatch)을 이용하여 사용.
const dispatch = useDispatch();
useEffect(() => {
    dispatch(loginAction);
}, []);


return (
    <div>
        {isLoggedIn ? <div>로그인 했습니다: {user.nickname}</div>:<div>로그아웃 했습니다.</div>}
        { isLoggedIn && <PostForm /> }
        {
            mainPosts.map((v, i) => {
                return (
                    <PostCard key={+v.createdAt} v={v} />
                );
            })
        }
        
    </div>
);
```
* dummyData를 모두 redux로 옮기고 일단 로그인 처리 됬을때는 dummy User값을 셋팅하게 적용해 놓는다.
* 기존에 index.js파일에 loginAction을 처리했던 부분을 삭제하고 로그인 버튼을 클릭했을때 처리 되게 소스를 옮긴다.(LoginForm.js)
```
const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    console.log({id, password});
    dispatch(loginAction);
}, [id, password]);
```
* 같은 방법으로 로그아웃버튼을 만들어 구현해본다.(UserProfile.js에 버튼추가 후 logoutAction호출)

## 리액트 state와 리덕스 stete
* 회원가입 폼에서 state처리 작업중 동적인 데이터 처리 할때는 함수로 처리.(user.js참조)
```
// 동적인 데이터 처리는 함수로 argument를 받아서 셋팅한다.
export const signupAction = (data) => {
    return {
        type: SIGN_UP,
        data: data
    }
}
```
* 각각의 요소(id, password, nick) 등으 값들을 모두 리덕스state로 대체하면 이벤트가 일어날 때 마다 action이 호출 되기도 하고 코딩 양도 많아진다.
* 상황에 따라 객체로 묶어서 하나로 action처리 하는게 좋음.
  - (signup.js)
```
dispatch(signupAction({
    id,
    password,
    nick
}));
```

## ----------------------------------------
## 리덕스 사가 배우기
## ----------------------------------------

## 리덕스 사가의 필요성과 맛보기
* 리덕스는 항상 동기 처리만 가능하므로 비동기 처리를 위해서는 리덕스사가의 추가 기능 사용한다. react미들웨어 추가.
  - (npm i redux-saga)
  - function* generator(){} 문법을 사용할거임.(무한의 개념과 비동기처리시 많이 사용함)
  - generator가 어렵다면 사가의 패턴을 이용하여 패턴대로만 진행 할 수도 있음.
* sagas폴더 생성후 reducers와 같이 index.js, post.js, user.js파일을 생성한다.
* index.js(reducer와 같이 합쳐주는 index.js파일이 있어야 한다.)
```
import {all, call} from 'redux-saga/effects';
import user from './user';
import post from './post';

export default function* rootSage(){
    yield all([
        call(user),
        call(post),
    ]);
}
```
* 리덕스사가를 이용한 login 코딩 (user.js)
  - 리덕스의 LOG_IN 액션을 이용하여 사가가 대기하고있다가 비동기로 실행 하게끔 처리.
  - redux-saga의 all, call등은 study필요.
```
import { all, fork, takeLatest, call, put} from 'redux-saga/effects';
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user';

function loginAPI(){
    // 서버요청 부분
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
    yield takeLatest(LOG_IN, login);
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
    ]);
}
```

## 사가 미들웨어 리덕스에 연결하기
* sagas폴더에 middleware.js파일을 생성한다.(middleware파일을 따로 만들어서 하면 에러가 남. )
  - 그냥 _app.js에 redux compose할때 바로 생성해서 middleware넣어주면 됨.
  - 또한 사가미들웨어에 root사가를 연결해줘야 한다. 
```
export default withRedux((initialState, options)=>{
    // 사가 미들웨어 추가
    const sagaMiddleware = createSagaMiddleware();

    // 커스터마이징 코드 추가
    const middlewares = [sagaMiddleware];
    const enhancer = compose(
        applyMiddleware(...middlewares),
        !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f)=>f,
    );
    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);
    return store;
})(NodeBird);
```




## React backend 설치 과정 정리
