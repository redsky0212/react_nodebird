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
## 서버사이드 렌더링(SSR) (localhost:3060 으로 바꿈)(https://github.com/ZeroCho/react-nodebird/tree/master/ch7/front)
* SPA 에서 **검색엔진 노출**을 위한 작업 필요.
* postman을 이용하여 체크(사이트를 요청해서 화면의 상태를 확인할 수 있다.)
  - localhost:3060을 postman으로 확인해 보면 ajax로 가져오는 컨텐츠 부분이 모두 비어있는것을 확인할 수 있다.
* 서버사이드렌더링은 pages쪽 화면들만 가능하다.
* next를 쓰는 가장 큰 이유... 서버사이드 렌더링(getInitialProps: 메서드에서 데이터를 가져올 수 있다.)
  - getInitialProps는 서버쪽, client쪽에서 한번씩 실행되므로 이곳에서 SSR을 처리한다.
* 우선 pages/index.js 파일을 SSR처리 해보자.
  - useEffect에서 처리한 dispatch 부분을 모두 getInitialProps 쪽으로 옮긴다.
  - dispatch메서드는 context.store에서 가져올 수 있다.
  - 상위 _app.js 에서 넘겨준 pageProps = await Component.getInitialProps(ctx); ctx가 context이다.
```
Home.getInitialProps = async (context) => {
  console.log(Object.keys(context));
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  });
};
```
* 최초 화면 로딩할때 가져오는 useEffect에서 호출하는 dispatch하는 데이터를 모두 getInitialProps 쪽으로 옮겨온다.
  - dispatch는 getInitialProps에서 넘겨받은 context.store에서 가져올수있다.
  - 하지만 실행이 제대로 안됨. 상위 _app.js에서 하나 더 설정 해줘야함.
  - npm i next-redux-saga를 설치하고 withReduxSaga를 연결해서 next에서 saga를 사용할 수 있게 해줘야 서버사이드렌더링을 제대로 할 수 있다.
  - _app.js에 hoc방식으로 연결해준다. withRedux(configureStore)(withReduxSaga(NodeBird))
  - withReduxSaga는 config함수를 넣어주는 부분이 없으므로 store에 (store.sagaTask = sagaMiddleware.run(rootSaga);) 부분을 연결해줘야 한다.
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
* SSR은 pages에서만 해줘야 하기 때문에 기존에 AppLayout.js에 있던 dispatch 들을 우선 _app.js로 옮겨온 다음 SSR처리를 해보자.
  - saga ajax호출시 쿠키관련 withCredentials 설정 내용이 SSR처리시에는 적용이 되지 않는다. 왜냐하면 frontend에서 browser에서 바로 호출하는게 아니고
    frontend에서 frontend서버를 통해서 backend서버로 호출하기 때문이다.
  - 그래서 쿠키설정 관련 내용을 SSR에 맞게 다시 코딩 해줘야 한다.
```
NodeBird.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};
  const state = ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : '';    // isServer일때는 cookie값을 가져와서
  axios.defaults.headers.Cookie = '';
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;     // 쿠키값을 직접 코딩으로 셋팅 해줘야 한다.
    // axios.defaults.headers.Authorization = token; // 이런식으로 토큰넘기는 방식으로도 할 수 있다.
  }
  if (!state.user.me) { // user정보가 없을경우 user정보를 가져오는 saga ajax호출을 한다.
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx) || {};
  }
  return { pageProps };
};
```

* 서버사이드렌더링으로 바뀜에 따라서 문제가 발생한다.
  - client가 서버로 요청을 보낼때 withCredentials: true, 이런 부분에서 동작이 되지 않을 가능성이 있음.
  - client의 browser가 쿠키를 같이 동봉해서 보내므로 괜찮으나
  - 서버사이드렌더링일때는 browser가 따로 없으므로 쿠키를 따로 넣어주는 역할을 하지않으므로 직접 넣어서 보내줘야한다.
  - getInitialProps의 context.ctx.req.headers.cookie에 그 값이 있으므로 그 값을 직접 axios요청시 보내준다.
  - axios.defaults.headers.Cookie = 쿠키값;
  - 한번 해주면 모든 axios에 다 적용이 됨.
  - client환경인지 서버환경인지 체크해서 서버환경일때만 넣어주는 로직으로 작성하는게 좋음.
  - ctx.isServer로 체크하여 분기를 한다.

* pages/hashtag.js 의 useEffect의 dispatch를 옮겨본다.
```
Hashtag.getInitialProps = async (context) => {
    const tag = context.query.tag;
    console.log('hashtag getInitialProps', tag);
    context.store.dispatch({
        type: LOAD_HASHTAG_POSTS_REQUEST,
        data: tag,
    });
    return { tag };
};
```
* user.js도 옮겨준다.
```
User.getInitialProps = async (context) => {
    const id = parseInt(context.query.id, 10);
    console.log('user getInitialProps', id);
    context.store.dispatch({
        type: LOAD_USER_REQUEST,
        data: id,
    });
    context.store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: id,
    });
    return { id };
};
```

## 리덕스 사가 액션 로깅하기
* 액션이 실행되었는지 로그를 찍어본다. 사가 에러 찾기 위한 커스텀 미들웨어 적용 방법 알아두기.
```
const middlewares = [sagaMiddleware, (store) => (next) => (action) => {
    console.log(action);
    next(action);
}]
```

## SSR에서 내정보 처리하기
* _app.js에 LOAD_USER_REQUEST 내정보를 가져오는 ajax를 날리고 profile화면에서 바로 내정보의 me를 가져와 쓰려고 하기때문에 문제가 생김.
  - 아직 내정보의 success가 완료 되지 않았는데 me를 쓰려고 해서 문제가 생김.
  - ajax시 id가 있으면 그 id로 호출하면 되고 없으면 기본값으로 처리해서 나의정보를 가져와라고 해야할것같다.
* 게시글 삭제 기능 넣기
  - PostCard.js 등 파일 수정.

## 페이지네이션 적용
* 
## 더보기 버튼
* 
## 인피니트 스크롤링
* index.js에서 스크롤 관련 코딩시작
  - window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight 세가지를 이용하여 체크한다.
  - 스크롤을 내려서 끝에가기전 300쯤에서 데이터 불러오게 코딩한다.
  - 게시글을 읽는 도중에 새로운 게시글이 추가 되는 경우를 대비해서 가져온 게시글의 최종게시글의 id를 이용하여 limit을 적용한다.
```
const onScroll = useCallback(() => {
  if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
    if (hasMorePost) {
      const lastId = mainPosts[mainPosts.length - 1].id;
      if (!countRef.current.includes(lastId)) {
        dispatch({
          type: LOAD_MAIN_POSTS_REQUEST,
          lastId,
        });
        countRef.current.push(lastId);
      }
    }
  }
}, [hasMorePost, mainPosts.length]);
```
* lastId를 이용하여 게시글 가져오는 연관된 action, saga, sequelize부분들을 모두 코딩한다.
* 최초 화면에 진입했을때는 게시글관련 state를 비워주고 더보기형태로 불러올때는 state의 리스트를 add한다.
* 더 불러올 게시글이 있을때만 ajax호출하고 없으면 ajax호출 안돼게 막는다.

## 쓰로틀링(throttling)
* 스크롤을 순간적으로 내릴때 아니면 순간적으로 많은 ajax를 호출할때 막는 방법이 takeLatest 가 있는데 그것말고 다른 effect를 사용한다.
  - takeLatest는 보내는 요청이 많은것은 어쩔수가 없고 마지막 요청만 유효하다고 체크해서 값을 가져오기때문에
  - takeLatest 대신 throttle을 사용하여 제한시간을 설정할 수 있다. (https://redux-saga.js.org/docs/api/)
  - 함수를 사용할때는 useCallback을 사용하여 꼭 캐싱해준다. (이것때문에 여러번 호출 될 수도있음.)


## immer로 불변성 쉽게 쓰기( npm i immer )
* import produce from 'immer';
* switch문을 produce함수로 감싸고 draft.상태명 과 같은 방법으로 적용한다. (https://immerjs.github.io/immer/docs/introduction)
* state대신에 draft를 사용하고 불변성 지키는 코드를 모두 지우고 바로 대입하는 방식으로 코딩하면 된다. 불변성은 immer가 해준다.
```
return produce(state, (draft) => {
  switch (action.type) {
    case UPLOAD_IMAGES_REQUEST: {
        break;
    }
    case ADD_COMMENT_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
        draft.mainPosts[postIndex].Comments.push(action.data.comment);
        draft.isAddingComment = false;
        draft.commentAdded = true;
        break;
    }
  }
};
```
## 프론트단에서 리덕스 액션 호출 막기
* 순간적으로 여러번 ajax호출하는것 제한하는 방법 
  - frontend에서 막는 방법은 현재 보낸 ajax를 다시 보내지 않기 위해 보낸특정값을 변수로 저장하고 그 변수값이 있을경우에는 다시 보내지 않게 예외처리한다.
  - saga의 throttle은 saga에서 막는거지 frontend에서 보내는것 자체는 막을수가 없음.

## 개별 포스트 불러오기
* 실제로 SSR 렌더링을 확인해보기 위해 각각의 게시글을 볼 수 있는 페이지가 필요하여 따로 페이지를 만듬.
* 여러가지 복잡한 태그로 인해 검색엔진이 컨텐츠를 쉽게 체크하기위해 두가지 정도의 방법이 있다.
  - meta tag활용.

## react-helmet으로 head태그 조작하기(https://www.npmjs.com/package/react-helmet)
* head에 meta tag를 활용하기 위해 helmet을 이용한다.
* 현재 helmet의 title, description등을 태그형태로 적용하는 방법도 있는데 그것은 문제가 있음.
```
<Helmet
    title={`${singlePost.User.nickname}님의 글`}
    description={singlePost.content}
    meta={[{
      name: 'description', content: singlePost.content,
    }, {
      property: 'og:title', content: `${singlePost.User.nickname}님의 게시글`,
    }, {
      property: 'og:description', content: singlePost.content,
    }, {
      property: 'og:image', content: singlePost.Images[0] && `http://localhost:3065/${singlePost.Images[0].src}`,
    }, {
      property: 'og:url', content: `http://localhost:3060/post/${id}`,
    }]}
  />
```
* frontend에 위와같이 넣어주고 SSR을 위해 또 처리해줘야 검색엔진이 알 수 있으므로 pages/_document.js파일을 생성하고 class문법으로 코딩한다.
  - _document.js : next에서 html의 역할을 한다.
  - _document.js를 사용할때는 기본적으로 사이트 태그 형태를 작성을 다 해줘야한다. html, head, body...

## react-helmet SSR
* _app.js쪽도 helmet으로 모두 대체한다.

## styled-components (https://www.styled-components.com/docs/api)
* const ImgWrapper = styled.div``; 이런식으로 컴포넌트를 생성한다음 스타일을 뒤에 넣어주고 사용하는부분에는 생성한 컴포넌트 이름을 넣어준다.
* 스타일드컴포넌트를 모든 태그에 다 변수를 만들어서 적용 하기 보다는 상위태그를 변수로 정하고 하위태그는 그대로 사용하여 자식 css적용하는 기법으로 styled-components를 한다.
  - https://www.styled-components.com/docs/api#supported-css

## styled-components SSR
* 스타일드컴포넌트도 SSR을 적용할 수 있다.
```
import { ServerStyleSheet } from 'styled-components';

static getInitialProps(context) {
  const sheet = new ServerStyleSheet();
  const page = context.renderPage((App) => (props) => sheet.collectStyles(<App {...props} />));
  const styleTags = sheet.getStyleElement();
  return { ...page, helmet: Helmet.renderStatic(), styleTags };
}
```
* 이렇게 코딩하고 사용하는 부분에 아래와 같이 head안에 추가코딩한다.
```
<head>
  {this.props.styleTags}
</head>
```

## 기타기능구현 Q&amp;A
*
## 폴더구조와 _error.js
* 정답은 없음 중복제거, 등등.