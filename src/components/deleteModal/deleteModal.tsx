import { mutate } from 'swr'

import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import {BASE_URL} from "@/helpers/constants";

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

  const deleteManager = async () => {
    await fetch(`${BASE_URL}/${type === 'client' ? 'clients' : 'managers'}/${id}`, {
      method: 'DELETE',
    });

    if (type === 'client') {
      mutate('/clients');
    } else {
      mutate('/managers');
    }

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
          <Button key="submit" type="primary" danger onClick={deleteManager}>
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
