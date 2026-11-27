// Claude가 파일을 수정한 직후 그 파일에 Prettier를 실행한다. (PostToolUse 훅)
// 실패해도 작업을 막지 않는다. 최종 포맷 검사는 커밋 전 husky와 CI가 한다.
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { isAbsolute, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// Claude가 다른 폴더로 이동한 상태여도 항상 프로젝트 루트를 기준으로 실행한다.
const root =
  process.env.CLAUDE_PROJECT_DIR ??
  fileURLToPath(new URL('../..', import.meta.url))

let input = ''
for await (const chunk of process.stdin) input += chunk

const filePath = JSON.parse(input || '{}').tool_input?.file_path
const file =
  filePath && (isAbsolute(filePath) ? filePath : resolve(root, filePath))
const prettier = join(root, 'node_modules/prettier/bin/prettier.cjs')

if (file && existsSync(file) && existsSync(prettier)) {
  try {
    execFileSync(
      process.execPath,
      [prettier, '--write', '--ignore-unknown', file],
      { cwd: root, stdio: 'ignore' },
    )
  } catch {
    // 포맷할 수 없는 파일은 그대로 둔다.
  }
}
