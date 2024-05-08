import { render } from '@testing-library/react';

import Tickets from './tickets';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { storeConfig } from '../../store/store';

describe('Tickets', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore(storeConfig);
  });
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <Tickets />
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
