import { FC, useMemo, useState } from "react";
import Link from 'next/link'
import { Badge, Nav, OverlayTrigger, Tooltip, Popover, ListGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getCartsList } from 'store/modules/Cart/selectors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import PriceBadge from 'components/products/PriceBadge'
import AddToCart from 'components/cart/AddToCart'

const CartNav: FC = () => {
  const [isOver, setIsOver] = useState(true)
  const cartsList = useSelector(getCartsList)

  const overlay = useMemo(() => {
    if (cartsList.length) {
      return (
        <Popover onMouseEnter={() => setIsOver(true)} onMouseLeave={() => setIsOver(false)}>
          <Popover.Header as="h3" className="d-flex justify-content-between">
            <span>Cart</span>
            <Badge bg="dark">{cartsList.length}</Badge>
          </Popover.Header>
          <Popover.Body className="p-0">
            <ListGroup as="ol" variant="flush">
              {cartsList.map(({ count, product }) => (
                <ListGroup.Item
                  key={product._id}
                  as="li"
                  className="d-flex justify-content-between align-items-start p-1"
                >
                  {product.image ? (
                    <img src={product.image} className="img-thumbnail thmb-50-sq" />
                  ) : (
                    <img src="/no-image.jpeg" className="img-thumbnail thmb-50-sq" />
                  )}
                  <div className="ms-2 me-auto">
                    <div className="fw-bold mb-2">
                      {product.title}
                      <PriceBadge product={product} className="ms-2"/>
                    </div>
                    <AddToCart product={product} size="sm"/>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Link href="/cart" passHref>
              <Button className="w-100 rounded-0" variant="primary" disabled={!cartsList.length}>
                Proceed to Buy
              </Button>
            </Link>
          </Popover.Body>
        </Popover>
      )
    }
    return <Tooltip> Basket is Empty </Tooltip>
  }, [cartsList])
  
  return (
    <Nav activeKey="/noop">
    {/* <OverlayTrigger delay={300} placement="bottom-end" overlay={overlay} show={isOver}>
    </OverlayTrigger> */}
      <Nav.Item onMouseEnter={() => setIsOver(true)} onMouseLeave={() => setIsOver(false)}>
        <Link href="/cart" passHref>
          <Nav.Link className="mx-2" disabled={!cartsList.length}>
            <FontAwesomeIcon icon={faShoppingBasket} width={16} color="dark" />
            {cartsList.length ? <sup><Badge bg="success" className="jello-horizontal" key={cartsList.length}>{cartsList.length}</Badge></sup> : null}
          </Nav.Link>
        </Link>
      </Nav.Item>
    </Nav>
  )
}

export default CartNav