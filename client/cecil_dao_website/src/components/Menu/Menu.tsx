import { useState } from "react";
import "./index.scss";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <nav className="menu">
      <div onClick={() => setIsOpened(!isOpened)}><img width={40} height={40} src="/nav.svg" alt="" className='cursor-pointer' /></div>
      <div className={`overlayMenu ${isOpened && 'opened'}`}>
        <div className="menuHeader">
          <img src="/logo2.png" alt="" style={{ height: 32 }} />
          <img className='hidden md:block' src="/TheGoodDAO.svg" alt="" style={{ height: 32, width: 147, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} />
          <img width={40} height={40} onClick={() => setIsOpened(!isOpened)} src="/nav.svg" alt="" className='cursor-pointer' />
        </div>
        <div className="menuItems">
          <NavLink to="/lion">Cecil the Lion DAO</NavLink>
          <NavLink to="/lion2">Cecil the Lion DAO</NavLink>
          <NavLink to="/lion3">Cecil the Lion DAO</NavLink>
          <NavLink to="/lion4">Cecil the Lion DAO</NavLink>
        </div>
        <div>
          <div className='flex items-center manuFooter' style={{ justifyContent: 'space-between', padding: '16px 32px' }}>
            <div className='flex items-center gap-4'>
              <p>Follow us: </p>
              <img src="/xIcon.svg" alt="" />
              <img src="/instIcon.svg" alt="" />
            </div>
            <p className='hidden md:block'>@ArtDao   –   Privacy Policy</p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Menu;