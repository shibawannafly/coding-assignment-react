import styles from './tickets.module.css';
import { useGetTicketsQuery } from '../../store/apis/ticket.api';
import { Empty, Select } from 'antd';
import TicketItem from './ticket-item';
import { useEffect, useState } from 'react';
import { Ticket } from '@acme/shared-models';
import AddTicketModal from './add-ticket-modal';

const { Option } = Select;
enum TicketStatus {
  Completed = 1,
  Incompleted = 2,
}

export function Tickets() {
  const [status, setStatus] = useState<number>(0);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const { data: tickets, isLoading } = useGetTicketsQuery();

  useEffect(() => {
    if (tickets) {
      setFilteredTickets(
        status === 0
          ? tickets
          : tickets.filter((t) =>
              status === TicketStatus.Completed ? t.completed : !t.completed
            )
      );
    }
  }, [status, tickets]);

  return (
    <div className={styles['tickets']}>
      <h1 className="text-center text-3xl font-bold mb-8">Ticketing App</h1>
      <div className="mb-5 flex justify-end gap-4">
        <Select
          value={status}
          onChange={(value) => setStatus(value)}
          className="w-32"
        >
          <Option value={0}>All</Option>
          <Option value={1}>Completed</Option>
          <Option value={2}>Incompleted</Option>
        </Select>
        <AddTicketModal />
      </div>
      {isLoading ? (
        <div className="p-8 text-center text-2xl text-gray-300">Loading...</div>
      ) : filteredTickets.length ? (
        filteredTickets.map((t) => <TicketItem key={t.id} ticket={t} />)
      ) : (
        <Empty />
      )}
    </div>
  );
}

export default Tickets;
