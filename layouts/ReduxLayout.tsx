import { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../store';

const ReduxLayout: FC = ({ children }) => {
  return (
    <div id="redux-layout">
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </div>
  )
};

export default ReduxLayout;