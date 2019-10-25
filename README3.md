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