import { Outlet } from 'react-router'

function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  )
}

export default RootLayout
