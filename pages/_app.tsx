import type { AppProps } from 'next/app';
import { useMemo } from "react";
import DashboardLayout from 'layouts/DashboardLayout';
import StoreLayout from 'layouts/StoreLayout';
import ReduxLayout from 'layouts/ReduxLayout';
import { ComposeLayouts } from 'layouts/index';
import "assets/bootstrap-theme.scss";
import "assets/scss/custom.scss";

const _App = ({ Component, pageProps, router }: AppProps) => {
  const pathnameFirstChunk = router.pathname.split('/').filter(chunk => !!chunk).shift() || ''
  const layouts = useMemo(() => {
    if (pathnameFirstChunk === 'dashboard')
      return [DashboardLayout, ReduxLayout]
    return [StoreLayout, ReduxLayout]
  }, [pathnameFirstChunk])

  return (
    <ComposeLayouts layouts={layouts}>
      <Component {...pageProps} />
    </ComposeLayouts>
  );
};
export default _App