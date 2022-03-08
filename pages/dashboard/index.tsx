import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { loadAllProducts } from 'store/modules/Product/operations';

const Dashboard: NextPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllProducts());
  }, []);
  return (
    <>
      <Head>
        <title>Myos App</title>
      </Head>

      <h1 className="h3">Dashboard</h1>
    </>
  )
}

export default Dashboard
