import { FC } from 'react'
import Link from 'next/link'
import { Nav, NavDropdown } from "react-bootstrap";


const AppSideBar: FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <Nav className={`justify-content-end flex-grow-1 pe-3 ${className}`}>
      <Link href="/dashboard" passHref>
        <Nav.Link>Home</Nav.Link>
      </Link>
      <Link href="/dashboard/products" passHref>
        <Nav.Link>Products</Nav.Link>
      </Link>
      <Link href="/dashboard/orders" passHref>
        <Nav.Link>Orders</Nav.Link>
      </Link>
    </Nav>
  )
}

export default AppSideBar