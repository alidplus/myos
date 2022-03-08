import { FC } from "react";
import { Button, Form } from "react-bootstrap";
import { IProduct } from "models/types";
import { useSelector, useDispatch } from "react-redux";
import { getProductCartItem } from 'store/modules/Cart/selectors'
import { toAddToCart, toRemoveFromCart } from 'store/modules/Cart/actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

interface IAddToCartProps {
  product: IProduct,
  className?: string,
  size?: "sm" | "lg" | undefined
}

const AddToCart: FC<IAddToCartProps> = ({ product, className = '', size }) => {
  const dispatch = useDispatch();
  const productCartItem = useSelector(getProductCartItem(product._id))
  const inc = () => {
    dispatch(toAddToCart(product))
  }
  const dec = () => {
    dispatch(toRemoveFromCart(product))
  }

  // const sizeScale = 
  
  if (productCartItem) {
    return (
      <div className={`d-flex gap-1 ${className}`}>
        <Button variant="primary" onClick={dec} size={size}>
          <FontAwesomeIcon icon={faMinus} width={16} />
        </Button>
        <Form.Control
          type="text"
          size={size}
          readOnly
          className="flex-grow-1 text-center bg-opacity-50 bg-white text-black text-bolder"
          value={productCartItem.count}
        />
        <Button variant="primary" onClick={inc} size={size}>
          <FontAwesomeIcon icon={faPlus} width={16} />
        </Button>
      </div>
    )
  }
  return (
    <div className="d-flex">
      <Button variant="primary" className="flex-grow-1" onClick={inc}>
        <FontAwesomeIcon icon={faCartPlus} width={16} className="me-2" />
        <span>Add To card</span>  
      </Button>
    </div>
  )
}

export default AddToCart