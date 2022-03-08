import { useEffect } from "react";
import { Button, ButtonGroup, Form, FormControl, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getOrdersList } from 'store/modules/Order/selectors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEye, faPlus } from '@fortawesome/free-solid-svg-icons'
import { updateOrder, loadAllOrders, removeOrder } from 'store/modules/Order/operations';
import { loadAllProducts } from 'store/modules/Product/operations';
import { IOrder } from "models/types";
import EditOrder from './Edit'
import C from 'lib/constants'

export default function OrdersGrid(): JSX.Element {
  const dispatch = useDispatch();
  const orders = useSelector(getOrdersList)
  const handleDelete = (order: IOrder) => {
    dispatch(removeOrder(order));
  }
  useEffect(() => {
    dispatch(loadAllOrders());
    dispatch(loadAllProducts());
  }, []);
  return (
    <ListGroup as="ol">
      {orders.map((order: IOrder | undefined) => 
        order ? (
          <ListGroup.Item
            key={order._id}
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2">
              <div>
                <span className="fw-bold">{order.email}</span>
                <span className="ms-2">{order.name}</span>
              </div>
              <small className="d-block text-muted overflow-hidden" style={{height: '1.4rem'}}>{order.address}</small>
            </div>
            <div>
              <div className="d-flex">
                <div className="display-6">{order.cart.length}</div>
                <span>Items</span>
              </div>
            </div>
            <div>
              <div className="d-flex">
                <div className="display-6">${order.total.toFixed(2)}</div>
                <span>Total</span>
              </div>
            </div>
            <ButtonGroup className="ms-2 my-auto">
              <Button variant="outline-danger" onClick={handleDelete.bind(null, order)}>
                <FontAwesomeIcon icon={faTrash} width={16} />
              </Button>

              <EditOrder btnVariant="outline-secondary" order={order}>
                <FontAwesomeIcon icon={faEye} width={16} />
              </EditOrder>
            </ButtonGroup>
          </ListGroup.Item>
        ) : null
      )}
    </ListGroup>
  );
}

