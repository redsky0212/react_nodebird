# React 로 만드는 nodebird Backend
---------------------------------

## Backend서버 구동에 필요한 모듈들
* frontend, backend 두개의 서버가 필요함.
* 우선 backend폴더에서 npm init 한다.
* nodejs는 서버가 아니라 javascript 실행기일 뿐이다. http를 제공하기는 하나 기능이 부족하여 npm i express 설치.
* 추가 필수요소 설치 
  - npm i axios : http요청용.
  - npm i bcrypt : 비밀번호 암호화 적용용.
  - npm i cookie-parser : 로그인시 쿠키, 세션을 쓰므로 필요.
  - npm i express-session : 쿠키랑 함께 로그인 했을때 정보 저장을 위한 세션.
  - npm i dotenv : 환경변수 (비밀번호들을 여기서 관리할 수 있음.)
  - npm i cors : backend, frontend 서버간 주소가 다를경우 요청시 보안제약이 있으므로 그것을 풀어주는 모듈
  - npm i helmet hpp : 보안관련. nodejs, express의 보안을 담당.
  - npm i morgan : 서버에 로그 남기는 모듈.
  - npm i multer : 이미지 업로드 사용시.
  - npm i passport passport-local : 회원관리, 로그인 처리를 쉽게 할 수 있게 하는 모듈.
  - npm i sequelize sequelize-cli : DB로 mysql을 쓰는데 기본적인 CRUD기능 위주임. sequelize는 ORM(SQL문이랑 javascript랑 연결해주는 것)
    - ORM : Object-Relational Mapping
    - sql문을 몰라도 javascript로 DB를 조작하기 위한 모듈.
  - npm i -D eslint eslint-config-airbnb eslint-plugin-jsx-a11y : 개발시 필요한 eslint
  - npm i -D nodemon : node서버는 자동 재부팅이 안되므로 자동으로 서버 재부팅 해주는 모듈.
* 개발때는 코드 수정이 빈번하므로 package.json의 script부분을 nodemon으로 적용해서 자동재실행 되게 적용한다.
    - "scripts": {"dev":"nodemon "}
    - nodemon은 설정이 필요하다. 루트에 nodemon.json파일을 생성하여 내용을 추가한다.
    - nodemon.json (watch안에있는 파일이나 폴더가 수정되면 exec(다시실행)한다는 의미)
```
{
    "watch":[
        "index.js",
        "routes",
        "config",
        "passport",
        "models",
        "nodemon.json"
    ],
    "exec": "node index.js",
    "ext": "js json"
}
```

## HTTP 요청주소 체계 이해하기
* 최초 진입점인 index.js에 기본적인 서버 코딩을 한다.
  - localhost:3065으로 서버를 띄우고 브라우져에서 루트로 url을 진입하면 "Hello server!" 를 띄워주는 간단한 서버코드.
```
const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.send('Hello server!');
});

app.listen(3065, () => {
    console.log('server is running on http://localhost:3065');
});
```
* 요청,응답 관련(REST API, GRAPHQL)이 제일 많이 쓰임.
* REST API 규칙이 있으나 지키기 어려우므로 적당히 타협하여 url을 작성한다.
* http 기본 80   https 기본 443

## Sequelize와 ERD
* npm i -g sequelize-cli 를 글로벌로 다시 설치한다. (sequelize명령어를 바로 쳐서 사용하기 위함.)
* ( sequelize init ) 쳐서 DB구성을 위한 파일들을 자동 생성해서 구성해 준다.
* 생성된 config/config.json파일에 비밀번호 DB명 등을 셋팅해준다.
* models/index.js파일의 내용을 수정한다.(일단 아래와같이 수정한다.)
  - DB를 javascript로 컨트럴 할 수 있게 하는 모듈이다.
  - config를 불러오기 위한 url을 수정한다.
  - models/index.js는 config값을 불러와서 sequelize인스턴스를 생성해서 사용할 수 있게 해놓은 파일이다.
```
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```

* 테이블 생성 (관계도 ERD)
  - 사용자관련 테이블 (models/user.js)
  - 게시글 테이블(models/post.js)
  - 댓글 테이블(models/comment.js)
  - 해시태그 테이블(models/hashtag.js)
  - image들을 저장하는 테이블(models/image.js)
  - ERD에 따라 각 js에서 코딩한다.

* 우선 user.js 테이블 코드를 작성
```
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        nickname: {
            type: DataTypes.STRING(20), // 20글자 이하
            allowNull: false,           // false : 필수
        },
        userId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,       // 고유한 값
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },{
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글저장을 위한 셋팅
    });

    User.associate = (db) => {  // 관계도 관련 내용( 다대다, 일대다 등)
        db.User.hasMany(db.Post);   // 한사람이 여러글을 쓸 수 있다.
        db.User.hasMany(db.Comment);    // 한사람이 여러댓글을 쓸 수 있다.
    };

    return User;
}
```
