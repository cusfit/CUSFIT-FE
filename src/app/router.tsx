import { createBrowserRouter } from 'react-router'
import RootLayout from '@/app/layouts/RootLayout'
import ExplorePage from '@/features/recipes/explore/ExplorePage'

// Capacitor 앱에서도 동작하도록 해시 라우터가 아닌 브라우저 라우터를 사용한다.
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [{ index: true, element: <ExplorePage /> }],
  },
])
