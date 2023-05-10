import logo from '../../assets/logo.svg'
import { Alarm, Heart, Cube } from "phosphor-react";

function Navbar() {
  return (
    <div className='bg-white w-full h-[75px] sticky top-0 right-0 left-0'>
        <img src={logo} alt="" />
        <Alarm size={32} />
        <Heart size={32} />
    </div>
  )
}

export default Navbar