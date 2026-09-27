# CUSFIT-FE

CUSFIT 프론트엔드 저장소입니다.

## 기술 스택

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- oxlint (린트) + Prettier (포맷)
- husky + lint-staged (커밋 전 검사)

## 시작하기

### 요구 사항

- Node.js 22 (`.nvmrc` 참고, 최소 20.19.0 / 22.12.0 이상)
- npm

nvm을 쓴다면 프로젝트 루트에서 `nvm use`로 버전을 맞출 수 있습니다.

### 설치 및 실행

```bash
npm ci        # package-lock.json 버전 그대로 설치 (npm install 대신 사용)
npm run dev   # 개발 서버 실행
```

`npm ci` 시 husky가 자동으로 설정되어, 커밋할 때 변경된 파일에 oxlint와 Prettier가 실행됩니다.

## 스크립트

| 명령어                 | 설명                           |
| ---------------------- | ------------------------------ |
| `npm run dev`          | 개발 서버 실행                 |
| `npm run build`        | 타입 체크 후 프로덕션 빌드     |
| `npm run preview`      | 빌드 결과 미리보기             |
| `npm run lint`         | oxlint 실행                    |
| `npm run format`       | Prettier로 전체 파일 포맷      |
| `npm run format:check` | 포맷이 맞는지 검사 (수정 없음) |

## 폴더 구조

```
src/
├── assets/       # 이미지, 폰트 등 정적 리소스
├── components/   # 재사용 컴포넌트
├── hooks/        # 커스텀 훅
├── pages/        # 페이지 단위 컴포넌트
├── utils/        # 유틸 함수
├── App.tsx
├── main.tsx
└── index.css     # Tailwind 진입점
```

## 경로 alias

`@/`는 `src/`를 가리킵니다.

```ts
import Button from '@/components/Button'
```

## 코드 스타일

- Prettier: 작은따옴표, 세미콜론 없음, trailing comma (`.prettierrc`)
- Tailwind 클래스는 `prettier-plugin-tailwindcss`가 자동 정렬합니다.
- 줄바꿈은 LF로 통일합니다 (`.gitattributes`).

### VS Code

프로젝트를 열면 추천 확장 설치 안내가 뜹니다. 설치하면 저장 시 자동 포맷이 적용됩니다.

- Prettier
- Oxc (oxlint)
- Tailwind CSS IntelliSense

## CI

PR과 `main` 푸시마다 GitHub Actions가 `lint` → `format:check` → `build`를 실행합니다 (`.github/workflows/ci.yml`).
