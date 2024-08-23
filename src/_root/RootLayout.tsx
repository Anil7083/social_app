import Bottombar from 'src/@/components/shared/Bottombar'
import LeftSidebar from 'src/@/components/shared/LeftSidebar'
import Topbar from 'src/@/components/shared/Topbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
    <Topbar/>
    <LeftSidebar/>

    <section className='flex flex-1 h-full'>
      <Outlet/>
    </section>
    
    <Bottombar/>
    </div>
  )
}

export default RootLayout