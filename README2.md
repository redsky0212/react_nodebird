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
  - npm i mysql2 : db설치
* 개발때는 코드 수정이 빈번하므로 package.json의 script부분을 nodemon으로 적용해서 자동재실행 되게 적용한다.
    - "scripts": {"dev":"nodemon "}
    - nodemon은 설정이 필요하다. 루트에 nodemon.json파일을 생성하여 내용을 추가한다.
    - nodemon.json (watch안에있는 파일이나 폴더가 수정되면 exec(다시실행)한다는 의미)
```
{
    "watch":[           // nodemon이 항상 확인하는 파일,폴더들을 적는다.
        "index.js",
        "routes",
        "config",
        "passport",
        "models",
        "nodemon.json"
    ],
    "exec": "node index.js",    // 변경이 이루어졌을때 실행할 명령
    "ext": "js json"            // 
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

## Sequelize와 ERD(https://sequelize.readthedocs.io/en/v3/)
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

## 테이블간 관계들 (https://thebook.io/006982/) <-- node교과서 책이 8장까지 공개되어있고 7장(관계정의하기)부분 참조
* 다대다 관계의 테이블은 중간에 정리하는 테이블이 반드시 필요하다.
  - 중간 테이블은 { through: 'PostHashtag' } 이렇게 코딩하여준다.
* 사용자와 사용자간의 관계가 필요함(팔로윙, 팔로워) 다대다
  - 
* 포스트간의 관계가 필요함( 리트윗 ) 일대다
  - 
* 다대다 표현시 이름이 같아서 애매한경우 반드시 as를 입력해 준다. 추후 사용할때 as의 이름으로 데이터를 가져와 진다.
* 혹시 mysql만 사용하여 쿼리문을 쓸때는 string형태의 쿼리문이라 javascript코드에서 관리하기가 힘들어진다.
  - 그래서 mysql - knex - sequelize/typeorm 을 같이 사용하는 방법을 추천.

## 시퀄라이즈 Q&amp;A와 DB연결하기
* 최종 루트 index.js파일에 아래 코드 작성
  - 각테이블 모델을 불어와서 테이블을 생성해준다.
  - const db = require('./models');    db.sequelize.sync();
  - models/index.js에도 각 테이블을 연결해준다. ex: db.Comment = require('./comment')(sequelize, Sequelize);

## mysql, 시퀄라이즈 사용시 알아둘 체크사항
* mysql 8버전 사용시 아래 에러가 발생할 수 있다.
  - SequelizeConnectionError: Client does not support authentication protocol requested byserver; consider upgrading MySQL client
  - 이럴때는 설치파일 .msi를 다시 실행하여 reconfig하여 Authentication Method단계에서 체크박스(Use Legacy Authentication Method)를 체크해준다.
  - 아니면 MySQL 5.7을 설치하여 사용하면 된다.


## 백앤드 서버 API 만들기
* 프론트에서 요청시 처리하는 컨트롤러 만들기
* api요청 코드가 많아지면 index.js에 다 쓰기 힘드므로 파일을 분리 해야한다.
* routes폴더를 생성하고 user.js, post.js, posts.js파일을 생성한다.
  - 생성한 파일에서 코드작성 routes/user.js파일 참조
* index.js에서 불러올때는 const userAPIRouter = require('./routes/user'); 가져와서 app.use('/api/user', userAPIRouter); 사용한다.

## 회원가입 컨트롤러 만들기
* post시 요청시 data가 필요한데 본문의 body에 값을 넣어서 보낸다.
  - 컨트롤러에서 req.body를 사용하기 위해서는 index.js에 두줄의 아래 코딩이 필요하다.
  - body의 json처리와, form데이터 body에 넣어주는 처리 관련 코드...
  - app.use(express.json()); app.use(express.urlencoded({ extended: true }));
```
// 회원가입 API
router.post('/', async (req, res, next) => { // POST /api/user 회원가입
    try {
        const exUser = await db.User.findOne({
            where: {
                userId: req.body.userId,
            },
        });
        if (exUser) {
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12); // salt는 10~13 사이로
        const newUser = await db.User.create({
            nickname: req.body.nickname,
            userId: req.body.userId,
            password: hashedPassword,
        });
        console.log(newUser);
        return res.status(200).json(newUser);
    } catch (e) {
        console.error(e);
        // 에러 처리를 여기서
        return next(e);
    }
});
```

## 실제 회원가입과 미들웨어들
* frontend쪽에 회원가입 요청을 axios를 통해서 호출하는 코드를 작성한다.
* backend쪽 index.js에서 로그관련 미들웨어를 끼워준다. 
  - const morgan = require('morgan'); app.use(morgan('dev'));  // 서버쪽 로그 남기는 미들웨어
  - cors 크로스도메인 에러처리 
```
const cors = require('cors');

app.use(cors({
    origin: true,
    credentials: true,
}));
```
* 위와같이 미들웨어는 app.use를 통해 요청과 응답 사이에 끼워서 추가된 기능을 처리 하게 하는것.
* get, post, put 등을 처리하기 전에 OPTIONS를 먼저 보내서 확인하고 성공시 이 후 진행 한다. 

## 로그인을 위한 미들웨어들
* id, password를 비교해보고 맞으면 
* 로그인을 했을때는 로그인을 했다는 정보를 서버에 남기고 일부분 frontend쪽에서 넘겨줘야한다.
* 로그인 처리 및 정보는 민감한 사항이라 서버에서 처리를 하고 frontend는 서버와 연결되기 전에는 전혀 알 수가 없다.
* 인증처리, 인증을 받아오고 그다음 frontend로 보낸다. 보통 가장 쉬운게 쿠키로 처리를 많이함.
* 사용자정보는 서버세션에, frontend에는 세션을 조회할 수 있는 쿠키를 전달한다.
* 그래서 우선 쿠키와 세션을 서버에 설정해준다.
  -- index.js파일에 아래 코딩
```
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

app.use(cookieParser('nodebirdcookie'));    // secret값과 같이 넣음.(보안을 위하여 이렇게 수정되어야 함 : process.env.COOKIE_SECRET)
app.use(expressSession({
    resave: false,          // 매번 세션 강제 저장 (보통 거의 false)
    saveUninitialized: false,   // 빈 값도 저장 (보통 거의 false)
    secret: 'nodebirdcookie',   // 쿠키값 암호화 키같은 역할(보안을 위하여 이렇게 수정되어야 함 : process.env.COOKIE_SECRET)
    cookie: {
        httpOnly: true, // javascript 로 쿠키에 접근하지 못하게 하는 기능
        secure: false,  // https사용때 켬.
    }
}));
```
* 소스코드가 털렸을 경우를 대비하여 민감한 string값들에 대한 대비로 루트에 .env파일 생성 적용 방법 (.env파일은 git에도 올리지 않는다.)
  - 루트에 .env파일을 생성하고 민감정보를 아래와 같은 방식으로 값을 넣어준다.
```
COOKIE_SECRET=cookiesecret
DB_PASSWORD=nodejsbook
```
  - index.js파일이나 필요한 곳에서 const dotenv = require('dotenv');  dotenv.config();  해서 불러온 다음
  - process.env.COOKIE_SECRET 해서 불러와 넣어줄 수 있다.
  - config.json같은 json에서는 변수를 사용해서 process.env.COOKIE_SECRET 이렇게 사용할 수 없으므로
  - config.json파일을 config.js 파일로 바꿔서 다시 만들고 난 후 내용의 json을 module.exports = {} 해준다음 const dotenv = require('dotenv');  dotenv.config(); 해서 process.env.DB_PASSWORD 사용한다.

## passport와 쿠키,세션 동작원리
* 로그인 처리시 id, password확인 쿠키, 세션 처리 하고 또 매번 현재 로그인한 사용자가 누구인가를 찾는 기능이 필요한데 그것을 자동화 하는 passport.
  - passport.session()은 반드시 expressSession 아래에 적어야 한다. (서로 의존관계에 있는것들은 순서가 중요.)
  - passport.session은 내부적으로 expressSession을 사용한다.
  - 사실 passport가 없어도 되지만 매번 라우터에 front 쿠키보내기, 서버 세션두기, 로그인한 사용자 체크 를 하기 때문에 안전하게 사용하기 위해서 씀.
```
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());
```
* 위 까지 진행 후 passport폴더 생성하고 안쪽에 index.js, local.js파일을 생성한다.
  - 어느 폴더든 index.js파일은 해당 폴더 js파일의 총괄하는 역할.
  - 다른 sns랑 연관하여 로그인 하는 경우도 있는데 그 처리를 index.js함.
* passport.serializeUser, passport.deserializeUser에 대한 설명 하기전 대략 설명
  - 사용자가 로그인을 하면 그 로그인 정보를 세션에 저장하는데, 로그인 사용자 정보 데이터는 엄청난 양 이기 때문에 메모리세션에 저장을 하면 문제가 생김.
  - 그로인해 passport.serializeUser는 frontend에서 보내온 cookie값으로 해당 사용자정보의 id를 찾아 세션에 저장을 하고,
  - 그 id와 관련된 사용자 정보를 db에서 불러(passport.deserializeUser)와 request에 포함시킨다.
  - 간단히 말해서 frontend에서 보낸 cookie를 가지고 서버에서는 해당 쿠키의 id를 찾아 db에서 해당 id의 사용자 정보를 찾아서 request에 보낸다.
  - JWT사용에 관한 설명... 진짜 대규모 이외에는 쿠키,세션을 사용하는게 좋음.

## passport 로그인 전략
* 로그인 관련 전략 코딩을 passport/local.js에 코딩한다.
  - 이 로그인전략 코딩을 사용하기 위해서
  - 루트 index.js에 아래 소스를 추가한다.
```
const passportConfig = require('./passport'); 

passportConfig();
```
  - passport/index.js에서는 local파일을 불러와야하기 때문에 아래내용 소스추가한다.
```
const local = require('./local');

local();
```
* 실제로 frontend에서는 로그인 api호출시 서버에서는 routes/user.js에 요청을 보내므로 해당 로그인 api함수에서 passport로그인전략을 실행 해줘야 한다.
  - routes/user.js의 로그인 부분 소스
```
const passport = require('passport');   // passport를 불러온다.

router.post('/login', (req, res, next) => { // POST /api/user/login
    passport.authenticate('local', (err, user, info) => {
        if (err) {          // 서버 에러가 났을경우
            console.error(err);
            return next(err);
        }
        if (info) {         // 로직상에 오류가 났을경우
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            try {
                if (loginErr) {
                    return next(loginErr);
                }
                const fullUser = await db.User.findOne({
                    where: { id: user.id },
                    include: [{             // 데이터 추가
                        model: db.Post,
                        as: 'Posts',
                        attributes: ['id'],
                    }, {
                        model: db.User,
                        as: 'Followings',
                        attributes: ['id'],
                    }, {
                        model: db.User,
                        as: 'Followers',
                        attributes: ['id'],
                    }],
                    attributes: ['id', 'nickname', 'userId'],
                });
                console.log(fullUser);
                return res.json(fullUser);
            } catch (e) {
                next(e);
            }
        });
    })(req, res, next);
});
```

## 실제 로그인 처리
* 공통된 api url은 빼놓는다.
  - axios.defaults.baseURL = 'http://localhost:3065/api';
* 로그인 성공 했을때 가져온 action.data를 반환해준다.(reducers/user.js)
```
case LOG_IN_SUCCESS: {
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                me: action.data,
                isLoading: false,
            };
        }
```

## 다른 도메인간 쿠키 주고 받기
* 로그인 처리 중 post로 해도 id, password는 그대로 노출이 되므로 https를 사용하는게 좋음.
* 다른 도메인의 쿠키 주고 받기를 하려면 frontend, backend모두 셋팅을 해줘야함.
  - frontend : return axios.post('/user/login', loginData, {withCredentials:true}); (axios보낼때 세번째 인자로 withCredentials를 true로 셋팅))
  - backend : index.js에 내용 셋팅. 서버 재시작 필요.
```
app.use(cors({
    origin: true,
    credentials: true,
}));
```
  - 로그인 호출시 post호출 전에 options를 먼저 호출하는데 그부분의 값들이 아래와 같아야함.
```
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: content-type
Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
Access-Control-Allow-Origin: http://localhost:3000
```
  - 잘 되었으면 frontend쪽 쿠키에 connect.sid라고 저장이 된다.
  - express에서 생성한 이 connect.sid 이름은 수정 해주는게 좋음.(name부분에 넣음. 되도록이면 이상한 이름으로...)
```
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true, // javascript 로 쿠키에 접근하지 못하게 하는 기능
        secure: false,  // https사용때 켬.
    },
    name: 'rnbck'
}));
```
  - 또한 지금도 새로고침 하면 로그인이 풀린다. 왜냐하면 쿠키는 남아있고 로그인이 되어있지만 최초 사용자정보를 가져오는 부분을 만들어 줘야 한다.(추후진행)

## include 와 as, foreignKey
* 우선 models/index.js파일의 sequelize 코딩시 주의할점
  - 테이블이 생성된 후 associate 함수를 호출 할 수 있으므로 코딩 순서에 주의 해야함. 테이블과의 관계설정을 하려면 테이블이 먼저 필요하므로.
```
db.Comment = require('./comment')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.Image = require('./image')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
```
* 쿼리의 JOIN과 같은 기능의 include
```
const fullUser = await db.User.findOne({
    where: { id: user.id },
    include: [{
        model: db.Post,
        as: 'Posts',        // models파일에 as가 설정되어있으면 여기도 똑같이 넣어준다.
        attributes: ['id'],
    }, {
        model: db.User,
        as: 'Followings',
        attributes: ['id'], // 가져올 값만 셋팅
    }, {
        model: db.User,
        as: 'Followers',
        attributes: ['id'],
    }],
    attributes: ['id', 'nickname', 'userId'],
});
```
* 다대다(belongsToMany)로 연결시 foreignKey를 설정(상대방id)한다. foreignKey자체가 다른테이블 id를 쓰고있기때문.

## 로그아웃과 사용자 정보 가져오기
* 새로고침하면 쿠키도 있고 로그인도 되어있지만 처음 화면에서 사용자 정보를 안가져 오므로 로그아웃처럼 보이는 현상을 수정하기 위해 사용자정보를 가져온다.
* 우선 순서대로 sagas/user.js에 logout과 loadUser를 코딩한다.
* reducers/user.js에도 해당 action에 맞게 소스코딩 해준다.
* 사용자 정보를 가져오는 부분은 최초 사용자가 어느 페이지를 접속할지 모르기 때문에 공통 레이아웃(AppLayout.js) 부분에 관련 코딩을 한다.
  - useEffect를 이용하여 코딩
```
const { isLoggedIn, me } = useSelector(state => state.user);
const dispatch = useDispatch();
useEffect(() => {
    if (!me) {
        dispatch({
            type: LOAD_USER_REQUEST,
        });
    }
}, []);
```
* 다음 backend의 routes/user.js에 관련 api코딩을 한다. 비밀번호는 항상 유의.
```
router.get('/', (req, res) => { // /api/user/
    if (!req.user) {
        return res.status(401).send('로그인이 필요합니다.');
    }
    const user = Object.assign({}, req.user.toJSON());
    delete user.password;
    return res.json(user);
});
```
* 최초 가져온 사용자정보를 통하여 me값으로 로그인창을 제어하게끔 수정. me값이 있는지 여부를 통하여 로그인되어있는창 보이기 처리.
* isLoggedIn과 me가 겹치므로 isLoggedIn을 삭제.
* 참고로 backend 서버가 재시작 되면 사용자 로그인 정보가 메모리에서 다 날라가므로 로그인이 풀려버림.
  - 그래서 실무에서는 로그인한 사용자 정보를 따로 redis서버나 다른서버를 사용해서 항상 저장을 해놓고 있으므로 서버가 재시작 되어도 상관없음.
  - 추 후 expressSession부분에 아래와 같이 store를 설정할 수 있다.
```
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true, // javascript 로 쿠키에 접근하지 못하게 하는 기능
        secure: false,  // https사용때 켬.
    },
    name: 'rnbck',
    store: RedisStore // 따로 사용자 정보를 저장할 곳
}));
```
## 게시글 작성과 데이터 관계 연결하기
* 시퀄라이즈로 각 테이블을 생성하고 관계를 형성하면 각 테이블에 add..., remove..., get... 등으 메서드가 자동 생성된다. (스터디 필요)
* import 로 불러온 모듈은 모든 파일에서 공유가 되므로 axios.defaults.baseURL = 'http://localhost:3065/api';은 다른파일에서도 그대로 적용됨.
  - 그래서 보통 모양이 좋지 않으므로 해당 폴더의 공통인 index.js쪽으로 빼서 셋팅한다.
* 우선 backend/routes/post.js파일에 게시글관련 api소스를 코딩한다.
* frontend에서는 게시글 작성 후 버튼 클릭시 해당 게시글작성api(/api/post)를 호출하는 소스를 코딩한다. reducers/post.js, sagas/post.js

## 게시글 불러오기
* routes/posts.js쪽에 게시글 가져오는 부분 코딩을 한다.
* 
