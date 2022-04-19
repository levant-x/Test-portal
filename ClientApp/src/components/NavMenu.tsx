import { Paths } from '../types/common';
import { Link, NavLink } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'reactstrap';

export default function NavMenu() {
  return (
    <>
      <Navbar
        color="dark"
        dark
        expand="sm"
        full
        light
      >
        <Nav className="me-auto" navbar >
          <NavItem>
            <NavLink className='nav-link' to={Paths.home}>
              Главная
            </NavLink>
          </NavItem>
        </Nav>

        <Nav navbar>
          <NavItem>
            <NavLink className='nav-link' to={Paths.profile}>
              <i className='bi bi-person-fill'></i>
            </NavLink>
          </NavItem>
          <NavItem>
            <Link className='nav-link' to={Paths.logout}>
              <i className="bi bi-box-arrow-right"></i>
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  )
}
