import { Card, Space } from 'antd';
import { ManagerType } from '@/types';
import { Button, Flex } from 'antd';
import { DeleteModal } from '@/components';
import CreateEditManagerModal from '../createEditManagerModal/createEditManagerModal';

export default function Manager({ id, name }: ManagerType) {
  return (
    <Space direction="vertical" size={16}>
      <Card type="inner" title={name}>
        <Flex
          gap="small"
          className="site-button-ghost-wrapper"
          style={{ marginTop: '10px' }}
          justify="space-between">
          <CreateEditManagerModal isCreate={false} id={id} />
          <DeleteModal type="manager" name={name} id={id} />
        </Flex>
      </Card>
    </Space>
  );
}
