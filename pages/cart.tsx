import type { NextPage } from 'next'
import Head from 'next/head'
import { useMemo } from 'react'
import { Row, Col, Card, ListGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { getCartsList } from 'store/modules/Cart/selectors'
import PriceBadge from "components/products/PriceBadge";
import Paraph from 'components/Paraph';
import AddToCart from 'components/cart/AddToCart';
import CartForm from 'components/cart/Form';
import C from 'lib/constants'

const Cart: NextPage = () => {
  const cartsList = useSelector(getCartsList)
  const subTotal = useMemo(() => {
    return cartsList.reduce((sum, { count, product }) => sum + (product.price * count), 0)
  }, [cartsList]);
  const tax = subTotal * C.TAX_RATE
  const total = subTotal * (1 + C.TAX_RATE)
  return (
    <>
      <Head>
        <title>Myos App</title>
      </Head>

      <h2 className="h1">Cart</h2>
      <ListGroup as="ol">
        {cartsList.map(({ count, product }) => (
          <ListGroup.Item
            key={product._id}
            as="li"
            className="p-2"
          >
            <Row className="no-gutter">
              <Col sm={12} md={6} lg={8} className="d-flex justify-content-between align-items-start">
                {product.image ? (
                  <img src={product.image} className="img-thumbnail thmb-100-sq" />
                ) : (
                  <img src="/no-image.jpeg" className="img-thumbnail thmb-100-sq" />
                )}
                <div className="ms-2 me-auto">
                  <div className="fw-bold mb-2">
                    {product.title}
                    <PriceBadge product={product} className="ms-2"/>
                  </div>
                  <Paraph className="text-muted mb-1" lines={1}>{product.description}</Paraph>
                </div>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <div className="d-block display-4 text-center">
                  <span className="me-1 fw-bolder lead">$</span>
                  {(product.price * count).toFixed(2)}
                </div>
                <AddToCart product={product} size="sm"/>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Card className="mt-3 p-2">
        <Row className="no-gutter">
          <Col sm={12} md={6} lg={8}>
            <Card.Body>
              <CartForm cart={cartsList} />
            </Card.Body>
          </Col>
          <Col sm={12} md={6} lg={4} className="d-flex flex-column">
            <ListGroup className="w-100">
              <ListGroup.Item className="py-2 d-flex justify-content-between align-items-center">
                <div>Sub Total</div>
                <div className="d-block h3 text-center m-0">
                  <span className="me-1 fw-bolder lead">$</span>
                  {subTotal.toFixed(2)}
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="py-2 d-flex justify-content-between align-items-center">
                <div>Tax</div>
                <div className="d-block h3 text-center m-0">
                  <span className="me-1 fw-bolder lead">$</span>
                  {tax.toFixed(2)}
                </div>
              </ListGroup.Item>
            </ListGroup>
            <p className="lead text-center mt-auto">Payable</p>
            <div className="d-block display-4 text-center mb-auto">
              <span className="me-1 fw-bolder lead">$</span>
              {total.toFixed(2)}
            </div>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default Cart
