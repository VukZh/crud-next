'use client';
import { BASE_URL } from '@/helpers/constants';
import useSWR from 'swr';
import { Managers } from '@/components';
import { fetcher } from '@/helpers/fetcher';
import { Button, Flex, Spin } from 'antd';
import CreateEditManagerModal from '../../components/createEditManagerModal/createEditManagerModal';

export default function ManagersPage() {
  const { data, isLoading, error } = useSWR(`${BASE_URL}/managers`, fetcher, {
    refreshInterval: 2000,
  });

  console.log(data);

  return (
    <div>
      {isLoading && (
        <Flex align="center" justify="center" style={{ height: '100vh' }}>
          <Spin size="large" />
        </Flex>
      )}
      {error && <p>Error: something went wrong</p>}
      {data && (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto',
            }}>
            <CreateEditManagerModal isCreate={true} />
          </div>
          <Managers managers={data} />
        </>
      )}
    </div>
  );
}
