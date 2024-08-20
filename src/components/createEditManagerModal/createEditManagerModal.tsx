import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import type { FormProps } from 'antd';
import { useRouter } from 'next/navigation';

type CreateEditManagerModalPropsType = {
  isCreate: boolean;
  name?: string;
  id?: string;
};

type FieldType = {
  name: string;
};
const CreateEditManagerModal = ({
  isCreate,
  name,
  id,
}: CreateEditManagerModalPropsType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(false);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
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
            <Input placeholder="Name" />
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
