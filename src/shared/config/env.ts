// 환경 변수는 이 파일에서만 읽는다. 다른 곳에서는 import.meta.env 대신 env를 쓴다.
export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
} as const
