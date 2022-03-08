import { useEffect } from "react";
import { Button, ButtonGroup, Form, FormControl, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getProductsList } from 'store/modules/Product/selectors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import { updateProduct, loadAllProducts, removeProduct } from 'store/modules/Product/operations';
import { IProduct } from "models/types";
import EditProduct from './Edit'
import PriceBadge from "./PriceBadge";

export default function ProductsGrid(): JSX.Element {
  const dispatch = useDispatch();
  const products = useSelector(getProductsList)
  const handleDelete = (product: IProduct) => {
    dispatch(removeProduct(product));
  }
  useEffect(() => {
    dispatch(loadAllProducts());
  }, []);
  return (
    <>
      <div className="d-flex mb-3">
        <Form className="me-auto">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>
        <EditProduct btnVariant="outline-primary" btnClassName="ps-3 pe-4" product={{ _id: '', title: '', price: 0 }}>
          <FontAwesomeIcon icon={faPlus} width={16} className="me-2" />
          Create
        </EditProduct>
      </div>
      <ListGroup as="ol">
        {products.map(product => (
          <ListGroup.Item
            key={product._id}
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            {product.image ? (
              <img src={product.image} className="img-thumbnail thmb-50-sq" />
            ) : (
              <img src="/no-image.jpeg" className="img-thumbnail thmb-50-sq" />
            )}
            <div className="ms-2 me-auto">
              <div className="fw-bold">
                {product.title}
                <PriceBadge product={product} className="ms-2"/>
              </div>
              <small className="d-block text-muted overflow-hidden" style={{height: '1.4rem'}}>{product.description}</small>
            </div>
            <ButtonGroup className="ms-2 my-auto">
              <Button variant="outline-danger" onClick={handleDelete.bind(null, product)}>
                <FontAwesomeIcon icon={faTrash} width={16} />
              </Button>

              <EditProduct btnVariant="outline-secondary" product={product}>
                <FontAwesomeIcon icon={faEdit} width={16} />
              </EditProduct>
            </ButtonGroup>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

