import { ClientType } from '@/types';
import { Button, Card, Flex, Space, Typography } from 'antd';
import { DeleteModal } from '@/components';
import CreateEditClientModal from '../createEditClientModal/createEditClientModal';

const { Title } = Typography;

export default function Client({
  id,
  name,
  date_of_birth,
  phone,
  gender,
  status,
}: ClientType) {
  return (
    <Space direction="vertical" size={16}>
      <Card type="inner" title={name}>
        <Flex vertical gap="middle">
          <Title level={5} style={{ margin: 0 }}>
            Date of birth: {date_of_birth as string}
          </Title>
          <Title level={5} style={{ margin: 0 }}>
            Phone: {phone}
          </Title>
          <Title level={5} style={{ margin: 0 }}>
            Gender: {gender}
          </Title>
          <Title level={5} style={{ margin: 0 }}>
            Status: {status}
          </Title>
        </Flex>
        <Flex
          gap="small"
          className="site-button-ghost-wrapper"
          style={{ marginTop: '10px' }}
          justify="space-between">
          <CreateEditClientModal isCreate={false} name={name} id={id} />
          <DeleteModal type="client" name={name} id={id} />
        </Flex>
      </Card>
    </Space>
  );
}
