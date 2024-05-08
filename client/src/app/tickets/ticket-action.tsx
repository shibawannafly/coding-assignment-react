import { Ticket } from '@acme/shared-models';
import { Checkbox, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useTicketAction } from '../../hooks/ticket.hook';
import { useGetUsersQuery } from '../../store/apis/user.api';

const { Option } = Select;

export default function TicketAction({ ticket }: { ticket: Ticket }) {
  const { data: users } = useGetUsersQuery();
  const {
    handleAssignUser,
    handleUnassignUser,
    handleMarkComplete,
    handleMarkIncomplete,
  } = useTicketAction();

  const onChangeCompleted = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      handleMarkComplete(ticket.id);
    } else {
      handleMarkIncomplete(ticket.id);
    }
  };

  const onChangeAssignee = (value: number) => {
    if (value) {
      handleAssignUser(ticket.id, value);
    } else {
      handleUnassignUser(ticket.id);
    }
  };

  return (
    <>
      <Checkbox checked={ticket.completed} onChange={onChangeCompleted}>
        Completed
      </Checkbox>
      <Select
        placeholder="Assignee"
        className="w-32"
        value={ticket.assigneeId}
        onChange={onChangeAssignee}
      >
        <Option value={undefined}>Unassigned</Option>
        {users?.map((u) => (
          <Option key={u.id} value={u.id}>
            {u.name}
          </Option>
        ))}
      </Select>
    </>
  );
}
