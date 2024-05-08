import { coreApi } from './core.api';
import { Ticket } from '@acme/shared-models';

export const ticketApi = coreApi
  .enhanceEndpoints({
    addTagTypes: ['Tickets', 'Ticket'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getTickets: builder.query<Ticket[], void>({
        query: () => `tickets`,
        providesTags: ['Tickets'],
      }),
      getTicket: builder.query<Ticket, { ticketId: number }>({
        query: ({ ticketId }) => `tickets/${ticketId}`,
        providesTags: ['Ticket'],
      }),
      addTicket: builder.mutation<Ticket, Partial<Ticket>>({
        query: (ticket) => ({
          url: 'tickets',
          method: 'POST',
          body: ticket,
        }),
        invalidatesTags: ['Tickets'],
      }),
      assignUser: builder.mutation<void, { ticketId: number; userId: number }>({
        query: ({ ticketId, userId }) => ({
          url: `tickets/${ticketId}/assign/${userId}`,
          method: 'PUT',
        }),
        invalidatesTags: ['Tickets', 'Ticket'],
      }),
      unAssignUser: builder.mutation<void, { ticketId: number }>({
        query: ({ ticketId }) => ({
          url: `tickets/${ticketId}/unassign`,
          method: 'PUT',
        }),
        invalidatesTags: ['Tickets', 'Ticket'],
      }),
      markComplete: builder.mutation<void, { ticketId: number }>({
        query: ({ ticketId }) => ({
          url: `tickets/${ticketId}/complete`,
          method: 'PUT',
        }),
        invalidatesTags: ['Tickets', 'Ticket'],
      }),
      markIncomplete: builder.mutation<void, { ticketId: number }>({
        query: ({ ticketId }) => ({
          url: `tickets/${ticketId}/complete`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Tickets', 'Ticket'],
      }),
    }),
  });

export const {
  useGetTicketsQuery,
  useGetTicketQuery,
  useAddTicketMutation,
  useAssignUserMutation,
  useUnAssignUserMutation,
  useMarkCompleteMutation,
  useMarkIncompleteMutation,
} = ticketApi;
