import { useGetTicketQuery } from '../../store/apis/ticket.api';
import { useParams } from 'react-router-dom';
import TicketAction from '../tickets/ticket-action';

export default function TicketDetail() {
  const { id } = useParams();

  const { data: ticket } = useGetTicketQuery(
    { ticketId: Number(id) },
    {
      skip: !id,
    }
  );

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mb-8">
        Ticket: {ticket?.id}
      </h1>
      <div>{ticket?.description}</div>
      <div className="flex items-center gap-2 mt-5">
        {ticket && <TicketAction ticket={ticket} />}
      </div>
    </div>
  );
}
