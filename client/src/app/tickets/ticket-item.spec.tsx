import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TicketItem from './ticket-item';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { storeConfig } from '../../store/store';

const mockTicket = {
  id: 1,
  description: `Hecker's test ticket`,
  assigneeId: 1,
  completed: false,
};

describe('TicketItem', () => {
  let store: any;

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  beforeEach(() => {
    store = configureStore(storeConfig);
  });
  it('display information correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <TicketItem ticket={mockTicket} />
        </MemoryRouter>
      </Provider>
    );

    const ticketId = getByText(`Ticket: ${mockTicket.id}`);
    expect(ticketId).toBeInTheDocument();

    const description = getByText(mockTicket.description);
    expect(description).toBeInTheDocument();
  });
});
