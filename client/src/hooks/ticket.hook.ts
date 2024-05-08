import { notification } from 'antd';
import {
  useAssignUserMutation,
  useMarkCompleteMutation,
  useMarkIncompleteMutation,
  useUnAssignUserMutation,
} from '../store/apis/ticket.api';

export const useTicketAction = () => {
  const [assignUser] = useAssignUserMutation();
  const [unassignUser] = useUnAssignUserMutation();
  const [markComplete] = useMarkCompleteMutation();
  const [markIncomplete] = useMarkIncompleteMutation();

  const handleAssignUser = (ticketId: number, userId: number) => {
    assignUser({ ticketId, userId })
      .unwrap()
      .then(() => {
        notification.success({
          message: 'User assigned successfully',
        });
      });
  };

  const handleUnassignUser = (ticketId: number) => {
    unassignUser({ ticketId })
      .unwrap()
      .then(() => {
        notification.success({
          message: 'Unassigned successfully',
        });
      });
  };

  const handleMarkComplete = (ticketId: number) => {
    console.log({ ticketId });
    markComplete({ ticketId })
      .unwrap()
      .then(() => {
        notification.success({
          message: 'Ticket marked as complete',
        });
      });
  };

  const handleMarkIncomplete = (ticketId: number) => {
    markIncomplete({ ticketId })
      .unwrap()
      .then(() => {
        notification.success({
          message: 'Ticket marked as incomplete',
        });
      });
  };

  return {
    handleAssignUser,
    handleUnassignUser,
    handleMarkComplete,
    handleMarkIncomplete,
  };
};
