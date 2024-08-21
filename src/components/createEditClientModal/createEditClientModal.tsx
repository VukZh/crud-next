import React, { useState } from 'react';
import { Button, Form, FormProps, Input, Modal, Select } from 'antd';
import { useMainStore } from '@/hooks/useClientsAndManagers';
import { BASE_URL } from '@/helpers/constants';
import { mutate } from 'swr';

type CreateEditClientModalPropsType = {
  isCreate: boolean;
  name?: string;
  id?: string;
};

type FieldType = {
  name: string;
  manager_id: string;
  date_of_birth: string;
  phone: string;
  gender: 'male' | 'female';
  status: 'active' | 'archive' | 'pending';
};

const CreateEditClientModal = ({
  isCreate,
  name,
  id,
}: CreateEditClientModalPropsType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { clients, managers } = useMainStore();

  const currClient = !isCreate
    ? clients.find((client) => client.id === id)
    : null;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    if (isCreate) {
      createClient(values);
    } else {
      updateClient(id, values);
    }
    setIsModalOpen(false);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  const createClient = async (newClient) => {
    await fetch(`${BASE_URL}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newClient),
    });
    mutate(`${BASE_URL}/clients`);
  };

  const updateClient = async (id, updatedClient) => {
    await fetch(`${BASE_URL}/clients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedClient),
    });
    mutate(`${BASE_URL}/clients`);
  };

  return (
    <>
      <Button onClick={showModal} type={isCreate ? 'primary' : undefined}>
        {isCreate ? 'Add client' : `Update`}
      </Button>
      <Modal
        title={isCreate ? 'Create' : `Update ${name}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={500}>
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 17 }}
          style={{ width: 500, paddingTop: '20px' }}
          initialValues={
            isCreate
              ? {}
              : {
                  name: currClient?.name,
                  manager_id: currClient?.manager_id,
                  date_of_birth: currClient?.date_of_birth,
                  phone: currClient?.phone,
                  gender: currClient?.gender,
                  status: currClient?.status,
                }
          }
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Name is required!' }]}>
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Manager"
            name="manager_id"
            rules={[{ required: true, message: 'Manager is required!' }]}>
            <Select placeholder="Select a manager">
              {managers.map((manager) => (
                <Select.Option key={manager.id} value={manager.id}>
                  {manager.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="Date of birth"
            name="date_of_birth"
            rules={[
              { required: true, message: 'Date of birth is required!' },
              {
                pattern: /^\d{4}-\d{2}-\d{2}$/,
                message: 'Date must be in the format YYYY-MM-DD',
              },
            ]}>
            <Input placeholder="Date of birth" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: 'Phone is required!' },
              {
                pattern: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                message: 'Invalid phone number format!',
              },
            ]}>
            <Input placeholder="Phone" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Gender is required!' }]}>
            <Select placeholder="Select gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Status is required!' }]}>
            <Select placeholder="Select status">
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="archive">Archive</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 14 }}>
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: '10px' }}>
              {isCreate ? 'Create' : 'Update'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateEditClientModal;
