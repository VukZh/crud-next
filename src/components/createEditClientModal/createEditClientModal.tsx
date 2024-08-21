import React, {useState} from 'react';
import {Button, Form, FormProps, Input, Modal, Select} from 'antd';
import {useMainStore} from "@/hooks/useClientsAndManagers";

type CreateEditClientModalPropsType = {
  isCreate: boolean;
  name?: string;
  id?: string;
};

type FieldType = {
  name: string;
  manager: string;
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

  const {clients, managers} = useMainStore();

  const currClient = !isCreate ? clients.find(client => client.id === id) : null;
  const currManager = managers.find(manager => manager?.id === currClient?.manager_id);

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
          labelCol={{span: 5}}
          wrapperCol={{span: 17}}
          style={{width: 500, paddingTop: '20px'}}
          initialValues={{remember: true}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{required: true, message: 'Name is required!'}]}>
            <Input placeholder="Name" defaultValue={currClient?.name}/>
          </Form.Item>
          <Form.Item label="Manager" name='manager' rules={[{required: true, message: 'Manager is required!'}]}>
            <Select defaultValue={currManager?.name}>
              >
              {
                managers.map(manager =>
                  <Select.Option value={manager.id}>{manager.name}</Select.Option>
                )
              }
            </Select>
          </Form.Item>
          <Form.Item<FieldType>
            label="Date of birth"
            name="date_of_birth"
            rules={[{required: true, message: 'Date of birth is required!'}, {
              pattern: /^\d{4}-\d{2}-\d{2}$/,
              message: 'Date must be in the format YYYY-MM-DD',
            }]}>
            <Input placeholder="Date of birth" defaultValue={currClient?.date_of_birth}/>
          </Form.Item>
          <Form.Item<FieldType>
            label="Phone"
            name="phone"
            rules={[{required: true, message: 'Phone is required!'}]}>
            <Input placeholder="Phone" defaultValue={currClient?.phone}/>
          </Form.Item>
          <Form.Item label="Gender" name='gender' rules={[{required: true, message: 'Gender is required!'}]}>
            <Select  defaultValue={currClient?.gender}>
              >
              <Select.Option value="male">male</Select.Option>
              <Select.Option value="female">female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Status" name='status' rules={[{required: true, message: 'Status is required!'}]}>
            <Select  defaultValue={currClient?.status}>
              >
              <Select.Option value="active">active</Select.Option>
              <Select.Option value="archive">archive</Select.Option>
              <Select.Option value="pending">pending</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{offset: 14}}>
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{marginLeft: '10px'}}>
              {isCreate ? 'Create' : 'Update'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateEditClientModal;
