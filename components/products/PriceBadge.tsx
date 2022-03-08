import { FC } from "react";
import { Badge } from "react-bootstrap";
import cn from 'classnames'
import { IProduct } from "models/types";

interface IPriceBadgeProps {
  product: IProduct,
  className?: string
}


const PriceBadge: FC<IPriceBadgeProps> = ({ product, className = '' }) => {
  return (
    <small className={className}>
      <Badge bg="secondary">${product.price}</Badge>
    </small> 
  )
}

export default PriceBadge