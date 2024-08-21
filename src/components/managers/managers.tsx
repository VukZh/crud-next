import { ManagerType } from '@/types';
import Manager from '../manager/manager';
import { Flex } from 'antd';

type ManagersPropsType = {
  managers: ManagerType[];
};

export default function Managers({ managers }: ManagersPropsType) {
  return (
    <Flex wrap gap="middle" justify="center" style={{ marginTop: '20px' }}>
      {managers.map((manager) => (
        <div key={manager.id}>
          <Manager id={manager.id} name={manager.name} />
        </div>
      ))}
    </Flex>
  );
}
