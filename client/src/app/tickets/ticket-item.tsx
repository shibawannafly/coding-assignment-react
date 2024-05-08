import { Ticket } from '@acme/shared-models';
import { Col, Divider, Row } from 'antd';
import { Link } from 'react-router-dom';
import TicketAction from './ticket-action';

export default function TicketItem({ ticket }: { ticket: Ticket }) {
  return (
    <div key={ticket.id} className="mb-5">
      <div className="h-full border border-solid border-gray-100 p-6 rounded-lg hover:shadow-md duration-200">
        <Row gutter={10}>
          <Col xs={24} md={16}>
            <Link
              to={`/${ticket.id}`}
              className="text-base font-bold hover:text-blue-500 duration-200"
            >
              Ticket: {ticket.id}
            </Link>
          </Col>
          <Col xs={24} md={8}>
            <div className="flex justify-end items-center gap-2">
              <TicketAction ticket={ticket} />
            </div>
          </Col>
        </Row>
        <Divider />
        <div>{ticket.description}</div>
      </div>
    </div>
  );
}
