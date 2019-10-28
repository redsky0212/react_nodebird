# 기능 완성해나가기
---------------------------------

## 해시태그 링크로 만들기
* PostCard.js 내용중에 포함된 해시태그 text를 next/link를 이용하여 링크를 적용시켜 이동할 수 있게 한다.
* 글 내용(post.content)부분의 해시태그분리 작업은 따로 컴포넌트로 빼서 붙인다. (PostCardContent.js) 
* 해당글의 해시태그 부분의 text에 링크를 걸어주고나서 클릭시 이동하는 url부분에 '/hashtag/:해시태그text' 와 같이 라우팅을 하려고 한다.
  - frontend의 next에서는 이런 구조가 불가능 하다. 하지만 node express는 가능하다.
  - 그래서 node express를 사용해서 적용한다.
  - 따라서 frontend에도 express를 서버와 같이 express를 연결해야한다.

## frontend 에서 next와 express 연결하기(하는 이유는 링크 url에 동적인 와일드카드로 넘길 수 있으므로 express를 사용하여 적용하기 위함.)
* npm i morgan express express-session cookie-parser dotenv (express를 설치 하면서 연관된 것들 같이 설치 해주는게 좋음.)
* npm i -D nodemon 개발환경에서 사용해야하므로 설치
* 위 모듈 설치 했으면 frontend에도 똑같이 server.js파일을 만들어서 아래내용 코딩 한다.
```
const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
dotenv.config();

app.prepare().then(() => {
    const server = express();

    server.use(morgan('dev'));
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(cookieParser(process.env.COOKIE_SECRET));
    server.use(expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,  // 서버와 쿠키 secret은 같아야 한다. 다르면 서로 해독이 되지 않는다.
        cookie: {
            httpOnly: true,
            secure: false,
        },
    }));

    server.get('/hashtag/:tag', (req, res) => {
        return app.render(req, res, '/hashtag', { tag: req.params.tag });
    });

    server.get('/user/:id', (req, res) => {
        return app.render(req, res, '/user', { id: req.params.id });
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(3060, () => {
        console.log('next+express running on port 3060');
    });
});
```
* .env파일도 서버와 같이 맞춰서 생성하여 내용 채워준다.
* package.json파일의 scripts dev 부분도 'next'로 하지 않고 'nodemon'으로 바꾼다.
* express와 nodemon을 사용하므로 nodemon.json 파일도 필요하다. 내용은 frontend에 맞게 수정한다.
```
{
    "watch": [
        "server.js",
        "nodemon.json"
    ],
    "exec": "node server.js",
    "ext": "js json jsx"
}
```
* frontend에도 서버가 생겼으므로 dummydata가 다 필요없음. action.data로 수정
* 최초 화면 로딩시 로그인이 되어있어도 잠시 로그인 안됀 화면이 보이는데 그 처리를 서버사이드 렌더링으로 처리 할꺼임.

## getInitialProps 로 서버 데이터 받기
* 구현해야할 내용은 
  - 해시태그 눌렀을때 '/hashtag/:tag' 이런 구조로 해시태그에 해당하는 글을 가져오게 처리 해야함
  - 또한 해당 유저의 프로필 아바다 아이콘 부분을 클릭했을때 '/user/:id' 이런 구조로 데이터 가져오게 처리 해야함
* 동적인 요청을 하려면 server.js파일에 라우터를 추가 해줘야함.
  - 중요한것은 server.get()으로 실제 동적요청url을 호출하면 내부적으로는 app.render()로 바꿔서 호출해준다는 의미의 소스이다.
```
server.get('/hashtag/:tag', (req, res) => {
    return app.render(req, res, '/hashtag', { tag: req.params.tag });
});

server.get('/user/:id', (req, res) => {
    return app.render(req, res, '/user', { id: req.params.id });
});
```
* 위 소스에서 나온 hashtag.js, user.js파일이 없으므로 생성해서 소스를 채워준다.
* 각 페이지js에는 'getInitialProps'메서드가 있음.(next에서 제공하는 메서드)
  - app.render(req, res, '/hashtag', { tag: req.params.tag }); 이런식으로 넘겨받은 context값을 
  - 아래와 같이 받아서 props로 적용 해서 사용할 수 있음.
```
Hashtag.getInitialProps = async (context) => {
    console.log('hashtag getInitialProps', context.query.tag);
    return { tag: context.query.tag };      // return하면 컴포넌트의 props로 전달된다.
};
```
* 각 페이지에서 getInitialProps를 사용하려면 상위 _app.js에 아래 코딩 셋팅 해줘야 연결이 됨
  - Component는 각 페이지를 의미함.
```
NodeBird.getInitialProps = async (context) => {
  console.log(context);
  const { ctx, Component } = context;
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps }; // 이부분은 _app.js의 Component의 props로 넘겨줘야함.
};
```
* getInitialProps : next의 이 라이프 사이클은 매주 중요 (서버, frontend)모두 실행이 되는 메서드임.
  - 추 후 서버사이드 렌더링할때도 많이 쓰임.

## 해시태그 검색, 유저 정보 라우터 만들기
* 

# === 서버사이드 렌더링 ===
## 서버사이드 렌더링(SSR)
* SPA 에서 **검색엔진 노출**을 위한 작업 필요.
* postman을 이용하여 체크
* next를 쓰는 가장 큰 이유... 서버사이드 렌더링(getInitialProps: 메서드에서 데이터를 가져올 수 있다.)
* 최초 화면 로딩할때 가져오는 useEffect에서 호출하는 dispatch하는 데이터를 모두 getInitialProps 쪽으로 옮겨온다.
  - dispatch는 getInitialProps에서 넘겨받은 context.store에서 가져올수있다.
  - 하지만 실행이 제대로 안됨. 상위 _app.js에서 하나 더 설정 해줘야함.
  - npm i next-redux-saga를 설치하고 withReduxSaga를 연결해서 next에서 saga를 사용할 수 있게 해줘야 서버사이드렌더링을 제대로 할 수 있다.
```
import withReduxSaga from 'next-redux-saga';

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : compose(
      applyMiddleware(...middlewares),
      !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    );
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);    // 이 부분을 추가 코딩 해줘야함.(서버사이드렌더링을 위함)
  return store;
};

export default withRedux(configureStore)(withReduxSaga(NodeBird));
```

## SSR을 위해 쿠키 넣어주기
* 서버사이드렌더링으로 바뀜에 따라서 문제가 발생한다.
  - client가 서버로 요청을 보낼때 withCredentials: true, 이런 부분에서 동작이 되지 않을 가능성이 있음.
  - client의 browser가 쿠키를 같이 동봉해서 보내므로 괜찮으나
  - 서버사이드렌더링일때는 browser가 따로 없으므로 쿠키를 따로 넣어주는 역할을 하지않으므로 직접 넣어서 보내줘야한다.
  - getInitialProps의 context.ctx.req.headers.cookie에 그 값이 있으므로 그 값을 직접 axios요청시 보내준다.
  - axios.defaults.headers.Cookie = 쿠키값;
  - 한번 해주면 모든 axios에 다 적용이 됨.
  - client환경인지 서버환경인지 체크해서 서버환경일때만 넣어주는 로직으로 작성하는게 좋음.
  - ctx.isServer로 체크하여 분기를 한다.

## SSR에서 내정보 처리하기
* 