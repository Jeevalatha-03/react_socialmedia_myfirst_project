

import { FaLaptopCode } from "react-icons/fa";
import { FaTabletAlt } from "react-icons/fa";
import { FaMobile } from "react-icons/fa";




const Header = ({title,width}) => {
  
  return (
    
    <header className='Header'>
      <h1>{title}</h1>
      {width < 768 ? <FaMobile />
        : width < 992 ? <FaTabletAlt/>
          : <FaLaptopCode/>}

    </header>
  )
}

export default Header