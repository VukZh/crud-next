import { ClientType } from '@/types';
import { Flex } from 'antd';
import { Client } from '@/components';

type ClientsPropsType = {
  clients: ClientType[];
};

export default function Clients({ clients }: ClientsPropsType) {
  return (
    <Flex wrap gap="middle" justify="center" style={{ marginTop: '20px' }}>
      {clients.map((client) => (
        <div key={client.id}>
          <Client
            id={client.id}
            name={client.name}
            date_of_birth={client.date_of_birth}
            phone={client.phone}
            gender={client.gender}
            status={client.status}
            manager_id={client.manager_id}
          />
        </div>
      ))}
    </Flex>
  );
}
