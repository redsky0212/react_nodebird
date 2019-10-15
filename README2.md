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