// src 안에 URL이 직접 적혀 있는지 검사한다. URL은 .env.local → src/shared/config/env.ts로 읽어야 한다.
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

// 표준 네임스페이스처럼 주소가 아닌 식별자로 쓰이는 값만 정확히 허용한다.
const ALLOWED = new Set([
  'http://www.w3.org/2000/svg',
  'http://www.w3.org/1999/xlink',
  'http://www.w3.org/1999/xhtml',
  'http://www.w3.org/XML/1998/namespace',
  'http://www.w3.org/2000/xmlns/',
])
// URL 스킴은 대소문자를 구분하지 않으므로 HTTPS:// 도 잡는다.
const URL_PATTERN = /https?:\/\/[^\s'"`)<>]+/gi
const EXTENSIONS = /\.(ts|tsx|js|jsx|css)$/

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else if (EXTENSIONS.test(entry.name)) yield path
  }
}

const errors = []
for (const file of walk('src')) {
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, index) => {
      for (const [url] of line.matchAll(URL_PATTERN)) {
        if (!ALLOWED.has(url)) {
          errors.push(`${file}:${index + 1}  ${url}`)
        }
      }
    })
}

if (errors.length > 0) {
  console.error(
    'URL을 코드에 직접 쓰지 마세요. .env.local에 넣고 src/shared/config/env.ts로 읽어주세요.\n' +
      errors.map((e) => `  - ${e}`).join('\n'),
  )
  process.exit(1)
}
console.log('URL 하드코딩 검사 통과')
