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

작업을 끝내기 전에 `lint`, `format:check`, `build`가 모두 통과하는지 확인하세요. CI도 같은 순서로 검사합니다.

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

## 하지 말 것

- **의존성, Node, 패키지 매니저 버전을 바꾸지 않습니다.** 패키지 추가·업그레이드, `.nvmrc`·`engines`·`packageManager` 수정이 필요하면 작업을 멈추고 사람에게 먼저 물어보세요.
- 라이브러리를 추가할 때는 `pnpm add`를 쓰고, `package.json`에 `^`·`~` 없는 정확한 버전만 남깁니다.
- lint 규칙을 끄거나 `// oxlint-disable`, `@ts-ignore`, `any`로 오류를 피하지 않습니다.
- CI 설정(`.github/`), `pnpm-workspace.yaml`, lint·포맷·TypeScript 설정 파일을 요청 없이 수정하지 않습니다. 이 파일들은 CODEOWNERS로 보호됩니다.
- 요청받지 않은 파일을 정리하거나 대규모로 리팩터링하지 않습니다.
