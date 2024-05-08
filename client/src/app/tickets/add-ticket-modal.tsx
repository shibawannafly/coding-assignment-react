import { Ticket } from '@acme/shared-models';
import { Button, Form, Input, Modal, Select, notification } from 'antd';
import { useGetUsersQuery } from '../../store/apis/user.api';
import { useState } from 'react';
import { useAddTicketMutation } from '../../store/apis/ticket.api';

const { Option } = Select;

export default function AddTicketModal() {
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();
  const { data: users } = useGetUsersQuery();
  const [addTicket, { isLoading }] = useAddTicketMutation();

  const handleAddTicket = (values: Partial<Ticket>) => {
    addTicket(values)
      .unwrap()
      .then(() => {
        setOpen(false);
        form.resetFields();
        notification.success({
          message: 'Ticket added successfully',
        });
      })
      .catch(() => {
        notification.error({
          message: 'Failed to add ticket',
        });
      });
  };

  return (
    <>
      <Button type="primary" className="w-32" onClick={() => setOpen(true)}>
        Add Ticket
      </Button>
      <Modal
        title="Add New Ticket"
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
      >
        <Form
          name="add-ticket"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, padding: '20px 0' }}
          initialValues={{}}
          onFinish={handleAddTicket}
        >
          <Form.Item name="description" label="Description" required>
            <Input.TextArea placeholder="Description" />
          </Form.Item>
          <Form.Item name="assigneeId" label="Assignee">
            <Select placeholder="Assignee">
              {users?.map((u) => (
                <Option key={u.id} value={u.id}>
                  {u.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Add
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
