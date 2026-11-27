// Claude가 파일을 수정한 직후 그 파일에 Prettier를 실행한다. (PostToolUse 훅)
// 실패해도 작업을 막지 않는다. 최종 포맷 검사는 커밋 전 husky와 CI가 한다.
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'

let input = ''
for await (const chunk of process.stdin) input += chunk

const file = JSON.parse(input || '{}').tool_input?.file_path
const prettier = 'node_modules/prettier/bin/prettier.cjs'

if (file && existsSync(file) && existsSync(prettier)) {
  try {
    execFileSync(
      process.execPath,
      [prettier, '--write', '--ignore-unknown', file],
      {
        stdio: 'ignore',
      },
    )
  } catch {
    // 포맷할 수 없는 파일은 그대로 둔다.
  }
}
