import { Flex, Spin } from 'antd';

export default function Loader() {
  return (
    <Flex align="center" justify="center" style={{ height: '90vh' }}>
      <Spin size="large" />
    </Flex>
  );
}
