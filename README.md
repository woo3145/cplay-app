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
Basic - 무료 잼트랙 및 Pro 컨텐츠의 Sample 제공
Pro - 모든 잼트랙 stem 제공

### todos

- 어드민 페이지

  - [x] 사이드바 작업
  - [x] 태그 및 카테고리 관리 페이지
    - [x] Genres CRUD
    - [x] Mood CRUD
    - [ ] 커뮤니티 카테고리(예정)
  - [ ] 대시 보드 페이지
  - [ ] 유저 관리 페이지
  - [ ] 구독 관리 페이지
  - [ ] 결제 및 환불 관리 페이지
  - [x] 트랙 관리 페이지
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
    - [x] 프로필 수정
    - [ ] 결제 관련
    - [ ] 패스워드 변경
  - [ ] 구독 페이지

  - [ ] 오디오 재생
    - [ ] 글로벌 오디오 플레이어 생성 (main)
    - [ ] 트랙 - stems의 stemType(sample, mr, solo, full 등)으로 컨텐츠에 맞게 플레이어 재생
    - [ ] 앨범 - 호버 시 트랙 리스트 보이기
    - [ ] 각 트랙 및 앨범 Detail 사이트 (Stem 리스트 및 아티스트 정보)

- 곡 업로드(어드민)
  - 트랙 생성 (isPublish: false, releaseData: null)
  - 각 stem 추가 (+sample)
  - 앨범 이미지 추가
  - 최종 검토 후 publish
  - 최적화 : mp3는 큰 파일에 속하기 때문에 next 서버를 거치지 않고 s3의 presigned url방식으로 클라이언트에서 업로드

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

## 🚨 에러 모음

#### @aws-sdk/signature-v4-crt 경고

```
./node_modules/@aws-sdk/signature-v4-multi-region/dist-cjs/load-crt.js
Critical dependency: require function is used in a way in which dependencies cannot be statically extracted

Import trace for requested module:
./node_modules/@aws-sdk/signature-v4-multi-region/dist-cjs/load-crt.js
./node_modules/@aws-sdk/signature-v4-multi-region/dist-cjs/SignatureV4MultiRegion.js
./node_modules/@aws-sdk/signature-v4-multi-region/dist-cjs/index.js
./node_modules/@aws-sdk/s3-request-presigner/dist-cjs/presigner.js
./node_modules/@aws-sdk/s3-request-presigner/dist-cjs/index.js
./modules/upload/infrastructure/file.s3.repository.ts
./modules/config/repository.ts
./modules/user/application/userAuthorize.ts
./app/api/auth/[...nextauth]/route.ts
```

##### 발생

nextjs에서 @aws-sdk/s3-request-presigner를 사용하면 위 경고 발생

##### 원인

- 1. webpack에서 빌드할 때 entry 부터 시작하여 import나 require로 연결된 파일을 찾아 관계트리를 만들어야함
- 2. 하지만 동적 모듈 불러오기는 번들링 과정에 추가적인 복잡성이 발생하여 번들러 성능 등에 영향을 미침
- 3. 여기서 aws-sdk 3.420.0는 @aws-sdk/signature-v4-crt를 불러올때 동적으로 모듈을 불러오고 있음
  - [참고 aws-sdk-js-v3/packages/signature-v4-multi-region/src/load-crt.ts](https://github.com/kuhe/aws-sdk-js-v3/blob/8c61b0979f1c04bbc16015334b318a4d56bbd8c4/packages/signature-v4-multi-region/src/load-crt.ts)
- 4. 그래서 성능 향상을 위해 aws-sdk-js-v3의 추후 버전에서 이러한 동적 모듈 불러오기를 제거 할 계획으로 밝힘
  - [참고 aws-sdk-js-v3 발표](https://github.com/aws/aws-sdk-js-v3/issues/5229)
- 5. 동적 불러오기가 완전히 제거 될 경우 에러가 되기 때문에 미리 대응하라고 2023-09-25일에 위 경고가 추가 됨

##### 해결

- [참고 aws-sdk-js-v3 발표](https://github.com/aws/aws-sdk-js-v3/issues/5229) 이 발표문에 나온데로 @aws-sdk/signature-v4-crt 패키지를 프로젝트에 설치하고 사용하는 곳에서 직접 import 하여 해결

- 또는 next.config.js파일에서 웹팩 설정을 수정하여 해결
  - externals로 @aws-sdk/signature-v4-multi-region 모듈을 웹팩 번들에서 제거하고 실행시점에 로드하는 방법
  - 이 방법은 클라이언트측에서 해당 모듈이 사용되면 번들링할때 제외되어 브라우저에 보내지기 때문에 해당 모듈을 사용하지 못하여 에러가 발생하게 됨
  - 따라서 이 방법을 사용하면 해당 모듈이 서버에서만 사용되어야 함

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      '@aws-sdk/signature-v4-multi-region':
        'commonjs @aws-sdk/signature-v4-multi-region',
    });

    return config;
  },
};
module.exports = nextConfig;
```
