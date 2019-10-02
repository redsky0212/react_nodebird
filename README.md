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
* AppLayout콤포넌트에서는 Menu.Item에 각 페이지의 Link를 걸어준다.
* 현재까지 코딩시 Head부분과 AppLayout코딩하는 부분들의 중복 코딩이 발생한다. 이부분은 추 후 개선필요.

## 회원가입 폼 만들기
* signup.js파일에 코딩 진행 참조.
  - input 에는 항상 value, onChange를 짝을 지어줘야 한다.
  - 각 form의 input을 만들고 state와 onchange함수, setState를 코딩한다.

## 회원가입 state와 custom hook
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

## ----------------------------------------
## SNS 화면 만들기
## ----------------------------------------

## app.js로 레이아웃 분리하기
* 러안ㅁ러


## React backend 설치 과정 정리
* 