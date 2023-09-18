# Jazzit app

### Hexagonal Architecture 연구 & 응용

Hexagonal Architecture의 핵심은 비즈니스 로직을 외부(DB, 백엔드, 라이브러리)로 부터 격리 시키는 것이다.
따라서 NextJS의 구조와 동작 방식에 따라 다음과 같이 분류했다.

- Components - UI를 그리며 클라이언트의 입력을 받아 비즈니스 로직을 실행시키고 결과에 따라 앱의 UI 또는 동작을 처리함
- Modules
  - config - 비즈니스 로직을 실행할 때 사용할 어댑터들을 정리해둠
  - [module-name]
    - application - 비즈니스 로직 (Domain에 작성된 추상화된 인터페이스를 사용함)
    - domain - Entity 및 Port(외부의 인터페이스 {ex. 어댑터 인터페이스})
    - infrastructure - Adapter(특정 기술을 domain 인터페이스에 맞도록 구현 {ex. DB, 웹서버})

#### 각 비즈니스 로직은 커링 패턴으로 필요한 어댑터를 주입받음 (Class형태 X)

```ts
'use server';
export const registerUser =
  (userRepository: UserRepository, mailAdapter: MailAdapter) => (data) => {
    const user = await userRepository.createUser(data);
    await mailAdapter.sendEmail(user.email, '안녕하세요');

    return user;
  };
```

- 비즈니스 로직이 클래스면 안되는 이유

  - 비즈니스 로직에 bcrypt나 fs 등등 클라이언트에서 사용불가한 모듈들이 많음
  - 따라서 api를 만들지 않고 처리하려면 'use server'를 적용하여 서버 액션으로 처리해야함
  - 이때 Class면 생성자로 클래스를 생성할때 에러 (form 내부 또는 useTransition 훅을 사용해서 서버 액션을 호출해야함)

- 비즈니스 로직 호출전에 주입받아야 테스트에 용이하며 좀더 유연하게 사용가능
  ex. mailAdapter를 구현하는 객체가 여러개 존재하는데 여러개를 쓸 경우
  ex. memoryRepository를 생성하여 비즈니스 로직을 테스트할 때 DB를 사용하지 않고 테스트

### env

```env
NEXTAUTH_URL=
NEXTAUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

DATABASE_URL=
```

### 기능

오리지널 제작된 잼트랙 & 미디 트랙 제공
주로 유명한 코드진행으로 연습용 트랙(솔로, 반주 등) 및 샘플 솔로잉을 실제 뮤지션들과 제작 후 코드진행 악보와 함께 제공
FL Studio 의 Harmor를 통해 제작된 음원에 워터마킹
참여자 뮤지션의 정보 & youtube 또는 인스타 제공

구독 서비스 (Basic, Pro)
Basic - 모든 잼트랙 제공
Pro - 모든 잼트랙의 개별 stem 제공 (개별 트랙 조작 가능)

### todos

- 어드민 페이지

  - [x] 사이드바 작업
  - [ ] 대시 보드 페이지
  - [ ] 유저 관리 페이지
  - [ ] 구독 관리 페이지
  - [ ] 결제 및 환불 관리 페이지
  - [ ] 트랙 관리 페이지
  - [ ] 고객 지원 페이지
  - [ ] 분석 페이지
  - [ ] 앱 설정 페이지

- 앱

  - [x] 인증
  - [ ] 메인 페이지
  - [ ] 트랙 페이지
  - [ ] 커뮤니티 페이지
  - [ ] 내 스튜디오 페이지
  - [ ] 라이브러리 페이지 (좋아요 등)

  - [ ] 내정보 페이지 (유저 정보 및 결제 관리)
  - [ ] 구독 페이지

  - [ ] 다크모드 구현 수정(로컬 스토리지 -> 쿠키) 이유 - 자꾸 깜빡임
