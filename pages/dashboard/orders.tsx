import type { NextPage } from 'next'
import Head from 'next/head'
import OrdersGrid from 'components/orders/Grid'
import AppBreadcrumb from 'layouts/shared-components/AppBreadcrumb';

const Orders: NextPage = () => {
  return (
    <>
      <Head>
        <title>Myos App | Orders</title>
      </Head>

      <h2 className="h3">Orders</h2>

      <AppBreadcrumb dashboard>Orders</AppBreadcrumb>

      <OrdersGrid />
    </>
  )
}

export default Orders
