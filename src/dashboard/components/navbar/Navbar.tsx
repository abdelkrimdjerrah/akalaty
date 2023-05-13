import Logo from '../../../assets/logo.svg'
import { SignOut } from 'phosphor-react'
import Searchbar from './Searchbar'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const handleLogout = () => {
    navigate('/signin')
  }
  return (
    <div className='bg-white w-full  sticky top-0 right-0 left-0 pl-5 pr-5 pt-2 pb-2 flex items-center justify-between'>
        <div>
            <img src={Logo} alt="" className='h-[40px]'/>
        </div>
        <div className='w-[35%]'>
          <Searchbar />
        </div>
        <div className='cursor-pointer flex gap-1 items-center' onClick={handleLogout}>
          <p className='text-sm'>Logout</p>
          <SignOut size={23}/>
        </div>
    </div>
  )
}

export default Navbar