# AGENTS.md

AI 코딩 도구(Claude Code, Codex 등)가 이 저장소에서 작업할 때 따르는 규칙입니다.
사람도 같은 규칙을 따릅니다. 이슈·리뷰·머지 절차는 [CONTRIBUTING.md](docs/CONTRIBUTING.md)에 있습니다.

## 커밋·브랜치

- 커밋 메시지와 PR 제목: `{타입}: {설명}` (예: `feat: 레시피 저장 추가`). 설명은 한국어
- 커밋 메시지는 한 줄이 기본. 이유가 코드로 드러나지 않을 때만 본문에 "왜"를 적고, 작업 내용 정리는 PR 본문에 씀
- 브랜치: `{타입}/{이슈번호}-{영문-설명}` (예: `feat/24-recipe-save`). `feat`·`fix`는 이슈 필수, 나머지는 이슈가 없으면 `docs/update-readme`처럼 번호 생략
- PR은 브랜치당 하나. 리뷰 반영은 같은 브랜치에 커밋을 추가로 푸시
- 타입: `feat` `fix` `refactor` `style` `docs` `test` `chore` `ci`. 기존 동작이 깨지는 변경만 `feat!:`처럼 `!`를 붙임
- PR 제목 형식은 CI가 검사하고, 라벨은 자동으로 붙음

## 프로젝트

- CUSFIT 프론트엔드. React 19 + TypeScript + Vite + Tailwind CSS v4
- 라우팅: react-router (`createBrowserRouter`). Capacitor로 앱을 감쌀 예정이라 해시 라우터는 쓰지 않습니다.
- 경로 alias: `@/` → `src/`

## 작업 방식

- 요구사항이 애매하면 추측하지 말고 질문합니다.
- 새로 만들기 전에 지금 있는 컴포넌트·훅·패턴을 먼저 찾아보고 재사용합니다.
- 새 기능, 여러 파일에 걸친 수정, 아래 "사람 확인 필요"에 해당하는 작업은 **먼저 계획을 말하고 확인받은 뒤** 구현합니다. 작은 수정은 바로 하고 결과를 보고합니다.
- 화면 개발은 **디자인 시스템(색·글꼴·간격 토큰)과 공용 컴포넌트(`shared/ui`)를 먼저 잡은 뒤** 시작합니다. 잡힌 뒤에는 임의의 색·크기 값 대신 토큰과 공용 컴포넌트를 씁니다.

### 사람 확인 필요

아래는 구현 전에 반드시 사람에게 확인받습니다.

- 라이브러리 추가·삭제·버전 변경
- CODEOWNERS 보호 파일 수정 (`.github/`, `.nvmrc`, `pnpm-workspace.yaml`, lint·포맷·TypeScript 설정 등)
- 폴더 구조 변경, 파일 삭제
- API 응답 형식이나 백엔드 동작을 추측해야 할 때
- 디자인과 다르게 구현해야 할 때

### 참고 문서

해당 작업을 할 때 먼저 읽습니다.

- 화면·디자인 작업 → [docs/design.md](docs/design.md)
- 구조·라이브러리·규칙을 바꾸려 할 때 → [docs/decisions.md](docs/decisions.md) (이미 정한 것과 이유)

## 명령어

```bash
pnpm install --frozen-lockfile  # 설치 (pnpm-lock.yaml 그대로, 다르면 중단)
pnpm dev                        # 개발 서버
pnpm lint                       # oxlint
pnpm format:check               # Prettier 검사
pnpm build                      # 타입 체크 + 빌드
pnpm check:versions             # Node·pnpm·의존성 버전 고정 검사
```

- 패키지 매니저는 pnpm만 씁니다. `npm`, `yarn`으로 설치하거나 `package-lock.json`을 만들지 않습니다.
- Node 24.22.3, pnpm 12.23.0으로 고정되어 있습니다.

### 완료 기준

"다 했다"고 하기 전에 아래를 모두 지킵니다.

- `pnpm lint`, `pnpm format:check`, `pnpm build`, `pnpm check:versions` 통과 (CI도 같은 검사를 합니다)
- 화면을 바꿨으면 `pnpm dev`로 실제 화면을 확인
- 바꾼 내용, 확인한 방법, 확인하지 못한 것을 함께 보고

## 폴더 구조

```
src/
├── main.tsx
├── app/              # 앱 진입점, 라우터, 레이아웃
│   ├── App.tsx
│   ├── router.tsx
│   └── layouts/
├── features/         # 기능 단위 코드
│   ├── recipes/
│   │   ├── explore/      # 레시피 탐색
│   │   ├── detail/       # 레시피 상세
│   │   ├── create/       # 레시피 만들기
│   │   ├── collection/   # 내 레시피, 저장 목록
│   │   └── components/   # recipes 안에서 같이 쓰는 컴포넌트 (RecipeCard 등)
│   ├── auth/             # 로그인, 가입
│   └── account/          # 마이페이지, 설정
└── shared/           # 여러 기능이 같이 쓰는 코드
    ├── ui/               # 공용 버튼, 입력창
    ├── assets/
    └── styles/
```

### 의존 방향

- `app` → `features` → `shared` 방향으로만 import 합니다.
- `shared`는 `features`나 `app`을 import 하지 않습니다.
- 한 feature가 다른 feature를 직접 import 하지 않습니다 (예: `auth`에서 `recipes` import 금지). 두 곳 이상에서 필요해지면 `shared`로 옮깁니다.
- `recipes` 안의 하위 폴더끼리 같이 쓰는 것은 `features/recipes/components`에 둡니다.

### feature 내부

필요할 때만 폴더를 만듭니다. 미리 빈 폴더를 만들지 않습니다.

```
features/recipes/detail/
├── RecipeDetailPage.tsx   # 라우트에 연결되는 페이지
├── components/            # 이 화면에서만 쓰는 컴포넌트
├── hooks/
├── api.ts
└── types.ts
```

## 코드 스타일

- 컴포넌트 파일과 컴포넌트 이름은 PascalCase (`RecipeCard.tsx`), 훅은 `use`로 시작하는 camelCase (`useRecipeList.ts`)
- 페이지 컴포넌트 이름은 `~Page`로 끝냅니다 (`ExplorePage`).
- import는 상대 경로(`../../`) 대신 `@/`를 씁니다. 같은 폴더 안은 `./`를 써도 됩니다.
- 스타일은 Tailwind 클래스로 작성합니다.
- 화면 문구는 한국어, 변수·함수·파일 이름은 영어로 씁니다.
- 주석은 "왜"가 필요한 곳에만 한국어로 짧게 씁니다. 코드를 그대로 설명하는 주석은 쓰지 않습니다.

## 하지 말 것

- **의존성, Node, 패키지 매니저 버전을 바꾸지 않습니다.** `.nvmrc`·`engines`·`packageManager` 수정이 필요하면 작업을 멈추고 사람에게 먼저 물어보세요.
- 라이브러리는 확인받은 뒤 `pnpm add`로 추가하고, `package.json`에 `^`·`~` 없는 정확한 버전만 남깁니다.
- lint 규칙을 끄거나 `// oxlint-disable`, `@ts-ignore`, `any`로 오류를 피하지 않습니다.
- 요청받지 않은 파일을 정리하거나 대규모로 리팩터링하지 않습니다.
