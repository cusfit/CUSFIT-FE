// Node·pnpm 버전과 의존성 버전 고정 여부를 검사한다. CI에서 설치 전에 실행된다.
// pnpm 버전 기준은 이 파일의 EXPECTED_PNPM, Node 버전 기준은 .nvmrc다.
// 이 파일은 CODEOWNERS로 보호된다. 버전을 올리려면 담당자 승인이 필요하다.
import { readFileSync } from 'node:fs'

const EXPECTED_PNPM = '12.23.0'

const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
const nvmrc = readFileSync('.nvmrc', 'utf8').trim()
const exact = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/
const errors = []

if (!exact.test(nvmrc)) {
  errors.push(`.nvmrc는 패치 버전까지 정확히 적어야 합니다: "${nvmrc}"`)
}
if (pkg.engines?.node !== nvmrc) {
  errors.push(`engines.node("${pkg.engines?.node}")가 .nvmrc("${nvmrc}")와 다릅니다.`)
}
if (process.version !== `v${nvmrc}`) {
  errors.push(`실행 중인 Node(${process.version})가 .nvmrc(v${nvmrc})와 다릅니다.`)
}
if (pkg.packageManager !== `pnpm@${EXPECTED_PNPM}`) {
  errors.push(`packageManager("${pkg.packageManager}")는 "pnpm@${EXPECTED_PNPM}"이어야 합니다.`)
}
if (pkg.engines?.pnpm !== EXPECTED_PNPM) {
  errors.push(`engines.pnpm("${pkg.engines?.pnpm}")은 "${EXPECTED_PNPM}"이어야 합니다.`)
}
for (const field of ['dependencies', 'devDependencies', 'optionalDependencies']) {
  for (const [name, version] of Object.entries(pkg[field] ?? {})) {
    if (!exact.test(version)) {
      errors.push(`${field}.${name}("${version}")는 ^, ~ 없이 정확한 버전이어야 합니다.`)
    }
  }
}

if (errors.length > 0) {
  console.error('버전 검사 실패:\n' + errors.map((e) => `  - ${e}`).join('\n'))
  process.exit(1)
}
console.log(`버전 검사 통과: Node ${nvmrc}, pnpm ${EXPECTED_PNPM}, 의존성 모두 고정`)
