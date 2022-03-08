import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Container, Nav, Navbar } from "react-bootstrap";
import LogoMotion from './LogoMotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faUserGear } from '@fortawesome/free-solid-svg-icons'

const StoreNavBar: FC = () => {
  return (
    <>
      <Navbar bg="dark" variant='dark' expand="lg" className='py-0'>
        <Container fluid>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Link href="/" passHref>
            <Navbar.Brand>
              <LogoMotion fill='#fff' stroke='#fff' width={100}  />
            </Navbar.Brand>
          </Link>
          <Nav
            className="d-none d-md-flex"
            activeKey=""
          >
            <Nav.Item>
              <Link href="/dashboard/orders" passHref>
                <Nav.Link className="mx-2" eventKey="dashboard">
                  <FontAwesomeIcon icon={faUserGear} width={16} color="dark" />
                </Nav.Link>
              </Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default StoreNavBar