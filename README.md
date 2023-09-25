# Jazzit app

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

## 📝 메모

### unstable_cache 주의 (13.4.19)

- 현재 NextJS 13.4.19 버전 기준으로 fetch 함수를 사용하여 데이터를 가져올때만 캐시를 정식으로 지원하고 있다.

```ts
export class GenresHttpRepository implements GenresRepository {
  async getAllGenres() {
    const genres = await fetch('api 주소/api/genres', {
      next: { tags: ['allGenres'] },
    });
    if (!genres) return [];
    return genres;
  }
  // ...
}
```

- api없이 prisma를 직접 사용하는 데이터 요청은 현재 아래와 같이 unstable_cache를 사용하는 방법밖에 없다. (api 엔드포인트를 만들지 않는 경우)
- 현재 개발중인 기능으로 불안정하며 향후 변경 될 수도 있다.
  [공식문서](https://nextjs.org/docs/app/building-your-application/caching#unstable_cache)

```ts
export class GenresPrismaRepository implements GenresRepository {
  async getAllGenres() {
    const genres = await unstable_cache(
      async () => {
        const data = await prisma.genres.findMany({});
        return data;
      },
      ['allGenres'], // cache-key
      { tags: ['allGenres'], revalidate: 10 }
    )();
    if (!genres) return [];
    return genres;
  }
  // ...
}
```

### Hexagonal Architecture 연구 & 응용

Hexagonal Architecture의 핵심은 비즈니스 로직을 외부(DB, 백엔드, 라이브러리)로 부터 격리 시키는 것이다.
따라서 NextJS의 구조와 동작 방식에 따라 다음과 같이 분류했다.

- Components - UI를 그리며 클라이언트의 입력을 받아 비즈니스 로직을 실행시키고 결과에 따라 앱의 UI 또는 동작을 처리함
- Modules
  - config - 비즈니스 로직을 실행할 때 사용할 어댑터들을 정리해둠
  - [module-name]
    - application - 비즈니스 로직 (Domain에 작성된 추상화된 인터페이스를 사용하고, 어댑터를 주입받아 사용)
    - domain - Entity 및 Port(외부의 인터페이스 {ex. 어댑터 인터페이스})
    - infrastructure - Adapter(특정 기술을 domain 인터페이스에 맞도록 구현 {ex. DB, 웹서버})

#### 각 비즈니스 로직은 필요 시 (서브)어댑터를 주입받음 (Class형태는 X)

```ts
'use server';
export const registerUser = (
  data,
  subUserRepository: UserRepository | null = null,
  subMailAdapter: MailAdapter | null = null
) => {
  const userRepo = subUserRepository || config.repository.user;
  const mailAdapter = subMailAdapter || config.adapter.mail;
  const user = await userRepository.createUser(data);
  await mailAdapter.sendEmail(user.email, '안녕하세요');

  return user;
};
```

- 비즈니스 로직이 클래스면 안되는 이유

  - 비즈니스 로직은 서버 작업으로 처리되어야함(보안 및 bcrypt나 fs 등등 클라이언트에서 사용불가한 모듈들이 많음)
  - 따라서 'use server'를 적용하여 로직을 서버 액션으로 만듬 (클라이언트 의존성 X)
  - 이때 Class를 사용하면 생성자로 클래스를 생성할때 클라이언트에 서버 코드가 생성됨으로 에러 (form action 또는 useTransition 훅을 사용해서 서버 액션을 호출해야함)

- 메인이 아닌 서브 어댑터를 주입받는 이유
  - serverAction은 클라이언트에 전송되지 않고 서버에서 호출됨
  - 하지만 클라이언트에서 serverAction을 호출 할 때 어댑터를 주입받으면 클라이언트에 해당 어댑터를 import해야해서 전송하게 됨
  - 따라서 기본적으로 'use server'를 사용하는 파일에서 config 파일를 통하여 불러오도록 구현하고
  - 테스트 코드를 작성할 때 sub어댑터로 교체할 수 있도록 파라미터로 지원
