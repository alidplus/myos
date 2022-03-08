import type { NextPage } from 'next'
import Head from 'next/head'
import ProductsGrid from 'components/products/Grid'
import AppBreadcrumb from 'layouts/shared-components/AppBreadcrumb';

const Products: NextPage = () => {
  return (
    <>
      <Head>
        <title>Myos App | Products</title>
      </Head>

      <h2 className="h3">Products</h2>

      <AppBreadcrumb dashboard>Products</AppBreadcrumb>

      <ProductsGrid />
    </>
  )
}

export default Products
