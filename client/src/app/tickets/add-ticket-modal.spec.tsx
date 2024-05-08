import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AddTicketModal from './add-ticket-modal';
import { storeConfig } from '../../store/store';

// Mocking the useAddTicketMutation hook
jest.mock('../../store/apis/ticket.api', () => ({
  useAddTicketMutation: jest.fn(() => [jest.fn(), { isLoading: false }]),
}));

describe('AddTicketModal', () => {
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

  it('renders add ticket modal correctly', async () => {
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <AddTicketModal />
      </Provider>
    );

    const addButton = getByText('Add Ticket');
    fireEvent.click(addButton);

    // Wait for modal to appear
    await waitFor(() => {
      getByText('Add Ticket');
    });

    const descriptionInput = getByLabelText('Description');
    fireEvent.change(descriptionInput, {
      target: { value: 'Test Description' },
    });

    const addTicketButton = getByText('Add Ticket');
    fireEvent.click(addTicketButton);

    // You might want to assert on the success message here
    // e.g., waitFor(() => getByText('Ticket added successfully'));
  });
});
