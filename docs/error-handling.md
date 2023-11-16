## 에러 핸들링 가이드

#### 기본 에러 클래스

- ValidationError: 유효하지 않은 입력 데이터에 대한 에러
- AuthenticationError: 인증 과정에서 발생하는 에러
- AuthorizationError: 권한이 없는 작업을 시도할 때 발생하는 에러
- NotFoundError: 요청한 리소스를 찾을 수 없을 때 발생하는 에러
- DatabaseError: 데이터베이스 작업 중 발생하는 에러
- ExternalAPIError: 외부 API와의 통신 중 발생하는 에러
- InternalError: 서버 내부에서 발생하는 기타 에러

#### 서비스 관련 에러 클래스

- 아직 없음

### 흐름

#### Repository 계층

원본 에러를 로깅하고 커스텀 에러객체로 변환시켜 외부로 throw

- 메서드 실행중 의도치 않은 동작이나 예외상황을 throw 시키고 catch문에서 **발생한 컨텍스트와 원본 에러객체 로깅**
- prismaErrorHandler에서 직접 throw된 에러는 다시 throw시켜 상위레벨로 보냄
- prismaErrorHandler에서 Prisma가 던진 에러 또는 예상치 못한 에러는 커스텀 에러객체로 변환시켜 보안을 강화
- prismaErrorHandler에서 각 에러유형에 관한 간단한 추가 메세지를 로깅하여 문제해결에 도움

```ts
class TrackRepository {
  async findById(id) {
    try {
      const track = await prisma.findFirst();
      if (!track) {
        throw new NotFoundError('트랙을 찾을 수 없습니다.');
      }
      return track;
    } catch (error) {
      console.error(`TrackRepository: findById ${id}`, e); // 컨텍스트와 원본 에러객체 로깅
      throw handlePrismaError(error);
    }
  }
}
export const handlePrismaError = (error: unknown) => {
  if (error instanceof NotFoundError) {
    throw error;
  } else if (error instanceof PrismaClientKnownRequestError) {
    console.error('데이터베이스 에러 발생'); // 각각 문제에 대한 간단한 메세지를 남겨 에러추적에 도움
    return new DatabaseError();
  } else if (error instanceof PrismaClientInitializationError) {
    console.error('데이터베이스 초기화 중 에러 발생');
    return new InternalError();
  } else if (error instanceof PrismaClientRustPanicError) {
    console.error('Prisma 내부 에러 발생');
    return new InternalError();
  }
  console.log('예상치 못한 에러 발생');
  return new InternalError(); // 커스텀 에러 객체로 반환함으로써 사용자에게 자세한 에러내용을 감춤
};
```

#### ServerAction 계층

- 비즈니스 로직을 처리하고, 발생한 에러 관리
- 여기서 최종적으로 throw된 에러 객체의 메세지를 사용자에게 string으로 전달
- 반환 유형은 ServerActionResponse 형태로 반환해야함 ({success:true, data:T} | {success:false, error:string})
- 여기도 간단한 컨텍스트만 로깅

```ts
export const getTrackServerAction = async (
  trackId: number,
  subTrackRepository: TrackRepository | null = null
):Promise<ServerActionResponse<Track>> => {
  const repo = subTrackRepository || repository.track;

  try {
    const track = await repo.findById(trackId);

    if(something error) throw new SomethingError("something message"); // 1.
    if(other error) return {success: false, error: "something message"};  //  2. 둘다 가능

    return {
      data: track,
    };
  } catch (e) {
    // 특정 상황을 에러로 처리하지 않을거면 정상적인 리턴값으로 변환
    if (e instanceof NotFoundError) {
      return {
        success:true,
        data: null,
      };
    }
    console.error(
      `getTrackServerAction: Error fetching track with ID ${trackId}`
    );
    return {
      success:false,
      error: getErrorMessage(e),
    };
  }
};

```

##### ServerAction의 응답타입

```ts
interface ServerActionSuccessResponse<T> {
  success: true;
  data: T;
}

interface ServerActionErrorResponse {
  success: false;
  error: string;
}

export type ServerActionResponse<T> =
  | ServerActionSuccessResponse<T>
  | ServerActionErrorResponse;
```

#### Client 계층

- serverAction의 결과에 error가 있다면 적절한 UI로 처리하거나 리다이렉트 또는 상위로 다시 throw 와 같은 처리를 함
- nextjs의 구현에 따라 error.tsx파일이 존재하면 해당 파일경로와 하위경로를 ErrorBoundary로 감싸게됨
- 따라서 서버컴포넌트에서 throw error가 발생하면 시점 컴포넌트에서 가장 가까운 상위의 error.tsx를 표시하게 됨

- serverAction이 붙은 함수는 응답이 ServerActionResponse<T> 임을 생각하며 구현

```ts
export default async function TrackPage({
  params,
}: {
  params: { trackId: string };
}) {
  // zod를 통해 params의 타입이 잘못 된 경우를 핸들링할 수 있음
  const routerSchema = z.object({
    trackId: z.coerce.number(),
  });
  const parsedParams = routerSchema.safeParse(params);
  if (!parsedParams.success) {
    notFound();
  }
  const getTrackResponse = await getTrackServerAction(
    parsedParams.data.trackId
  );
  if (!getTrackResponse.success) {
    // 에러처리를 할 경우 예시
    throw new Error(error); // error.tsx 컴포넌트로 캐치
    // 또는 notFound
  }
  const track = getTrackResponse.data;

  if (!track) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-between">
      <EditTrackForm track={track} />
    </div>
  );
}
```
