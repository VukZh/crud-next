import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import type { FormProps } from 'antd';
import { useMainStore } from '@/hooks/useClientsAndManagers';
import { mutate } from 'swr';
import { BASE_URL } from '@/helpers/constants';

type CreateEditManagerModalPropsType = {
  isCreate: boolean;
  id?: string;
};

type FieldType = {
  name: string;
};
const CreateEditManagerModal = ({
  isCreate,
  id,
}: CreateEditManagerModalPropsType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { managers } = useMainStore();

  const managerName = !isCreate
    ? managers.find((manager) => manager.id === id)?.name
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
      createManager(values);
    } else {
      updateManager(id, values);
    }
    setIsModalOpen(false);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  const createManager = async (newManager) => {
    await fetch(`${BASE_URL}/managers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newManager),
    });
    mutate('/managers');
  };

  const updateManager = async (id, updatedManager) => {
    await fetch(`${BASE_URL}/managers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedManager),
    });

    mutate('/managers');
  };

  return (
    <>
      <Button onClick={showModal} type={isCreate ? 'primary' : undefined}>
        {isCreate ? 'Add manager' : `Update`}
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
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Name is required!' }]}>
            <Input placeholder="Name" defaultValue={managerName} />
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

export default CreateEditManagerModal;
