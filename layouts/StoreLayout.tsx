import { FC } from 'react';
import Head from 'next/head'
import { Container } from 'react-bootstrap';
import AppFooter from 'layouts/shared-components/AppFooter'
import StoreNavBar from 'layouts/shared-components/StoreNavBar'
import StoreMenu from 'layouts/shared-components/StoreMenu'

const StoreLayout: FC = ({ children }) => {
  return (
    <div id="store-layout" className="h-100 view-root d-flex flex-column">
      <Head>
        <meta name="description" content="a test Project to apply to Myos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StoreNavBar />
      <StoreMenu />

      <Container fluid="md" className="flex-grow-1 d-flex flex-column">
        <main className='p-2 position-relative flex-grow-1'>
          <h1 className='d-none'>Myos x</h1>
          {children}
        </main>
      </Container>

      <AppFooter/>
    </div>
  )
};

export default StoreLayout;