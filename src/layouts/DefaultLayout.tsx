import { Outlet } from 'react-router-dom'
import DesktopSidebar from "@/components/sidebar/DesktopSidebar.tsx";

const DefaultLayout = () => {
  return (
      <div className="h-svh flex overflow-hidden">
          <DesktopSidebar />
          <main className="w-full min-h-full overflow-y-auto">
              <Outlet />
          </main>
      </div>
  )
}

export default DefaultLayout