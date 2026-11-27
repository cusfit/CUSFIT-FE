# CUSFIT-FE

CUSFIT 프론트엔드 저장소입니다.

## 기술 스택

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- react-router (브라우저 라우터)
- oxlint (린트) + Prettier (포맷)
- husky + lint-staged (커밋 전 검사)
- Vitest + Testing Library (테스트)

## 시작하기

### 요구 사항

- **Node.js 24.22.3** (`.nvmrc`) — 패치 버전까지 정확히 맞아야 설치됩니다.
- **pnpm 12.23.0** (`package.json`의 `packageManager`)

버전은 고정되어 있고 자동으로 올라가지 않습니다. 버전이 다르면 `pnpm install`이 실패합니다.

### 처음 한 번만

```bash
nvm install 24.22.3   # Windows는 nvm-windows, macOS는 nvm
nvm use 24.22.3
corepack enable       # packageManager에 적힌 pnpm 버전을 자동으로 사용
```

corepack 대신 pnpm을 따로 설치해 써도 됩니다. 버전이 다르면 pnpm이 `packageManager`에 적힌 버전을 받아서 실행합니다.

### 환경 변수

```bash
cp .env.example .env.local   # 복사한 뒤 값을 채웁니다. .env.local은 git에 올라가지 않습니다
```

URL·API 주소·키는 코드에 직접 쓰지 않고 환경 변수로 넣습니다. 코드에서는 `src/shared/config/env.ts`의 `env`로 읽습니다.

### 설치 및 실행

```bash
pnpm install --frozen-lockfile   # pnpm-lock.yaml 버전 그대로 설치 (다르면 설치 중단)
pnpm dev                         # 개발 서버 실행
```

설치 시 husky가 자동으로 설정되어, 커밋할 때 변경된 파일에 oxlint, 관련 테스트, Prettier가 실행됩니다. 하나라도 실패하면 커밋이 막힙니다. 전체 테스트는 PR을 올리면 CI가 돌립니다.

### 라이브러리 추가

```bash
pnpm add zustand        # ^ 없이 정확한 버전으로 저장됩니다
pnpm add -D vitest      # 개발용 의존성
```

`package.json`에는 항상 정확한 버전(`1.2.3`)만 적습니다. `^`, `~`가 있으면 CI가 실패합니다.

## 스크립트

| 명령어                | 설명                                |
| --------------------- | ----------------------------------- |
| `pnpm dev`            | 개발 서버 실행                      |
| `pnpm build`          | 타입 체크 후 프로덕션 빌드          |
| `pnpm preview`        | 빌드 결과 미리보기                  |
| `pnpm lint`           | oxlint 실행                         |
| `pnpm format`         | Prettier로 전체 파일 포맷           |
| `pnpm format:check`   | 포맷이 맞는지 검사 (수정 없음)      |
| `pnpm test`           | 테스트 실행                         |
| `pnpm test:watch`     | 파일을 고칠 때마다 테스트 다시 실행 |
| `pnpm check:versions` | Node·pnpm·의존성 버전 고정 검사     |
| `pnpm check:urls`     | URL 하드코딩 검사                   |

## 폴더 구조

```
src/
├── main.tsx
├── app/          # 앱 진입점, 라우터, 레이아웃
├── features/     # 기능 단위 코드 (recipes, auth, account)
└── shared/       # 공용 UI, 에셋, 스타일
```

자세한 구조와 import 규칙은 [AGENTS.md](AGENTS.md)를 참고하세요.

## 경로 alias

`@/`는 `src/`를 가리킵니다.

```ts
import RootLayout from '@/app/layouts/RootLayout'
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

## AI 도구 설정

- 공통 규칙: `AGENTS.md` (Claude Code, Codex 모두 읽음)
- Claude Code 팀 공용 설정: `.claude/settings.json` — 자주 쓰는 검사 명령 허용, 위험한 명령(강제 푸시, `main` 직접 푸시 등) 차단, 라이브러리 추가 시 확인, 파일 수정 후 자동 포맷
- 개인 설정은 `.claude/settings.local.json`에 둡니다 (git에 올라가지 않음).

## 협업 규칙

- 브랜치·커밋·PR 규칙: [CONTRIBUTING.md](docs/CONTRIBUTING.md)
- 코드 구조·스타일 규칙 (AI 도구 공용): [AGENTS.md](AGENTS.md)
- 디자인(Figma)과 디자인 시스템 작업 순서: [docs/design.md](docs/design.md)
- 팀이 정한 것과 이유: [docs/decisions.md](docs/decisions.md)
