import { NavLink } from 'react-router-dom';
import styled from "@emotion/styled";
const Nav = styled.nav`
  background: #000;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
  /* Third Nav */
  /* justify-content: flex-start; */
`
const NavMenu = styled.div`
  display: flex;
  align-items: center;
  // margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const NavBarLink = styled(NavLink)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #15cdfc;
  }
`;

const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtnLink = styled(NavLink)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  // margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;


const NavLogo = styled.div`
  font-size: 24px;
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  // padding: 0 1rem;
  height: 100%;
  // cursor: pointer;

`

const NavBar = () =>{
  
  const logout = ()=>{
    localStorage.removeItem("token")
  }
  return (

      <Nav>
        <NavLogo>ReactSample</NavLogo>
          {/* <img src={require('../../images/logo.svg')} alt='logo' /> */}

        <NavMenu>
          <NavBarLink to='/home'>
            Home
          </NavBarLink>
          <NavBarLink to='/profile'>
            Profile
          </NavBarLink>

          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/sign_in' onClick={logout}>Sign Out</NavBtnLink>
        </NavBtn>
      </Nav>
    
  )  
}


    export default NavBar;