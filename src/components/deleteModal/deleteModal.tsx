import React, { useState } from 'react';
import { Button, Modal } from 'antd';

type DeleteModalPropsType = {
  type: 'client' | 'manager';
  name: string;
  id: string;
};
const DeleteModal = ({ type, id, name }: DeleteModalPropsType) => {
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

  return (
    <>
      <Button danger onClick={showModal}>
        Delete
      </Button>
      <Modal
        title="Delete"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" danger onClick={handleOk}>
            Delete
          </Button>,
        ]}>
        <p>
          Delete {type} with name: {name}?
        </p>
      </Modal>
    </>
  );
};

export default DeleteModal;
