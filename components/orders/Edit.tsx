import { IOrder } from 'models/types'
import { FC, useState, useMemo } from 'react'
import { Button, Modal, Badge, Row, Col, ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import PriceBadge from 'components/products/PriceBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

interface IEditOrderProps {
  order: IOrder
  btnVariant?: string
  btnClassName?: string
}

const EditOrder: FC<IEditOrderProps> = ({ order, children, btnVariant, btnClassName }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const subTotal = useMemo(() => {
    return order.cart.reduce((sum, { count, product }) => sum + (product.price * count), 0)
  }, [order]);
  const tax = subTotal * order.taxRate
  const total = subTotal * (1 + order.taxRate)

  return (
    <>
      <Button variant={btnVariant || "outline-primary"} className={btnClassName} onClick={handleShow}>
        {children || 'missing children'}
      </Button>
      <Modal
        show={show}
        fullscreen
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="pb-0">
          <Modal.Title>
            Order Form
          </Modal.Title>
          {order._id && (<small><Badge className='ms-2'>{order._id}</Badge></small>)}
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h3>Customer</h3>
              <hr /> 
              <dl className="row">
                <dt className="col-sm-3">Name</dt>
                <dd className="col-sm-9">{order.name}</dd>

                <dt className="col-sm-3">Email</dt>
                <dd className="col-sm-9">{order.email}</dd>

                <dt className="col-sm-3">Address</dt>
                <dd className="col-sm-9">
                  <p>{order.address}</p>
                </dd>
              </dl>
            </Col>
            <Col md={6}>
              <h3>Items</h3>  
              <hr /> 
              <ListGroup as="ol">
                {order.cart.map(({ count, product }) => (
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
                      <div className="fw-bold mb-0">
                        {product.title}
                        <PriceBadge product={product} className="ms-2"/>
                      </div>
                      <small>
                        <FontAwesomeIcon icon={faX} width={8} color="dark" /> {count}
                      </small>
                    </div>
                    <div className="d-block display-6 text-center">
                      <span className="me-1 fw-bolder lead">$</span>
                      {(product.price * count).toFixed(2)}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col xs={12}>
              <h3>Reciepe Details</h3> 
              <hr />
            </Col>
            <Col md={6}>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, deserunt? Recusandae accusantium dignissimos voluptas, quod cumque ea! Accusantium porro sequi possimus, at, provident velit quod cupiditate ut itaque quam quasi?</p>
              <p>Inventore, deserunt? Recusandae accusantium dignissimos voluptas, quod cumque ea! Accusantium porro sequi possimus, at, provident velit quod cupiditate ut itaque quam quasi? Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p>Recusandae accusantium dignissimos voluptas, quod cumque ea! Accusantium porro sequi possimus, at, provident velit quod cupiditate ut itaque quam quasi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, deserunt?</p>
            
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, deserunt? Recusandae accusantium dignissimos voluptas, quod cumque ea! Accusantium porro sequi possimus, at, provident velit quod cupiditate ut itaque quam quasi? Inventore, deserunt? Recusandae accusantium dignissimos voluptas, quod cumque ea! Accusantium porro sequi possimus, at, provident velit quod cupiditate ut itaque quam quasi? Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p>Recusandae accusantium dignissimos voluptas, quod cumque ea! Accusantium porro sequi possimus, at, provident velit quod cupiditate ut itaque quam quasi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, deserunt?</p>
            </Col>
            <Col md={6}>
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
              <p className="lead text-center my-5">Payable</p>
              <div className="d-block display-4 text-center mb-auto">
                <span className="me-1 fw-bolder lead">$</span>
                {order.total.toFixed(2)}
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditOrder