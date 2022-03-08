import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from 'store/modules/Product/selectors'
import { loadAllProducts } from 'store/modules/Product/operations';
import PriceBadge from "components/products/PriceBadge";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import ProductCard from 'components/products/Card';
import Loading from 'components/Loading';
import AddToCart from 'components/cart/AddToCart'

const ProductPage: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  console.log(router);
  let id: string = String(router.query.id)
  const product = useSelector(getProduct(id))
  useEffect(() => {
    if(!product) dispatch(loadAllProducts(id));
  }, [id]);

  if (!product) return <Loading show/>
  return (
    <>
      <Head>
        <title>Myos App | {product.title}</title>
      </Head>
      <Row className='mt-3'>
        <Col>
          <div className="img-thumbnail">
            <Image src={product.image || '/no-image.jpeg'} width={10} height={10} layout="responsive" />
          </div>
        </Col>
        <Col>
          <h2 className="display-3">{product.title}</h2>
          <p>{product.description}</p>
          <AddToCart product={product} />
        </Col>
      </Row>
    </>
  )
}

export default ProductPage
