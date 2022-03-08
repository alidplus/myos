import { FC } from "react";
import Image from 'next/image'
import Link from 'next/link'
import { kebabCase } from 'lodash'
import { Card } from "react-bootstrap";
import { IProduct } from "models/types";
import PriceBadge from "./PriceBadge";
import AddToCart from 'components/cart/AddToCart'

interface IProductCardProps {
  product: IProduct,
  className?: string
}


const ProductCard: FC<IProductCardProps> = ({ product, className = '' }) => {
  return (
    <Card>
      <div className="card-img-top">
        <Image src={product.image || '/no-image.jpeg'} width={10} height={10} layout="responsive" className="object-fit-cover" />
      </div>
      <Card.ImgOverlay className="d-flex flex-column text-black p-0">
        <Card.Title className="text-truncate bg-white bg-opacity-50 p-3">
          {product.title}
          <PriceBadge product={product} className="float-end"/>
        </Card.Title>
        <div className="my-auto" />
        <Link href={`/product/${product._id}/${kebabCase(product.title)}`} passHref>
          <a className="stretched-link"> </a>
        </Link>
        <Card.Body className="flex-grow-0 z-index-2">
          <AddToCart product={product} />
        </Card.Body>
      </Card.ImgOverlay>
    </Card>
  )
}

export default ProductCard