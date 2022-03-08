import Link from 'next/link'
import { FC } from 'react'
import { Container, Nav, Navbar, Form, Button, InputGroup, NavDropdown, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartNav from 'components/cart/CartNav'
import { faSearch, faShoppingBasket } from '@fortawesome/free-solid-svg-icons'

const StoreMenu: FC = () => {
  return (
    <>
      <Navbar bg="primary" variant='dark' expand="sm" className='py-0'>
        <Container>
          <Nav activeKey="/noop">
            <Nav.Item>
              <Link href="/" passHref>
                <Nav.Link>Mobiles</Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/" passHref>
                <Nav.Link>Loptops</Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/" passHref>
                <Nav.Link>Tablets</Nav.Link>
              </Link>
            </Nav.Item>
          </Nav>
          <Form className='ms-auto'>
            <InputGroup size="sm">
              <Form.Control
                type="search"
                placeholder="Search"
                className="border-light"
                aria-label="Search"
              />
              <Button variant="outline-light">
                <FontAwesomeIcon icon={faSearch} width={16} />
              </Button>
            </InputGroup>
          </Form>
          <CartNav />
        </Container>
      </Navbar>
    </>
  )
}

export default StoreMenu