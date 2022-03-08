import { FC } from 'react';
import Head from 'next/head'
import AppFooter from 'layouts/shared-components/AppFooter'
import AppNavBar from 'layouts/shared-components/AppNavBar'

const DashboardLayout: FC = ({ children }) => {
  return (
    <div id="dashboard-layout" className="h-100 view-root d-flex flex-column">
      <Head>
        <meta name="description" content="a test Project to apply to Myos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppNavBar />

      <main className='p-3'>
        <h1 className='d-none'>Myos</h1>
        {children}
      </main>

      <AppFooter/>
    </div>
  )
};

export default DashboardLayout;