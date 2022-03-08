import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import { useEffect } from 'react'
import { Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { getProductsList } from 'store/modules/Product/selectors'
import { loadAllProducts } from 'store/modules/Product/operations';
import PriceBadge from "components/products/PriceBadge";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import ProductCard from 'components/products/Card';

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(getProductsList)
  useEffect(() => {
    dispatch(loadAllProducts());
  }, []);
  return (
    <>
      <Head>
        <title>Myos App</title>
      </Head>

      <h1 className="h3">Home</h1>
      <Row className="g-3">
        {products.map(product => (
          <Col xs="12" md="6" xl="4" key={product._id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Home
